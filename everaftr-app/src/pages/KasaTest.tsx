import { useState, useRef } from 'react';
import { Sparkles, Send, RotateCcw, Copy, Check, Calendar, Coins, Heart, Users, BookOpen, Landmark, HelpCircle, Globe } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PRESETS = [
  { icon: Calendar, label: 'Anxious Bride', color: 'text-pink-400', prompts: [
    'Plan my timeline',
    'Magkano ba usually ang budget for a simple wedding?',
    'Stressed na ako, ang dami ko pa di alam',
    'Catholic church wedding sana, sa Manila',
  ]},
  { icon: Landmark, label: 'Muslim Nikah', color: 'text-emerald-400', prompts: [
    'Muslim nikah checklist',
    'What do I need for the mahr? My partner\'s family is traditional',
    'Can you help me plan a walima reception for around 200 guests?',
  ]},
  { icon: Coins, label: 'Budget Couple', color: 'text-amber-400', prompts: [
    'We only have 50k, pwede pa ba mag-wedding?',
    'Ano yung pinaka-mura na pwedeng gawin for a civil wedding?',
    'Civil lang sa city hall, tapos small lunch lang for 30 people',
  ]},
  { icon: Heart, label: 'Same-Sex Couple', color: 'text-violet-400', prompts: [
    'We\'re two guys planning our celebration, where do we start?',
    'What\'s the legal process for civil union in the Philippines?',
    'How do we find LGBTQ-friendly vendors?',
  ]},
  { icon: BookOpen, label: 'INC Wedding', color: 'text-blue-400', prompts: [
    'What are the requirements for an INC church wedding?',
    'My partner is not INC but I am. Can we still get married in the church?',
  ]},
  { icon: Globe, label: 'OFW Planning', color: 'text-cyan-400', prompts: [
    'We\'re both OFWs in Dubai, planning a wedding back home in Cebu',
    'How do we get CENOMAR if we\'re outside the Philippines?',
  ]},
  { icon: Users, label: 'Vendor Help', color: 'text-orange-400', prompts: [
    'Vendor selection tips',
    'What are red flags when choosing a wedding vendor?',
    'How do I choose a good wedding photographer? Budget is around 30k',
  ]},
  { icon: HelpCircle, label: 'Edge Cases', color: 'text-gray-400', prompts: [
    'Can you help me write a resume?',
    'Hi',
    'Give me a list of the top 5 venues in Tagaytay under 200k',
    'My partner and I just had a huge fight about the wedding budget.',
  ]},
];

export default function KasaTest() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputValue('');
    setIsStreaming(true);

    try {
      abortControllerRef.current = new AbortController();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, context: {} }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      // Add empty assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: accumulated };
          return copy;
        });
      }

      setIsStreaming(false);
      inputRef.current?.focus();
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setIsStreaming(false);
      setMessages(prev => [...prev, { role: 'assistant', content: `[ERROR: ${err instanceof Error ? err.message : 'Unknown'}]` }]);
    }
  };

  const handleClear = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setIsStreaming(false);
    setMessages([]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const getJSON = () => JSON.stringify({ messages, context: {} }, null, 2);

  const handleCopyJSON = async () => {
    await navigator.clipboard.writeText(getJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <div className="flex flex-col bg-[#1a1a2e] h-screen">
      {/* Header */}
      <div className="bg-[#16162a] border-b border-[#2a2a4a] px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="font-mono text-base font-semibold text-amber-400 tracking-wide">Kasa Test Mode</h1>
            <p className="text-[11px] tracking-wider text-gray-500 uppercase font-mono">
              {isStreaming ? 'streaming...' : `${messages.length} messages`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyJSON}
            disabled={messages.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#2a2a4a] text-gray-300 rounded-lg hover:bg-[#3a3a5a] disabled:opacity-30 transition-colors"
            title="Copy conversation as JSON"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'JSON'}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#2a2a4a] text-gray-300 rounded-lg hover:bg-red-900/50 hover:text-red-300 transition-colors"
            title="Clear and restart"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Messages + JSON panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat panel */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="py-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-400 font-mono text-sm">Pick a conversation starter or type your own</p>
                </div>
                <div className="space-y-4">
                  {PRESETS.map((group) => (
                    <div key={group.label}>
                      <div className="flex items-center gap-2 mb-2">
                        <group.icon className={`w-3.5 h-3.5 ${group.color}`} />
                        <span className={`text-[11px] font-mono uppercase tracking-wider ${group.color}`}>{group.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.prompts.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => handleSend(prompt)}
                            className="px-3 py-1.5 text-xs text-gray-300 bg-[#2a2a4a] rounded-lg hover:bg-[#3a3a5a] hover:text-white transition-colors text-left font-mono leading-snug"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-[#2a2a4a] text-gray-200 rounded-xl rounded-br-sm px-4 py-2.5 max-w-[85%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-amber-500/70 uppercase">User</span>
                      </div>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-amber-500/70 uppercase">Kasa</span>
                      <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mt-1">{msg.content}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isStreaming && messages.length > 0 && messages[messages.length - 1].role !== 'assistant' && (
              <div className="flex items-center gap-2 pl-8">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500/50" style={{
                      animation: 'kasaTestPulse 1.2s ease-in-out infinite',
                      animationDelay: `${i * 0.15}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* JSON panel — visible on desktop */}
        <div className="hidden lg:flex w-[400px] flex-col border-l border-[#2a2a4a] bg-[#12122a]">
          <div className="px-4 py-2 border-b border-[#2a2a4a] flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">JSON Output</span>
            <button
              onClick={handleCopyJSON}
              disabled={messages.length === 0}
              className="text-[11px] font-mono text-amber-500 hover:text-amber-400 disabled:opacity-30 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="flex-1 overflow-auto p-4 text-xs font-mono text-gray-400 leading-relaxed">
            {messages.length > 0 ? getJSON() : '{\n  "messages": [],\n  "context": {}\n}'}
          </pre>
        </div>
      </div>

      {/* Input */}
      <div className="bg-[#16162a] border-t border-[#2a2a4a] px-4 sm:px-6 py-3">
        <div className="max-w-2xl lg:max-w-none mx-auto flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isStreaming ? 'Streaming...' : 'Type a test message...'}
            disabled={isStreaming}
            className="flex-1 pl-4 pr-4 py-2.5 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl text-sm text-gray-200 placeholder:text-gray-600 font-mono focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 disabled:opacity-50 transition-all"
          />
          <button
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim() || isStreaming}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center hover:shadow-lg disabled:opacity-30 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes kasaTestPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
