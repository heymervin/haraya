import { useState, useEffect, useMemo } from 'react';
import {
  MessageCircle,
  Heart,
  ThumbsUp,
  Clock,
  Pin,
  Plus,
  ArrowLeft,
  Send,
  Tag,
  Filter,
  ArrowUpDown,
  X,
  ChevronDown,
  Users,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────

type ThreadCategory =
  | 'All'
  | 'Planning Tips'
  | 'Vendor Reviews'
  | 'Budget Advice'
  | 'DIY Ideas'
  | 'Ceremony Traditions'
  | 'Vent & Support';

type SortOption = 'recent' | 'replies' | 'likes';

interface Reply {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  likes: number;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  category: ThreadCategory;
  content: string;
  replyCount: number;
  lastActivity: string;
  isPinned: boolean;
  tags: string[];
  likes: number;
  replies: Reply[];
}

interface NewThread {
  title: string;
  category: ThreadCategory;
  content: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────

const MOCK_THREADS: Thread[] = [
  {
    id: 'thread-1',
    title: 'How much should we give our ninongs/ninangs as thank-you gifts?',
    author: 'Marie',
    category: 'Planning Tips',
    content:
      'We have 6 principal sponsors and want to give them something meaningful without breaking the bank. Our budget for all sponsor gifts is around ₱15,000. We were thinking personalized items like engraved pens or custom photo frames, but some friends say cash in a nice envelope is more appreciated. What did you give your ninongs and ninangs? Any suggestions for something uniquely Filipino that won\'t feel generic? We want to show our appreciation but also stay practical since we still have so many other expenses to cover.',
    replyCount: 24,
    lastActivity: '2 hours ago',
    isPinned: true,
    tags: ['sponsors', 'gifts', 'etiquette'],
    likes: 47,
    replies: [
      {
        id: 'r1-1',
        author: 'Jas',
        content:
          'We gave ours personalized wooden plaques with a thank-you message and a small bottle of local wine. Cost around ₱1,500 each and they loved it! The key is making it personal.',
        timeAgo: '1 hour ago',
        likes: 12,
      },
      {
        id: 'r1-2',
        author: 'Paolo',
        content:
          'Honestly, most of our ninongs preferred the cash in a nice envelope with a handwritten letter. They said the thought behind the letter meant more than any gift.',
        timeAgo: '1 hour ago',
        likes: 8,
      },
      {
        id: 'r1-3',
        author: 'Tina',
        content:
          'We did custom illustrations of each couple (ninong/ninang pairs) by a local artist! ₱800 per illustration, framed for ₱500. Everyone cried happy tears.',
        timeAgo: '45 min ago',
        likes: 21,
      },
      {
        id: 'r1-4',
        author: 'Kim',
        content:
          'One thing to consider — some older ninongs/ninangs might find it awkward to receive expensive gifts when they already gave you cash. Keep it thoughtful but modest.',
        timeAgo: '30 min ago',
        likes: 15,
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'Best lechon suppliers in Metro Manila under ₱15K?',
    author: 'Carlo',
    category: 'Vendor Reviews',
    content:
      'Looking for a whole lechon supplier for our reception. We need it for around 80 guests. Budget is ₱15,000 max for the lechon alone. We\'ve heard good things about Lydia\'s and CnT but wanted to hear real experiences from couples who\'ve ordered for their celebrations. How was the quality? On-time delivery? Did you order extra sides? Also curious if anyone has tried the flavored lechon variants — truffle, spicy, or herb-stuffed. Our guests are big foodies so quality is our top priority.',
    replyCount: 31,
    lastActivity: '4 hours ago',
    isPinned: true,
    tags: ['lechon', 'catering', 'Metro Manila'],
    likes: 63,
    replies: [
      {
        id: 'r2-1',
        author: 'Bea',
        content:
          'We ordered from Lydia\'s for our 100-pax reception. Got the large size at ₱12,500. Skin was perfectly crispy and they delivered on time. Highly recommend!',
        timeAgo: '3 hours ago',
        likes: 18,
      },
      {
        id: 'r2-2',
        author: 'JR',
        content:
          'CnT is great but book early — they get fully booked during peak wedding months (Dec-Feb). We ordered 3 months ahead for our January celebration.',
        timeAgo: '3 hours ago',
        likes: 14,
      },
      {
        id: 'r2-3',
        author: 'Anna',
        content:
          'Try Pepita\'s! Their truffle lechon is amazing at ₱14,000 for a whole pig. Our guests wouldn\'t stop talking about it. They also include liver sauce and atchara.',
        timeAgo: '2 hours ago',
        likes: 22,
      },
    ],
  },
  {
    id: 'thread-3',
    title: 'Civil vs church wedding — real talk',
    author: 'Alex',
    category: 'Ceremony Traditions',
    content:
      'My partner and I are debating between a civil ceremony and a church wedding. Our families are traditional Catholic but we\'re not particularly religious. The church wedding route means Pre-Cana, finding a parish that accepts non-parishioners, and a longer timeline. Civil seems simpler but we\'re worried about family reactions. Has anyone navigated this? How did you handle family expectations while staying true to what you actually wanted? We don\'t want to offend our lolas but we also don\'t want to pretend to be something we\'re not.',
    replyCount: 56,
    lastActivity: '1 hour ago',
    isPinned: false,
    tags: ['civil', 'church', 'family'],
    likes: 89,
    replies: [
      {
        id: 'r3-1',
        author: 'Mika',
        content:
          'We did a civil ceremony first (small, intimate, just parents) then a garden blessing with a pastor friend. Best of both worlds — legal, meaningful, and no Pre-Cana stress.',
        timeAgo: '50 min ago',
        likes: 34,
      },
      {
        id: 'r3-2',
        author: 'David',
        content:
          'Went full church wedding for the families and honestly, the Pre-Cana was actually helpful for us as a couple. The seminar at San Agustin was 1 day and really well-run.',
        timeAgo: '45 min ago',
        likes: 19,
      },
      {
        id: 'r3-3',
        author: 'Ria',
        content:
          'Talk to your families early. We were surprised — our parents were more open to civil than we expected. They just wanted to be part of the celebration.',
        timeAgo: '30 min ago',
        likes: 27,
      },
      {
        id: 'r3-4',
        author: 'Jun',
        content:
          'Civil ceremony here. Zero regrets. Our celebration was at a garden venue with our own vows. Way more personal than any template ceremony.',
        timeAgo: '20 min ago',
        likes: 31,
      },
      {
        id: 'r3-5',
        author: 'Meg',
        content:
          'Pro tip: if you go civil, the ceremony at Manila City Hall is actually really nice now. Clean, efficient, done in 30 minutes. Then you can go all out on the reception.',
        timeAgo: '10 min ago',
        likes: 16,
      },
    ],
  },
  {
    id: 'thread-4',
    title: 'CENOMAR processing time in 2026?',
    author: 'Jen',
    category: 'Planning Tips',
    content:
      'Has anyone recently gotten their CENOMAR from PSA? I\'ve read online that it takes 4-6 business days for rush processing and 6-8 for regular, but I\'ve heard horror stories of it taking weeks. We need it for our church requirements and the parish wants it submitted 3 months before the ceremony. Currently planning for an October celebration. When should I apply? Also, does the PSA Serbilis website actually work now or should I just go to a branch in person?',
    replyCount: 18,
    lastActivity: '6 hours ago',
    isPinned: false,
    tags: ['CENOMAR', 'PSA', 'documents', 'requirements'],
    likes: 35,
    replies: [
      {
        id: 'r4-1',
        author: 'Grace',
        content:
          'Got mine last month via PSA Serbilis online. Rush processing — received it in exactly 4 business days. The website works fine now, much better than before.',
        timeAgo: '5 hours ago',
        likes: 11,
      },
      {
        id: 'r4-2',
        author: 'Mark',
        content:
          'I went to SM Megamall PSA branch. 15 minutes in line, ₱210 for regular. Got it mailed in 7 business days. Smooth process overall.',
        timeAgo: '4 hours ago',
        likes: 8,
      },
      {
        id: 'r4-3',
        author: 'Diane',
        content:
          'Apply at least 2 months before your parish deadline just to be safe. Also, make sure your names match exactly on all documents — any discrepancy causes delays.',
        timeAgo: '3 hours ago',
        likes: 14,
      },
    ],
  },
  {
    id: 'thread-5',
    title: 'DIY Filipiniana wedding favors that won\'t break the bank',
    author: 'Sam',
    category: 'DIY Ideas',
    content:
      'I\'m putting together Filipiniana-inspired wedding favors for 150 guests. My budget is ₱50-75 per piece. So far I\'m thinking: small bags of local tablea chocolate, mini woven pouches with dried mangoes, or hand-painted capiz shell ornaments. Has anyone done DIY Filipino-themed favors? How early did you start? Any suppliers for bulk materials? I want something guests will actually keep and not just throw away. Bonus points if it supports local artisans!',
    replyCount: 22,
    lastActivity: '8 hours ago',
    isPinned: false,
    tags: ['DIY', 'favors', 'Filipiniana', 'budget-friendly'],
    likes: 41,
    replies: [
      {
        id: 'r5-1',
        author: 'Lea',
        content:
          'We did mini jars of local honey with custom labels — ₱65 each for 120 jars. Ordered from a beekeeper in Laguna. Started assembly 2 weeks before. Guests loved them!',
        timeAgo: '7 hours ago',
        likes: 16,
      },
      {
        id: 'r5-2',
        author: 'Troy',
        content:
          'Abaca pouches from Bicol! ₱35 each when you order 200+. We filled them with local coffee beans from Sagada. Total cost: about ₱60 per favor. Very Filipino, very practical.',
        timeAgo: '6 hours ago',
        likes: 22,
      },
      {
        id: 'r5-3',
        author: 'Nina',
        content:
          'Check out Shopee for bulk capiz shells — much cheaper than craft stores. We made capiz candle holders for ₱45 each. Start early though, it took us 3 weekends!',
        timeAgo: '5 hours ago',
        likes: 13,
      },
    ],
  },
  {
    id: 'thread-6',
    title: 'Muslim nikah + civil ceremony — has anyone done both?',
    author: 'Amira',
    category: 'Ceremony Traditions',
    content:
      'We\'re planning to have both a nikah and a civil ceremony. My partner is Muslim and I\'m not, but we want to honor both traditions. Questions: (1) Do we need to do them on the same day? (2) Is there a specific order? (3) How did you handle the mahr discussion? (4) Can the civil ceremony happen at the same venue as the nikah reception? We\'re based in Zamboanga but celebrating in Manila. Any couples who\'ve navigated this — your experience would mean everything to us.',
    replyCount: 15,
    lastActivity: '12 hours ago',
    isPinned: false,
    tags: ['nikah', 'Muslim', 'civil', 'interfaith'],
    likes: 52,
    replies: [
      {
        id: 'r6-1',
        author: 'Fatima',
        content:
          'We did nikah on Friday (intimate family gathering) and civil + reception on Saturday. Worked beautifully! The imam was very accommodating with scheduling.',
        timeAgo: '11 hours ago',
        likes: 19,
      },
      {
        id: 'r6-2',
        author: 'Omar',
        content:
          'For the mahr — have an honest conversation early. It\'s a beautiful tradition. We agreed on a modest mahr plus a commitment to save for our first home together.',
        timeAgo: '10 hours ago',
        likes: 24,
      },
      {
        id: 'r6-3',
        author: 'Sarah',
        content:
          'You can do both at the same venue! We had our nikah ceremony in a private room, then moved to the main hall for the civil ceremony and reception. Seamless flow.',
        timeAgo: '9 hours ago',
        likes: 17,
      },
    ],
  },
  {
    id: 'thread-7',
    title: 'How to politely cut the guest list (Filipino family politics edition)',
    author: 'Pat',
    category: 'Vent & Support',
    content:
      'Our venue holds 150 people max. Our combined families alone are 200+. My mom keeps adding titas and titos I haven\'t seen since I was 5. My partner\'s family has the same problem. Every time we try to trim the list, someone gets offended. We\'ve tried the "immediate family only" rule but that still gets us to 180. How do you say no to a tita without starting World War III? Has anyone survived this? Please share your strategies because we\'re losing sleep over this.',
    replyCount: 43,
    lastActivity: '3 hours ago',
    isPinned: false,
    tags: ['guest list', 'family', 'etiquette', 'stress'],
    likes: 112,
    replies: [
      {
        id: 'r7-1',
        author: 'Chris',
        content:
          'The "A list / B list" strategy worked for us. Send A list invites first (6 months out). As regrets come in, send B list invites. Nobody knows they\'re on the B list.',
        timeAgo: '2 hours ago',
        likes: 38,
      },
      {
        id: 'r7-2',
        author: 'Gel',
        content:
          'We told both families: each side gets 75 slots, you decide who fills them. Took the pressure off us and made the parents own the tough decisions.',
        timeAgo: '2 hours ago',
        likes: 45,
      },
      {
        id: 'r7-3',
        author: 'Rica',
        content:
          'Blame the venue. "The venue only allows X guests due to fire code regulations." Nobody argues with fire safety. You\'re welcome.',
        timeAgo: '1 hour ago',
        likes: 67,
      },
      {
        id: 'r7-4',
        author: 'Dan',
        content:
          'We did a "no ring, no bring" policy for single cousins. That alone saved us 20 seats. Plus we had a separate after-party at a bar for the extended crew.',
        timeAgo: '1 hour ago',
        likes: 29,
      },
    ],
  },
  {
    id: 'thread-8',
    title: 'Vendor ghosted us 2 months before the wedding — what now?',
    author: 'Kat',
    category: 'Vent & Support',
    content:
      'Our coordinator just disappeared. No replies to texts, calls, emails — nothing. We paid a 50% deposit of ₱40,000. Our celebration is in 8 weeks. We\'re panicking. Has anyone dealt with this? What are our legal options? Should we file a case? Can we get a new coordinator this late? We have all our other vendors booked but the coordinator was managing everything. Any recommendations for coordinators who can do last-minute bookings in Metro Manila would be incredibly helpful right now.',
    replyCount: 38,
    lastActivity: '5 hours ago',
    isPinned: false,
    tags: ['vendor issue', 'coordinator', 'emergency', 'scam'],
    likes: 78,
    replies: [
      {
        id: 'r8-1',
        author: 'Vince',
        content:
          'File a demand letter ASAP via registered mail to their business address. If no response in 15 days, you can file in small claims court. No lawyer needed for claims under ₱1M.',
        timeAgo: '4 hours ago',
        likes: 32,
      },
      {
        id: 'r8-2',
        author: 'Mia',
        content:
          'This happened to us! We found a new coordinator in 3 days through a wedding FB group. Many coordinators offer "rescue packages" for exactly this situation. Don\'t lose hope!',
        timeAgo: '4 hours ago',
        likes: 28,
      },
      {
        id: 'r8-3',
        author: 'Ara',
        content:
          'Document everything — screenshots of conversations, receipts, bank transfers. You\'ll need these for small claims. Also report them to DTI.',
        timeAgo: '3 hours ago',
        likes: 25,
      },
    ],
  },
  {
    id: 'thread-9',
    title: 'Pre-Cana seminar — what to expect?',
    author: 'Miko',
    category: 'Ceremony Traditions',
    content:
      'We\'re booked for Pre-Cana at our parish next month and have no idea what to expect. Is it just one day? What topics do they cover? We\'ve heard it can be awkward — is it really? Do they separate you from your partner for some parts? We\'re a bit nervous because we already live together and aren\'t sure how the church handles that. Any tips on how to approach it with an open mind? What was your experience like?',
    replyCount: 27,
    lastActivity: '1 day ago',
    isPinned: false,
    tags: ['Pre-Cana', 'Catholic', 'requirements', 'church'],
    likes: 33,
    replies: [
      {
        id: 'r9-1',
        author: 'Gelo',
        content:
          'Most parishes offer a 1-day or weekend format. Topics: communication, finances, family planning (NFP), and spirituality. It was honestly more helpful than we expected!',
        timeAgo: '22 hours ago',
        likes: 14,
      },
      {
        id: 'r9-2',
        author: 'Joy',
        content:
          'The living-together part — they don\'t really grill you about it. Focus was more forward-looking. Our facilitators were a married couple who were very relatable and warm.',
        timeAgo: '20 hours ago',
        likes: 18,
      },
      {
        id: 'r9-3',
        author: 'Ian',
        content:
          'Pro tip: go to a parish known for modern Pre-Cana programs. San Carlos in Makati and Santuario de San Antonio are highly recommended. Much better than the traditional lecture format.',
        timeAgo: '18 hours ago',
        likes: 21,
      },
      {
        id: 'r9-4',
        author: 'Belle',
        content:
          'Bring snacks, a pen, and an open mind. Some parts can feel slow but the couple exercises are genuinely valuable. My partner and I still reference conversations we had during Pre-Cana.',
        timeAgo: '16 hours ago',
        likes: 11,
      },
    ],
  },
  {
    id: 'thread-10',
    title: 'Budget breakdown: Our ₱250K Tagaytay wedding',
    author: 'Denise',
    category: 'Budget Advice',
    content:
      'Just got back from our celebration and wanted to share our full budget breakdown for anyone planning on a similar budget! Total: ₱248,000 for 80 guests in Tagaytay. Here\'s how we split it:\n\nVenue (garden, 8 hrs): ₱65,000\nCatering (₱650/head): ₱52,000\nPhoto + Video: ₱45,000\nCoordination (month-of): ₱25,000\nFlowers & Styling: ₱20,000\nHair & Makeup: ₱12,000\nAttire (Barong + gown rental): ₱15,000\nInvitations (digital): ₱3,000\nMisc (favors, transportation, tips): ₱11,000\n\nHappy to answer questions about any category!',
    replyCount: 67,
    lastActivity: '30 min ago',
    isPinned: false,
    tags: ['budget', 'Tagaytay', '₱250K', 'breakdown'],
    likes: 156,
    replies: [
      {
        id: 'r10-1',
        author: 'Liz',
        content:
          'This is so helpful! How did you find a Tagaytay venue for only ₱65K? Most places I\'ve seen start at ₱100K+.',
        timeAgo: '25 min ago',
        likes: 12,
      },
      {
        id: 'r10-2',
        author: 'Denise',
        content:
          'We booked a private garden estate (not a commercial venue) through a friend\'s referral! Key tip: look beyond the big-name venues. Many residential estates in Alfonso/Silang area rent out for events.',
        timeAgo: '20 min ago',
        likes: 28,
      },
      {
        id: 'r10-3',
        author: 'Ryan',
        content:
          '₱45K for photo + video in Tagaytay is a steal! Can you share who you booked? We\'re looking at the same budget range.',
        timeAgo: '15 min ago',
        likes: 9,
      },
    ],
  },
  {
    id: 'thread-11',
    title: 'Barong Tagalog vs suit — what did your partner wear?',
    author: 'Luis',
    category: 'Planning Tips',
    content:
      'My partner is torn between wearing a Barong Tagalog and a suit for our garden celebration. The Barong feels more Filipino and meaningful but the suit feels "safer" and more versatile. For those who went with Barong — did you go with a traditional pinya fabric or modern versions? Where did you get it made? Budget? For suit people — how did you handle the Philippine heat at outdoor venues? Any regrets either way?',
    replyCount: 19,
    lastActivity: '10 hours ago',
    isPinned: false,
    tags: ['Barong Tagalog', 'suit', 'attire', 'groom'],
    likes: 38,
    replies: [
      {
        id: 'r11-1',
        author: 'Marco',
        content:
          'Went with a hand-embroidered Barong from Kultura. ₱8,500 for a beautiful piña-blend fabric. The compliments were endless. It photographs beautifully too!',
        timeAgo: '9 hours ago',
        likes: 15,
      },
      {
        id: 'r11-2',
        author: 'Eli',
        content:
          'I wore a suit and melted. It was a Tagaytay garden wedding in March. If I could do it again, 100% Barong Tagalog. Way more practical for Philippine weather.',
        timeAgo: '8 hours ago',
        likes: 23,
      },
      {
        id: 'r11-3',
        author: 'Kath',
        content:
          'My partner wore a custom Barong from Paul Cabral. Expensive (₱35K) but it was a family heirloom quality piece. They plan to pass it down to future generations.',
        timeAgo: '7 hours ago',
        likes: 18,
      },
    ],
  },
  {
    id: 'thread-12',
    title: 'Tips for planning a destination wedding in Boracay',
    author: 'Rachel',
    category: 'Planning Tips',
    content:
      'We\'re planning a 60-guest destination celebration in Boracay for March 2027 and would love tips from anyone who\'s done it! Main concerns: (1) How to manage guest travel and accommodation logistics, (2) Best venues on the island for intimate celebrations, (3) How to find reliable local vendors vs. bringing Manila-based vendors, (4) Weather contingency plans, (5) Approximate cost difference vs. a Manila celebration. We want a barefoot-on-the-beach vibe but also want things to feel polished and well-organized.',
    replyCount: 21,
    lastActivity: '14 hours ago',
    isPinned: false,
    tags: ['destination', 'Boracay', 'beach', 'travel'],
    likes: 44,
    replies: [
      {
        id: 'r12-1',
        author: 'Pam',
        content:
          'Did ours at a Station 1 beachfront resort last year! Tip: book the resort\'s wedding package — it usually includes venue, basic coordination, and catering. Way easier than sourcing separately.',
        timeAgo: '13 hours ago',
        likes: 16,
      },
      {
        id: 'r12-2',
        author: 'Jay',
        content:
          'For guests: create a simple website with all travel info (flights, ferry, hotel blocks). We negotiated a group rate at a nearby hotel. Guests appreciated having everything in one place.',
        timeAgo: '12 hours ago',
        likes: 20,
      },
      {
        id: 'r12-3',
        author: 'Mel',
        content:
          'Weather tip: March is great (dry season) but always have a covered backup. Afternoon showers can happen. Our venue had an indoor backup and it gave us peace of mind.',
        timeAgo: '11 hours ago',
        likes: 13,
      },
    ],
  },
];

const CATEGORIES: ThreadCategory[] = [
  'All',
  'Planning Tips',
  'Vendor Reviews',
  'Budget Advice',
  'DIY Ideas',
  'Ceremony Traditions',
  'Vent & Support',
];

const STORAGE_KEY = 'haraya-community';

// ─── Helpers ─────────────────────────────────────────────────────────────

function loadUserThreads(): Thread[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as Thread[];
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

function saveUserThreads(threads: Thread[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
}

// ─── Component ───────────────────────────────────────────────────────────

export default function Community() {
  const [userThreads, setUserThreads] = useState<Thread[]>(loadUserThreads);
  const [activeCategory, setActiveCategory] = useState<ThreadCategory>('All');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [expandedThread, setExpandedThread] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [newThread, setNewThread] = useState<NewThread>({
    title: '',
    category: 'Planning Tips',
    content: '',
  });

  // Persist user-created threads
  useEffect(() => {
    saveUserThreads(userThreads);
  }, [userThreads]);

  // All threads combined: user-created + mock
  const allThreads = useMemo(() => [...userThreads, ...MOCK_THREADS], [userThreads]);

  // Filter and sort
  const filteredThreads = useMemo(() => {
    let threads =
      activeCategory === 'All'
        ? allThreads
        : allThreads.filter((t) => t.category === activeCategory);

    // Separate pinned from unpinned
    const pinned = threads.filter((t) => t.isPinned);
    const unpinned = threads.filter((t) => !t.isPinned);

    // Sort unpinned
    switch (sortBy) {
      case 'replies':
        unpinned.sort((a, b) => b.replyCount - a.replyCount);
        break;
      case 'likes':
        unpinned.sort((a, b) => b.likes - a.likes);
        break;
      case 'recent':
      default:
        // Mock data is already ordered by recency; user threads are prepended
        break;
    }

    return [...pinned, ...unpinned];
  }, [allThreads, activeCategory, sortBy]);

  const handleSubmitThread = () => {
    if (!newThread.title.trim() || !newThread.content.trim()) return;

    const thread: Thread = {
      id: `user-${Date.now()}`,
      title: newThread.title.trim(),
      author: 'You',
      category: newThread.category,
      content: newThread.content.trim(),
      replyCount: 0,
      lastActivity: 'Just now',
      isPinned: false,
      tags: [],
      likes: 0,
      replies: [],
    };

    setUserThreads((prev) => [thread, ...prev]);
    setNewThread({ title: '', category: 'Planning Tips', content: '' });
    setShowNewForm(false);
  };

  const sortLabels: Record<SortOption, string> = {
    recent: 'Most Recent',
    replies: 'Most Replies',
    likes: 'Most Likes',
  };

  // ── Thread Detail View ──

  if (expandedThread) {
    const thread = allThreads.find((t) => t.id === expandedThread);
    if (!thread) {
      setExpandedThread(null);
      return null;
    }

    return (
      <div className="min-h-screen bg-bg-primary">
        {/* Header */}
        <div className="border-b border-border bg-bg-primary px-6 py-4">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={() => setExpandedThread(null)}
              className="flex min-h-[48px] items-center gap-2 font-sans text-sm text-twilight-blue transition hover:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Community
            </button>
          </div>
        </div>

        {/* Thread Content */}
        <div className="px-6 py-8">
          <div className="mx-auto max-w-4xl">
            {/* Category & meta */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-dream-lavender/10 px-3 py-1 font-sans text-xs font-medium text-dream-lavender">
                {thread.category}
              </span>
              {thread.isPinned && (
                <span className="flex items-center gap-1 font-sans text-xs text-golden-hour">
                  <Pin className="h-3 w-3" />
                  Pinned
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-[clamp(1.5rem,4vw,2.25rem)] font-normal leading-[1.2] text-text-primary">
              {thread.title}
            </h1>

            {/* Author & stats */}
            <div className="mt-4 flex flex-wrap items-center gap-4 font-sans text-sm text-text-secondary">
              <span className="font-medium text-text-primary">{thread.author}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {thread.lastActivity}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5" />
                {thread.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {thread.replyCount} replies
              </span>
            </div>

            {/* Tags */}
            {thread.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {thread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full border border-border bg-pearl/50 px-2.5 py-0.5 font-sans text-xs text-text-secondary"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Full content */}
            <div className="mt-8 whitespace-pre-line font-sans text-base font-light leading-relaxed text-text-primary">
              {thread.content}
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Replies */}
            <div className="mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-yakan-teal" />
              <h2 className="font-sans text-lg font-medium text-text-primary">
                {thread.replies.length} Replies
              </h2>
            </div>

            {thread.replies.length === 0 ? (
              <p className="rounded-lg border border-border bg-pearl/30 px-6 py-8 text-center font-sans text-sm text-text-secondary">
                No replies yet. Be the first to share your thoughts!
              </p>
            ) : (
              <div className="space-y-4">
                {thread.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="rounded-lg border border-border bg-bg-primary p-5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-sans text-sm font-medium text-text-primary">
                        {reply.author}
                      </span>
                      <span className="font-sans text-xs text-text-secondary">
                        {reply.timeAgo}
                      </span>
                    </div>
                    <p className="font-sans text-sm font-light leading-relaxed text-text-primary">
                      {reply.content}
                    </p>
                    <div className="mt-3 flex items-center gap-1 font-sans text-xs text-text-secondary">
                      <ThumbsUp className="h-3 w-3" />
                      {reply.likes}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reply prompt (visual only) */}
            <div className="mt-6 rounded-lg border border-border bg-pearl/20 p-4">
              <p className="font-sans text-sm text-text-secondary">
                Sign in to join the conversation. Replies will be available when accounts launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main List View ──

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero */}
      <section className="bg-gradient-to-br from-dream-lavender/5 via-bg-primary to-twilight-blue/5 px-6 py-12 md:py-16 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Users className="h-6 w-6 text-dream-lavender" />
          </div>
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] text-text-primary">
            Community
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-text-secondary md:text-lg">
            Real conversations from real couples planning their celebrations. Ask questions, share
            advice, and find your people.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-0 z-20 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-3">
          {/* Category Pills */}
          <div className="-mx-6 overflow-x-auto px-6 pb-3 scrollbar-none">
            <div className="flex gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-sans text-sm transition ${
                    activeCategory === cat
                      ? 'bg-dream-lavender text-white'
                      : 'border border-border bg-bg-primary text-text-secondary hover:border-dream-lavender/50 hover:text-text-primary'
                  }`}
                  style={{ minHeight: '40px' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort & New Thread */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu((v) => !v)}
                className="flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-3 py-2 font-sans text-sm text-text-secondary transition hover:border-text-secondary"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {showSortMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortMenu(false)}
                  />
                  <div className="absolute left-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-border bg-bg-primary shadow-lg">
                    {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setShowSortMenu(false);
                        }}
                        className={`block w-full min-h-[44px] whitespace-nowrap px-4 py-2.5 text-left font-sans text-sm transition hover:bg-pearl/50 ${
                          sortBy === opt
                            ? 'font-medium text-dream-lavender'
                            : 'text-text-primary'
                        }`}
                      >
                        {sortLabels[opt]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowNewForm(true)}
              className="flex min-h-[44px] items-center gap-2 rounded-lg bg-twilight-blue px-4 py-2 font-sans text-sm font-medium text-white transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Start a Discussion</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Thread Form */}
      {showNewForm && (
        <div className="border-b border-border bg-pearl/30 px-6 py-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-normal text-text-primary">
                Start a Discussion
              </h2>
              <button
                onClick={() => setShowNewForm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition hover:bg-border/50 hover:text-text-primary"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="thread-title"
                  className="mb-1 block font-sans text-sm font-medium text-text-primary"
                >
                  Title
                </label>
                <input
                  id="thread-title"
                  type="text"
                  value={newThread.title}
                  onChange={(e) =>
                    setNewThread((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="What would you like to discuss?"
                  className="w-full rounded-lg border border-border bg-bg-primary px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-dream-lavender focus:outline-none focus:ring-1 focus:ring-dream-lavender"
                  maxLength={120}
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="thread-category"
                  className="mb-1 block font-sans text-sm font-medium text-text-primary"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="thread-category"
                    value={newThread.category}
                    onChange={(e) =>
                      setNewThread((prev) => ({
                        ...prev,
                        category: e.target.value as ThreadCategory,
                      }))
                    }
                    className="w-full appearance-none rounded-lg border border-border bg-bg-primary px-4 py-3 pr-10 font-sans text-sm text-text-primary focus:border-dream-lavender focus:outline-none focus:ring-1 focus:ring-dream-lavender"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <Filter className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                </div>
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="thread-content"
                  className="mb-1 block font-sans text-sm font-medium text-text-primary"
                >
                  Your message
                </label>
                <textarea
                  id="thread-content"
                  value={newThread.content}
                  onChange={(e) =>
                    setNewThread((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Share your thoughts, questions, or advice..."
                  rows={5}
                  className="w-full resize-y rounded-lg border border-border bg-bg-primary px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-dream-lavender focus:outline-none focus:ring-1 focus:ring-dream-lavender"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitThread}
                  disabled={!newThread.title.trim() || !newThread.content.trim()}
                  className="flex min-h-[48px] items-center gap-2 rounded-lg bg-twilight-blue px-6 py-3 font-sans text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  Post Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thread List */}
      <div className="px-6 py-6">
        <div className="mx-auto max-w-4xl space-y-3">
          {filteredThreads.length === 0 ? (
            <div className="rounded-lg border border-border bg-pearl/30 px-6 py-12 text-center">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-text-secondary/30" />
              <p className="font-sans text-base text-text-secondary">
                No discussions in this category yet.
              </p>
              <button
                onClick={() => setShowNewForm(true)}
                className="mt-4 font-sans text-sm font-medium text-twilight-blue transition hover:underline"
              >
                Start the first one!
              </button>
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setExpandedThread(thread.id)}
                className={`block w-full rounded-lg border text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                  thread.isPinned
                    ? 'border-golden-hour/30 bg-golden-hour/5'
                    : 'border-border bg-bg-primary'
                }`}
              >
                <div className="p-5">
                  {/* Top row: category + pinned badge */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-dream-lavender/10 px-2.5 py-0.5 font-sans text-xs font-medium text-dream-lavender">
                      {thread.category}
                    </span>
                    {thread.isPinned && (
                      <span className="flex items-center gap-1 rounded-full bg-golden-hour/10 px-2.5 py-0.5 font-sans text-xs font-medium text-golden-hour">
                        <Pin className="h-3 w-3" />
                        Pinned
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-normal leading-snug text-text-primary md:text-xl">
                    {thread.title}
                  </h3>

                  {/* Preview text */}
                  <p className="mt-2 line-clamp-2 font-sans text-sm font-light leading-relaxed text-text-secondary">
                    {thread.content.slice(0, 200)}
                    {thread.content.length > 200 ? '...' : ''}
                  </p>

                  {/* Tags */}
                  {thread.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {thread.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-pearl/50 px-2 py-0.5 font-sans text-xs text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta row */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 font-sans text-xs text-text-secondary">
                    <span className="font-medium text-text-primary">
                      {thread.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {thread.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {thread.replyCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {thread.lastActivity}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-gradient-to-r from-dream-lavender/5 to-twilight-blue/5 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Heart className="mx-auto mb-4 h-10 w-10 text-dream-lavender" />
          <h2 className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal leading-[1.2] text-text-primary">
            Every question is valid. Every story matters.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm font-light leading-relaxed text-text-secondary">
            This community is for every couple, every celebration, every love story. Share your
            experience and help others plan their perfect day.
          </p>
        </div>
      </section>
    </div>
  );
}
