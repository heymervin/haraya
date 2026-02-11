import { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, Send, RotateCcw, ChevronDown, Calendar, Coins, Users, BookOpen, Heart, Landmark, ShieldCheck, Pen, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gatherKasaContext } from '../lib/kasaContext';
import ChatVendorCard from '../components/ChatVendorCard';
import type { ChatVendor } from '../components/ChatVendorCard';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'kasa';
  timestamp: number;
}

interface PlanSavedInfo {
  count: number;
  ceremonyType?: string;
  messageId: string;
}

const WELCOME_MESSAGE = "Kamusta! I'm Kasa, your wedding planning assistant. I'm here to help you navigate every step — from CENOMAR requirements to lechon debates. What can I help you with?";

const QUICK_PROMPTS = [
  { label: "Plan my timeline", icon: Calendar },
  { label: "Filipino wedding budget", icon: Coins },
  { label: "Pre-Cana guide", icon: BookOpen },
  { label: "CENOMAR process", icon: ShieldCheck },
  { label: "Ninong/Ninang etiquette", icon: Users },
  { label: "Muslim nikah checklist", icon: Landmark },
  { label: "Vendor selection tips", icon: Heart },
  { label: "Write our story", icon: Pen },
];

/* ── Hidden payload helpers ── */
const PLAN_REGEX = /<!--KASA_PLAN_START-->([\s\S]*?)<!--KASA_PLAN_END-->/;
const VENDORS_REGEX = /<!--KASA_VENDORS_START-->([\s\S]*?)<!--KASA_VENDORS_END-->/;

function stripAllHiddenPayloads(text: string): string {
  return text.replace(PLAN_REGEX, '').replace(VENDORS_REGEX, '').trim();
}

/* ── Minimal markdown renderer ── */
function renderMarkdown(text: string) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const Tag = listType;
      elements.push(
        <Tag key={key++} className={`${listType === 'ul' ? 'list-disc' : 'list-decimal'} ml-5 my-2 space-y-1`}>
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{renderInline(item)}</li>
          ))}
        </Tag>
      );
      listItems = [];
      listType = null;
    }
  };

  const renderInline = (str: string): React.ReactNode => {
    // Bold + italic
    const parts: React.ReactNode[] = [];
    let remaining = str;
    let inlineKey = 0;

    // Process **bold** and *italic*
    const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        parts.push(remaining.slice(lastIndex, match.index));
      }
      if (match[2]) {
        parts.push(<strong key={inlineKey++} className="font-semibold italic">{match[2]}</strong>);
      } else if (match[3]) {
        parts.push(<strong key={inlineKey++} className="font-semibold">{match[3]}</strong>);
      } else if (match[4]) {
        parts.push(<em key={inlineKey++}>{match[4]}</em>);
      } else if (match[5]) {
        parts.push(<code key={inlineKey++} className="px-1.5 py-0.5 bg-dream-lavender/10 text-dream-lavender rounded text-[0.9em] font-mono">{match[5]}</code>);
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < remaining.length) {
      parts.push(remaining.slice(lastIndex));
    }

    return parts.length === 1 ? parts[0] : parts;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={key++} className="font-serif text-base font-semibold text-text-primary mt-4 mb-1.5">{renderInline(trimmed.slice(4))}</h4>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="font-serif text-lg font-semibold text-text-primary mt-4 mb-1.5">{renderInline(trimmed.slice(3))}</h3>
      );
      continue;
    }

    // Bullet list items
    if (/^[-*•]\s/.test(trimmed)) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(trimmed.replace(/^[-*•]\s/, ''));
      continue;
    }

    // Numbered list items
    if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(trimmed.replace(/^\d+\.\s/, ''));
      continue;
    }

    flushList();

    // Empty line
    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />);
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="leading-relaxed">{renderInline(trimmed)}</p>
    );
  }

  flushList();
  return elements;
}

