import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  PiggyBank,
  Users,
  Globe,
  Sparkles,
  Heart,
  ArrowRight,
  ListChecks,
  Wallet,
} from 'lucide-react';

// ─── Types ───

interface ChecklistItemData {
  id: string;
  title: string;
  completed: boolean;
}

interface BudgetCategoryData {
  id: string;
  name: string;
  actualCost: number;
  estimatedCost: number;
}

interface BudgetData {
  totalBudget: number;
  categories: BudgetCategoryData[];
}

interface GuestData {
  id: string;
  rsvpStatus: 'Attending' | 'Not Attending' | 'Pending';
  plusOne: boolean;
}

interface FavoriteData {
  vendorId: string;
}

interface ToolState {
  checklist: { completed: number; total: number; nextTask: string | null; hasData: boolean };
  budget: { spent: number; total: number; topCategory: string | null; hasData: boolean };
  guestList: { total: number; attending: number; pending: number; declined: number; hasData: boolean };
  website: { isPublished: boolean; hasData: boolean };
  matchmaker: { isCompleted: boolean; style: string | null };
  favorites: { count: number };
}

// ─── Helpers ───

const formatPeso = (amount: number): string => {
  if (amount >= 1000000) {
    return `₱${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `₱${Math.round(amount / 1000)}K`;
  }
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const formatPesoFull = (amount: number): string => {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

function readToolState(): ToolState {
  // Checklist
  let checklist = { completed: 0, total: 44, nextTask: null as string | null, hasData: false };
  try {
    const raw = localStorage.getItem('haraya-checklist');
    if (raw) {
      const items: ChecklistItemData[] = JSON.parse(raw);
      const completed = items.filter((i) => i.completed).length;
      const next = items.find((i) => !i.completed);
      checklist = {
        completed,
        total: items.length,
        nextTask: next?.title ?? null,
        hasData: true,
      };
    }
  } catch { /* ignore */ }

  // Budget
  let budget = { spent: 0, total: 0, topCategory: null as string | null, hasData: false };
  try {
    const raw = localStorage.getItem('haraya-budget');
    if (raw) {
      const data: BudgetData = JSON.parse(raw);
      const spent = data.categories.reduce((s, c) => s + c.actualCost, 0);
      const topCat = data.categories
        .filter((c) => c.actualCost > 0)
        .sort((a, b) => b.actualCost - a.actualCost)[0];
      budget = {
        spent,
        total: data.totalBudget,
        topCategory: topCat ? `${topCat.name} (${formatPeso(topCat.actualCost)})` : null,
        hasData: data.totalBudget > 0 || spent > 0,
      };
    }
  } catch { /* ignore */ }

  // Guest List
  let guestList = { total: 0, attending: 0, pending: 0, declined: 0, hasData: false };
  try {
    const raw = localStorage.getItem('haraya-guestlist');
    if (raw) {
      const guests: GuestData[] = JSON.parse(raw);
      const plusOnes = guests.filter((g) => g.plusOne).length;
      guestList = {
        total: guests.length + plusOnes,
        attending: guests.filter((g) => g.rsvpStatus === 'Attending').length +
          guests.filter((g) => g.rsvpStatus === 'Attending' && g.plusOne).length,
        pending: guests.filter((g) => g.rsvpStatus === 'Pending').length +
          guests.filter((g) => g.rsvpStatus === 'Pending' && g.plusOne).length,
        declined: guests.filter((g) => g.rsvpStatus === 'Not Attending').length +
          guests.filter((g) => g.rsvpStatus === 'Not Attending' && g.plusOne).length,
        hasData: guests.length > 0,
      };
    }
  } catch { /* ignore */ }

  // Celebration Website
  let website = { isPublished: false, hasData: false };
  try {
    const raw = localStorage.getItem('haraya-celebration-website');
    const slugRaw = localStorage.getItem('haraya-website-slug');
    if (raw) {
      const data = JSON.parse(raw);
      const hasContent = !!(data.partner1Name || data.partner2Name);
      website = {
        isPublished: !!slugRaw,
        hasData: hasContent,
      };
    }
  } catch { /* ignore */ }

  // Matchmaker
  let matchmaker = { isCompleted: false, style: null as string | null };
  try {
    const raw = localStorage.getItem('matchmaker-results');
    if (raw) {
      const data = JSON.parse(raw);
      const styleLabels: Record<string, string> = {
        classic: 'Classic & Elegant',
        modern: 'Modern & Minimal',
        garden: 'Garden & Rustic',
        bold: 'Bold & Festive',
      };
      matchmaker = {
        isCompleted: !!data.style && !!data.priority,
        style: data.style ? styleLabels[data.style] ?? data.style : null,
      };
    }
  } catch { /* ignore */ }

  // Favorites
  let favorites = { count: 0 };
  try {
    const raw = localStorage.getItem('haraya-favorites');
    if (raw) {
      const items: FavoriteData[] = JSON.parse(raw);
      favorites = { count: items.length };
    }
  } catch { /* ignore */ }

  return { checklist, budget, guestList, website, matchmaker, favorites };
}

// ─── Suggested Action Logic ───

interface SuggestedAction {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  linkTo: string;
  ctaLabel: string;
}

function getSuggestedAction(state: ToolState): SuggestedAction | null {
  // Calculate weighted completion (not just "started")
  const checklistProgress = state.checklist.hasData && state.checklist.total > 0
    ? state.checklist.completed / state.checklist.total
    : 0;
  const budgetProgress = state.budget.hasData && state.budget.total > 0
    ? Math.min(state.budget.spent / state.budget.total, 1)
    : 0;
  const guestListProgress = state.guestList.hasData ? 0.5 : 0; // has data = halfway
  const matchmakerProgress = state.matchmaker.isCompleted ? 1 : 0;
  const websiteProgress = state.website.hasData ? (state.website.isPublished ? 1 : 0.5) : 0;

  const overallPercent = Math.round(
    ((checklistProgress * 0.35) + (budgetProgress * 0.25) + (guestListProgress * 0.2) +
     (matchmakerProgress * 0.1) + (websiteProgress * 0.1)) * 100
  );

  // Priority-based suggestions (always show the most useful next action)
  if (!state.checklist.hasData) {
    return {
      icon: <ListChecks className="w-5 h-5 text-twilight-blue" />,
      title: 'Start with your checklist',
      subtitle: '44 tasks organized by timeline — from getting your CENOMAR to your last thank-you note.',
      linkTo: '/plan/checklist',
      ctaLabel: 'Start',
    };
  }
  if (!state.budget.hasData) {
    return {
      icon: <Wallet className="w-5 h-5 text-golden-hour" />,
      title: 'Set your budget',
      subtitle: 'Know where every peso goes. Helps you compare vendor quotes with confidence.',
      linkTo: '/plan/budget',
      ctaLabel: 'Start',
    };
  }
  if (!state.guestList.hasData) {
    return {
      icon: <Users className="w-5 h-5 text-dream-lavender" />,
      title: 'Start your guest list',
      subtitle: 'Track RSVPs, dietary needs, and keep ninong/ninang details organized.',
      linkTo: '/guests',
      ctaLabel: 'Start',
    };
  }
  if (!state.matchmaker.isCompleted) {
    return {
      icon: <Sparkles className="w-5 h-5 text-dream-lavender" />,
      title: 'Find vendors that match your style',
      subtitle: 'Answer 5 quick questions to get personalized vendor recommendations.',
      linkTo: '/matchmaker',
      ctaLabel: 'Take the Quiz',
    };
  }
  if (!state.website.hasData) {
    return {
      icon: <Globe className="w-5 h-5 text-sunset-blush" />,
      title: 'Collect RSVPs and share your celebration details',
      subtitle: 'Create a beautiful page with one link for all your group chats.',
      linkTo: '/our-wedding',
      ctaLabel: 'Create',
    };
  }

  // All tools started — show milestone based on actual completion
  if (overallPercent >= 90) {
    return {
      icon: <Sparkles className="w-5 h-5 text-dream-lavender" />,
      title: 'Halos tapos na kayo!',
      subtitle: 'Just a few finishing touches. Enjoy every moment of this journey.',
      linkTo: '/plan/checklist',
      ctaLabel: 'Review Checklist',
    };
  }
  if (overallPercent >= 60) {
    return {
      icon: <Sparkles className="w-5 h-5 text-dream-lavender" />,
      title: 'Konti na lang! You\'ve got this.',
      subtitle: `You're ${overallPercent}% through your planning. Maayos na lahat.`,
      linkTo: '/plan/checklist',
      ctaLabel: 'Continue',
    };
  }

  return {
    icon: <CheckCircle className="w-5 h-5 text-twilight-blue" />,
    title: 'You\'re making progress',
    subtitle: `${overallPercent}% of your planning is on track. Check your checklist for what's coming up next.`,
    linkTo: '/plan/checklist',
    ctaLabel: 'Open Checklist',
  };
}

