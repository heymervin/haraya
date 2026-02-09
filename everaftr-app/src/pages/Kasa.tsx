import { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'kasa';
  timestamp: number;
}

const WELCOME_MESSAGE = "Kamusta! I'm Kasa, your wedding planning assistant. I'm here to help you navigate every step — from CENOMAR requirements to lechon debates. What can I help you with?";

const QUICK_PROMPTS = [
  "Plan my timeline",
  "Filipino wedding budget",
  "Pre-Cana guide",
  "CENOMAR process",
  "Ninong/Ninang etiquette",
  "Muslim nikah checklist",
  "Vendor selection tips",
  "Write our story"
];

const RESPONSE_MAP: Record<string, string> = {
  timeline: "A traditional Filipino wedding needs 12 months to plan properly. Book your church and venue 10-12 months ahead, send Save the Dates at 6 months, and finalize everything 2 weeks before. Key milestones include Pre-Cana at 4-6 months, dress fittings at 3 months, and final vendor confirmations 1 month out. Don't forget to factor in PSA document processing time!",
  budget: "Filipino weddings typically range from ₱100,000 for intimate celebrations to ₱1,000,000+ for grand receptions. Budget breakdown: venue & catering (40-50%), photography/video (15%), attire & styling (10%), church/ceremony (5%), and everything else (30%). Lechon, flowers, and souvenirs can add up quickly! Pro tip: weekday weddings save 20-30%.",
  precana: "Pre-Cana is the Catholic marriage preparation seminar required before church weddings. Most dioceses require completion 4-6 months before your wedding date. It covers communication, finances, family planning, and sacramental grace. Sessions run 1-3 days, cost ₱500-₱2,000, and you'll receive a certificate valid for one year. Book early as slots fill fast!",
  cenomar: "CENOMAR (Certificate of No Marriage Record) from PSA proves you're single. Apply online at psahelpline.ph or visit PSA offices nationwide. Processing takes 7-10 business days, costs around ₱210 per copy. You'll need valid ID and your full name as registered. Churches require this along with baptismal and confirmation certificates for wedding clearance.",
  sponsor: "Ninong and ninang (sponsors) are mentors, not just witnesses. Traditionally, couples choose 3-5 pairs of married couples they respect. Principal sponsors stand during the ceremony and sign documents. They're not expected to give large gifts, but some help with specific expenses. Choose people who inspire your marriage, not just for status or gifts!",
  nikah: "Muslim weddings in the Philippines require the nikah (marriage contract) officiated by an imam. Essential elements include mahr (bride gift), wali (bride's guardian consent), witnesses, and ijab-qabul (offer and acceptance). Complete requirements at the local mosque 2-3 months ahead. The walima (reception) celebrates after the nikah, often featuring traditional dishes and cultural performances.",
  civil: "Civil weddings at city/municipal halls are budget-friendly at ₱1,000-₱3,000. Requirements: CENOMAR, birth certificates, barangay certificate, valid IDs, and two witnesses. Processing takes 10 days for marriage license (₱300-500), valid for 120 days. Ceremonies are short (15-20 minutes) but legally binding. You can have a church blessing later!",
  vendor: "Choose vendors 6-8 months ahead and always check portfolios, reviews, and actual client photos. Red flags: no contract, asking full payment upfront, or no backup plan. Meet face-to-face, ask about overtime fees, and get everything in writing. Trust your gut — you'll work closely with them. Filipino vendor markets are tight, so book early especially for peak months (December-May)!",
  guest: "Filipino weddings average 150-300 guests because family is everything! Start with immediate family, then close friends, godparents, and colleagues. Expect titos and titas to bring uninvited plus-ones. Budget tip: create A-list (must invite) and B-list (if budget allows). Send Save the Dates 6 months early for destination weddings. Track RSVPs religiously for final catering count!",
  save: "Save big with these Pinoy wedding hacks: choose off-peak dates (June-November), have morning ceremonies with lunch reception, DIY invites and styling, ask talented friends for favors, rent instead of buy (arches, sound system), negotiate vendor packages, limit bar to beer/wine, and consider garden venues over hotels. Your ninongs might sponsor specific items — just ask gracefully!",
  vow: "Write vows from the heart in Tagalog, English, or both! Reflect on your love story, inside jokes, and promises for the future. Keep them 1-2 minutes (150-200 words), balance humor with sincerity, and practice reading aloud. Many Filipino couples incorporate family values, faith, and cultural pride. Don't forget tissues — you and your guests will cry!",
  lechon: "Lechon is the star of Filipino wedding receptions! Order 1kg per 10 guests from reputable lechoneros (₱7,000-₱15,000 per whole pig). Book 2-3 months ahead for peak season. Popular alternatives: lechon belly, grilled pork, or beef. Some modern couples skip it entirely for Italian or Asian fusion. Whatever you choose, make sure there's enough — hungry titos will remember!",
  attire: "Barong Tagalog for grooms and Filipiniana ternos for brides showcase Filipino heritage beautifully. Barongs range from ₱3,000-₱30,000 depending on fabric (piña, jusi, organza). Ternos feature butterfly sleeves and intricate embroidery. Many couples mix traditional with modern — barong with suit pants, or Filipiniana-inspired gowns. Groom's entourage typically wears matching barongs. Order 3-4 months ahead for custom pieces!",
  dayof: "Day-of timeline: Start hair/makeup 6 hours before ceremony. Photos at 4 hours before. Groom arrives at venue 1 hour early, bride 30 minutes. Ceremony lasts 1-1.5 hours. Cocktails during photo session (1 hour). Grand entrance, dinner, program with speeches, first dance, cake cutting, bouquet toss, then party time! Buffer 30 minutes between segments. Most Filipino receptions run 5-6 hours total."
};

function getKasaResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('timeline') || lowerMessage.includes('plan')) {
    return RESPONSE_MAP.timeline;
  }
  if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return RESPONSE_MAP.budget;
  }
  if (lowerMessage.includes('pre-cana') || lowerMessage.includes('precana')) {
    return RESPONSE_MAP.precana;
  }
  if (lowerMessage.includes('cenomar') || lowerMessage.includes('psa')) {
    return RESPONSE_MAP.cenomar;
  }
  if (lowerMessage.includes('ninong') || lowerMessage.includes('ninang') || lowerMessage.includes('sponsor')) {
    return RESPONSE_MAP.sponsor;
  }
  if (lowerMessage.includes('nikah') || lowerMessage.includes('muslim') || lowerMessage.includes('mahr')) {
    return RESPONSE_MAP.nikah;
  }
  if (lowerMessage.includes('civil') || lowerMessage.includes('city hall')) {
    return RESPONSE_MAP.civil;
  }
  if (lowerMessage.includes('vendor') || lowerMessage.includes('supplier')) {
    return RESPONSE_MAP.vendor;
  }
  if (lowerMessage.includes('guest') || lowerMessage.includes('invite')) {
    return RESPONSE_MAP.guest;
  }
  if (lowerMessage.includes('save') || lowerMessage.includes('cheap') || lowerMessage.includes('afford')) {
    return RESPONSE_MAP.save;
  }
  if (lowerMessage.includes('vow') || lowerMessage.includes('speech')) {
    return RESPONSE_MAP.vow;
  }
  if (lowerMessage.includes('lechon')) {
    return RESPONSE_MAP.lechon;
  }
  if (lowerMessage.includes('barong') || lowerMessage.includes('filipiniana') || lowerMessage.includes('attire')) {
    return RESPONSE_MAP.attire;
  }
  if (lowerMessage.includes('day of') || lowerMessage.includes('schedule')) {
    return RESPONSE_MAP.dayof;
  }

  return "I'm not sure about that specific topic yet, but you can ask our community at /community! I'm always learning. Try asking about timelines, budgets, Pre-Cana, CENOMAR, or vendor tips.";
}

export default function Kasa() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('haraya-kasa');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMsg: Message = {
        id: 'welcome',
        text: WELCOME_MESSAGE,
        sender: 'kasa',
        timestamp: Date.now()
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('haraya-kasa', JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const kasaResponse: Message = {
        id: `kasa-${Date.now()}`,
        text: getKasaResponse(text),
        sender: 'kasa',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, kasaResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearChat = () => {
    localStorage.removeItem('haraya-kasa');
    const welcomeMsg: Message = {
      id: 'welcome',
      text: WELCOME_MESSAGE,
      sender: 'kasa',
      timestamp: Date.now()
    };
    setMessages([welcomeMsg]);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A63D5C] to-[#5C4A7C] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Kasa</h1>
            <p className="text-sm text-gray-500">Wedding Planning Assistant</p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Clear Chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id}>
            {message.sender === 'kasa' ? (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A63D5C] to-[#5C4A7C] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-white border-l-4 border-[#5C4A7C] rounded-lg p-4 shadow-sm">
                  <p className="text-gray-800 leading-relaxed">{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="bg-[#A63D5C] text-white rounded-lg p-4 max-w-[80%] shadow-sm">
                  <p className="leading-relaxed">{message.text}</p>
                </div>
              </div>
            )}

            {/* Show quick prompts after Kasa messages */}
            {message.sender === 'kasa' && message.id === messages[messages.length - 1].id && !isTyping && (
              <div className="flex flex-wrap gap-2 mt-4 ml-11">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-[#5C4A7C] hover:text-white hover:border-[#5C4A7C] transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A63D5C] to-[#5C4A7C] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border-l-4 border-[#5C4A7C] rounded-lg p-4 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about wedding planning..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C4A7C] focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-[#A63D5C] text-white rounded-lg hover:bg-[#8a3349] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