/* ── Typing Indicator ── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-dream-lavender/60"
          style={{
            animation: 'kasaPulse 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Kasa() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [planSaved, setPlanSaved] = useState<PlanSavedInfo | null>(null);
  const [vendorsByMessage, setVendorsByMessage] = useState<Record<string, ChatVendor[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  const isWelcomeOnly = useMemo(
    () => messages.length <= 1 && messages[0]?.id === 'welcome',
    [messages]
  );

  useEffect(() => {
    const savedMessages = localStorage.getItem('haraya-kasa');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([{
        id: 'welcome',
        text: WELCOME_MESSAGE,
        sender: 'kasa',
        timestamp: Date.now()
      }]);
    }
    const savedVendors = localStorage.getItem('haraya-kasa-vendors');
    if (savedVendors) {
      try { setVendorsByMessage(JSON.parse(savedVendors)); } catch { /* ignore */ }
    }
    // Mark as initialized after first render
    requestAnimationFrame(() => { hasInitialized.current = true; });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('haraya-kasa', JSON.stringify(messages));
    }
    // Only auto-scroll after user has started interacting, not on initial load
    if (hasInitialized.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (Object.keys(vendorsByMessage).length > 0) {
      localStorage.setItem('haraya-kasa-vendors', JSON.stringify(vendorsByMessage));
    }
  }, [vendorsByMessage]);

  // Scroll-to-bottom detection
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => {
      const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollBtn(distFromBottom > 120);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping || isStreaming) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    const apiMessages = updatedMessages
      .filter(m => m.id !== 'welcome')
      .map(m => ({
        role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: m.text,
      }));

    const context = gatherKasaContext();
    const kasaMessageId = `kasa-${Date.now()}`;

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, context }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      setMessages(prev => [...prev, {
        id: kasaMessageId,
        text: '',
        sender: 'kasa',
        timestamp: Date.now(),
      }]);
      setIsTyping(false);
      setIsStreaming(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });
        // Show text without hidden payloads during streaming
        const displayText = stripAllHiddenPayloads(accumulated);
        setMessages(prev =>
          prev.map(m => m.id === kasaMessageId ? { ...m, text: displayText } : m)
        );
      }

      // After streaming completes, check for plan payload
      const planMatch = accumulated.match(PLAN_REGEX);
      if (planMatch) {
        try {
          const payload = JSON.parse(planMatch[1]);
          const cleanText = stripAllHiddenPayloads(accumulated);
          // Update message to clean text
          setMessages(prev =>
            prev.map(m => m.id === kasaMessageId ? { ...m, text: cleanText } : m)
          );
          // Save to localStorage
          if (payload.items && Array.isArray(payload.items)) {
            // Preserve completion state from existing items
            const existing = localStorage.getItem('haraya-checklist');
            let completedTitles = new Set<string>();
            if (existing) {
              try {
                const existingItems = JSON.parse(existing);
                completedTitles = new Set(
                  existingItems
                    .filter((i: { completed?: boolean }) => i.completed)
                    .map((i: { title?: string }) => (i.title || '').toLowerCase())
                );
              } catch { /* ignore */ }
            }
            // Merge completion state
            const itemsWithState = payload.items.map((item: { title?: string; completed?: boolean }) => ({
              ...item,
              completed: completedTitles.has((item.title || '').toLowerCase()) ? true : item.completed || false,
            }));
            localStorage.setItem('haraya-checklist', JSON.stringify(itemsWithState));
          }
          if (payload.ceremonyType) {
            localStorage.setItem('haraya-ceremony-type', payload.ceremonyType);
          }
          setPlanSaved({
            count: payload.items?.length || 0,
            ceremonyType: payload.ceremonyType,
            messageId: kasaMessageId,
          });
        } catch (e) {
          console.error('Failed to parse Kasa plan payload:', e);
        }
      }

      // Check for vendor payload
      const vendorMatch = accumulated.match(VENDORS_REGEX);
      if (vendorMatch) {
        try {
          const vendors: ChatVendor[] = JSON.parse(vendorMatch[1]);
          const cleanText = stripAllHiddenPayloads(accumulated);
          setMessages(prev =>
            prev.map(m => m.id === kasaMessageId ? { ...m, text: cleanText } : m)
          );
          setVendorsByMessage(prev => ({ ...prev, [kasaMessageId]: vendors }));
        } catch (e) {
          console.error('Failed to parse Kasa vendor payload:', e);
        }
      }

      setIsStreaming(false);
      inputRef.current?.focus();
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      console.error('Kasa chat error:', error);
      setIsTyping(false);
      setIsStreaming(false);

      setMessages(prev => [...prev, {
        id: kasaMessageId,
        text: "Ay, sorry! May konting technical issue ako ngayon. Please try again in a moment — or check your internet connection. If it keeps happening, the team is probably working on it na!",
        sender: 'kasa',
        timestamp: Date.now(),
      }]);
    }
  };

  const handleClearChat = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setIsTyping(false);
    setIsStreaming(false);
    setPlanSaved(null);
    setVendorsByMessage({});
    localStorage.removeItem('haraya-kasa');
    localStorage.removeItem('haraya-kasa-vendors');
    setMessages([{
      id: 'welcome',
      text: WELCOME_MESSAGE,
      sender: 'kasa',
      timestamp: Date.now()
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const isBusy = isTyping || isStreaming;

  return (
    <div className="flex flex-col bg-bg-primary" style={{ height: 'calc(100vh - 69px)' }}>
      <style>{`
        @keyframes kasaPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes kasaFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .kasa-msg { animation: kasaFadeUp 0.3s ease-out both; }
      `}</style>

      {/* ── Header ── */}
      <div className="bg-bg-secondary border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-dream-lavender to-twilight-blue flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="font-serif text-lg font-medium text-text-primary tracking-wide">Kasa</h1>
            <p className="text-[11px] tracking-[0.12em] text-text-secondary uppercase">
              {isStreaming ? 'Thinking...' : 'Wedding Planning AI'}
            </p>
          </div>
        </div>
        {!isWelcomeOnly && (
          <button
            onClick={handleClearChat}
            className="p-2 text-text-secondary hover:text-accent-error hover:bg-accent-error/8 rounded-lg transition-colors"
            title="New conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Messages ── */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">

          {/* Welcome state */}
          {isWelcomeOnly && (
            <div className="pt-6 pb-2 kasa-msg">
              {/* Kasa avatar + intro */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dream-lavender to-twilight-blue flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary mb-2">
                  Kamusta!
                </h2>
                <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
                  I'm Kasa, your wedding planning assistant. From CENOMAR requirements to lechon debates — I've got you.
                </p>
              </div>

              {/* Quick prompts grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {QUICK_PROMPTS.map((prompt, i) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={prompt.label}
                      onClick={() => handleSendMessage(prompt.label)}
                      disabled={isBusy}
                      className="group flex items-start gap-2.5 p-3 sm:p-3.5 rounded-xl bg-bg-secondary border border-border text-left hover:border-dream-lavender/40 hover:shadow-sm transition-all disabled:opacity-50"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <Icon className="w-4 h-4 text-dream-lavender mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-[13px] text-text-primary leading-snug font-medium">{prompt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conversation messages */}
          {!isWelcomeOnly && messages.filter(m => m.id !== 'welcome').map((message) => (
            <div key={message.id} className="kasa-msg">
              {message.sender === 'kasa' ? (
                <>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-dream-lavender to-twilight-blue flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0 text-[14.5px] text-text-primary space-y-1">
                      {renderMarkdown(message.text)}
                    </div>
                  </div>
                  {vendorsByMessage[message.id] && (
                    <div className="mt-3 pl-9 space-y-2">
                      {vendorsByMessage[message.id].map(vendor => (
                        <ChatVendorCard key={vendor.id} vendor={vendor} />
                      ))}
                      <Link
                        to="/vendors"
                        className="inline-block text-xs text-text-secondary hover:text-dream-lavender transition-colors"
                      >
                        Browse all vendors →
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-end pl-10">
                  <div className="bg-gradient-to-br from-dream-lavender to-[#8169C4] text-white rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%] shadow-sm">
                    <p className="text-[14.5px] leading-relaxed">{message.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Plan saved confirmation card */}
          {planSaved && !isBusy && (
            <div className="pl-9 kasa-msg">
              <div className="border border-dream-lavender/30 bg-gradient-to-br from-dream-lavender/5 to-twilight-blue/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent-success/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-accent-success" />
                  </div>
                  <p className="text-sm font-medium text-text-primary">
                    Your personalized checklist is ready — {planSaved.count} tasks
                    {planSaved.ceremonyType && planSaved.ceremonyType !== 'other'
                      ? ` for your ${planSaved.ceremonyType.charAt(0).toUpperCase() + planSaved.ceremonyType.slice(1)} celebration`
                      : ''}
                  </p>
                </div>
                <Link
                  to="/plan/checklist"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-dream-lavender to-twilight-blue text-white text-sm font-medium rounded-lg hover:shadow-md transition-all"
                >
                  View Your Checklist
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Typing dots */}
          {isTyping && (
            <div className="flex items-start gap-2.5 kasa-msg">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-dream-lavender to-twilight-blue flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <TypingIndicator />
            </div>
          )}

          {/* Quick prompts inline after conversation */}
          {!isWelcomeOnly && !isBusy && messages.length > 1 && messages[messages.length - 1]?.sender === 'kasa' && (
            <div className="flex flex-wrap gap-1.5 pl-9 kasa-msg">
              {QUICK_PROMPTS.slice(0, 4).map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleSendMessage(prompt.label)}
                  className="px-3 py-1.5 text-xs bg-bg-secondary border border-border text-text-secondary rounded-full hover:border-dream-lavender/40 hover:text-dream-lavender transition-colors"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll-to-bottom button */}
        {showScrollBtn && (
          <button
            onClick={scrollToBottom}
            className="sticky bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-bg-secondary border border-border shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <ChevronDown className="w-4 h-4 text-text-secondary" />
          </button>
        )}
      </div>

      {/* ── Input Bar ── */}
      <div className="bg-bg-secondary border-t border-border px-4 sm:px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isBusy ? 'Kasa is thinking...' : 'Ask about wedding planning...'}
              disabled={isBusy}
              className="w-full pl-4 pr-4 py-2.5 bg-bg-primary border border-border rounded-xl text-[14px] text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-dream-lavender/50 focus:ring-2 focus:ring-dream-lavender/15 disabled:opacity-60 transition-all"
            />
          </div>
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isBusy}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-dream-lavender to-twilight-blue text-white flex items-center justify-center hover:shadow-md disabled:opacity-30 disabled:shadow-none transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