// ─── Progress Bar Component ───

function ProgressBar({ percent, colorClass, label }: { percent: number; colorClass: string; label?: string }) {
  return (
    <div
      className="h-1.5 bg-border rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || `${Math.round(percent)}% complete`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

// ─── Card wrapper ───

function ToolCard({
  to,
  children,
  delay,
}: {
  to: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <Link
      to={to}
      className="block bg-bg-secondary border border-border rounded-xl p-5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md group"
      style={{ animation: `fadeIn 0.3s ease-in ${delay}ms both` }}
    >
      {children}
    </Link>
  );
}

// ─── Main Component ───

export default function Plan() {
  const [state, setState] = useState<ToolState | null>(null);

  useEffect(() => {
    setState(readToolState());
  }, []);

  if (!state) return null;

  const suggested = getSuggestedAction(state);

  const toolsStarted = [
    state.checklist.hasData,
    state.budget.hasData,
    state.guestList.hasData,
    state.matchmaker.isCompleted,
    state.website.hasData,
  ].filter(Boolean).length;

  const checklistPercent = state.checklist.total > 0
    ? (state.checklist.completed / state.checklist.total) * 100
    : 0;

  const budgetPercent = state.budget.total > 0
    ? (state.budget.spent / state.budget.total) * 100
    : 0;

  return (
    <div className="min-h-screen bg-bg-primary pattern-dream">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-text-primary mb-2">
              Your Planning Space
            </h1>
            <p className="text-base text-text-secondary font-light">
              Every detail, one place. Plan at your own pace.
            </p>
          </div>
          <p className="text-sm text-text-secondary mt-3 md:mt-0">
            {toolsStarted} of 5 tools started
          </p>
        </div>

        {/* Suggested Next Step */}
        {suggested && (
          <div
            className="mb-8 rounded-xl border border-border bg-whisper/50 overflow-hidden"
            style={{ animation: 'fadeIn 0.3s ease-in both' }}
          >
            <div className="haraya-glow-thin" />
            <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dream-lavender/10 flex items-center justify-center">
                {suggested.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">
                  {suggested.title}
                </p>
                <p className="text-sm text-text-secondary font-light">
                  {suggested.subtitle}
                </p>
              </div>
              <Link
                to={suggested.linkTo}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent-primary text-text-on-dark text-sm font-medium rounded-lg hover:bg-accent-primary-hover transition-colors"
              >
                {suggested.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Tool Cards Grid: 2x2 for first 4, then 2 half-width at bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Checklist Card */}
          <ToolCard to="/plan/checklist" delay={0}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-twilight-blue/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-twilight-blue" />
              </div>
              <h3 className="text-base font-medium text-text-primary">Checklist</h3>
            </div>
            {state.checklist.hasData ? (
              <>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-lg font-medium text-text-primary">
                    {state.checklist.completed} of {state.checklist.total} tasks
                  </span>
                  <span className="text-sm text-text-secondary">
                    {Math.round(checklistPercent)}%
                  </span>
                </div>
                <ProgressBar percent={checklistPercent} colorClass="bg-twilight-blue" />
                {state.checklist.nextTask && (
                  <p className="mt-3 text-sm text-text-secondary font-light truncate">
                    Next: {state.checklist.nextTask}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-text-secondary font-light">
                Track every task from CENOMAR to thank-you notes. Organized by timeline.
              </p>
            )}
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-primary group-hover:gap-2 transition-all">
              {state.checklist.hasData ? 'Open Checklist' : 'Start'}
              <ArrowRight className="w-4 h-4" />
            </div>
          </ToolCard>

          {/* Budget Card */}
          <ToolCard to="/plan/budget" delay={80}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-golden-hour/10 flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-golden-hour" />
              </div>
              <h3 className="text-base font-medium text-text-primary">Budget</h3>
            </div>
            {state.budget.hasData ? (
              <>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-lg font-medium text-text-primary">
                    {formatPesoFull(state.budget.spent)} of {state.budget.total > 0 ? formatPesoFull(state.budget.total) : '₱0'}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {state.budget.total > 0 ? `${Math.round(budgetPercent)}%` : '—'}
                  </span>
                </div>
                <ProgressBar
                  percent={budgetPercent}
                  colorClass={
                    budgetPercent >= 100
                      ? 'bg-accent-error'
                      : budgetPercent >= 80
                        ? 'bg-accent-warning'
                        : 'bg-golden-hour'
                  }
                />
                {state.budget.topCategory && (
                  <p className="mt-3 text-sm text-text-secondary font-light truncate">
                    Top spend: {state.budget.topCategory}
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-text-secondary font-light">
                Know where every peso goes. Set a total budget, then allocate by category.
              </p>
            )}
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-primary group-hover:gap-2 transition-all">
              {state.budget.hasData ? 'Open Budget' : 'Start'}
              <ArrowRight className="w-4 h-4" />
            </div>
          </ToolCard>

          {/* Guest List Card */}
          <ToolCard to="/guests" delay={160}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-dream-lavender/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-dream-lavender" />
              </div>
              <h3 className="text-base font-medium text-text-primary">Guest List</h3>
            </div>
            {state.guestList.hasData ? (
              <>
                <p className="text-lg font-medium text-text-primary mb-1">
                  {state.guestList.total} guests
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-secondary">
                  <span>{state.guestList.attending} attending</span>
                  <span>{state.guestList.pending} pending</span>
                  {state.guestList.declined > 0 && (
                    <span>{state.guestList.declined} declined</span>
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-text-secondary font-light">
                Keep track of RSVPs, dietary needs, and table assignments.
              </p>
            )}
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-primary group-hover:gap-2 transition-all">
              {state.guestList.hasData ? 'Open Guest List' : 'Start'}
              <ArrowRight className="w-4 h-4" />
            </div>
          </ToolCard>

          {/* Celebration Website Card */}
          <ToolCard to="/our-wedding" delay={240}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sunset-blush/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-sunset-blush" />
              </div>
              <h3 className="text-base font-medium text-text-primary">Celebration Website</h3>
            </div>
            {state.website.hasData ? (
              <p className="text-lg font-medium text-text-primary">
                {state.website.isPublished ? 'Published' : 'Draft'}
              </p>
            ) : (
              <p className="text-sm text-text-secondary font-light">
                Collect RSVPs and share your celebration details. One link for all your group chats.
              </p>
            )}
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-primary group-hover:gap-2 transition-all">
              {state.website.hasData
                ? state.website.isPublished ? 'Edit Website' : 'Continue Editing'
                : 'Create'}
              <ArrowRight className="w-4 h-4" />
            </div>
          </ToolCard>
        </div>

        {/* Bottom row: Matchmaker + Favorites — side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Matchmaker Card */}
          <ToolCard to="/matchmaker" delay={320}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-dream-lavender/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-dream-lavender" />
              </div>
              <h3 className="text-sm font-medium text-text-primary">Matchmaker</h3>
            </div>
            {state.matchmaker.isCompleted ? (
              <p className="text-sm text-text-secondary">
                Your style: <span className="font-medium text-text-primary">{state.matchmaker.style}</span>
              </p>
            ) : (
              <p className="text-sm text-text-secondary font-light">
                Find vendors that match your style
              </p>
            )}
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent-primary group-hover:gap-2 transition-all">
              {state.matchmaker.isCompleted ? 'View Results' : 'Take the Quiz'}
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </ToolCard>

          {/* Favorites Card */}
          <ToolCard to="/favorites" delay={400}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent-error/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent-error" />
              </div>
              <h3 className="text-sm font-medium text-text-primary">Favorites</h3>
            </div>
            {state.favorites.count > 0 ? (
              <p className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">{state.favorites.count}</span> vendor{state.favorites.count !== 1 ? 's' : ''} saved
              </p>
            ) : (
              <p className="text-sm text-text-secondary font-light">
                Save vendors you love as you browse
              </p>
            )}
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent-primary group-hover:gap-2 transition-all">
              {state.favorites.count > 0 ? 'View All' : 'Browse Vendors'}
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </ToolCard>
        </div>
      </div>
    </div>
  );
}
