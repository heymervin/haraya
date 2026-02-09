import { useState, useEffect } from 'react';
import Checklist from '../components/PlanningTools/Checklist';
import BudgetTracker from '../components/PlanningTools/BudgetTracker';
import { CheckCircle, PiggyBank } from 'lucide-react';

type ActiveTab = 'checklist' | 'budget';

interface ChecklistItem {
  id: string;
  completed: boolean;
}

interface BudgetData {
  totalBudget: number;
  categories: Array<{
    actualCost: number;
  }>;
}

const formatPeso = (amount: number): string => {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const Plan = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('checklist');
  const [checklistStats, setChecklistStats] = useState({ completed: 0, total: 44 });
  const [budgetStats, setBudgetStats] = useState({ spent: 0, total: 0 });

  // Read stats from localStorage
  useEffect(() => {
    // Checklist stats
    const checklistData = localStorage.getItem('haraya-checklist');
    if (checklistData) {
      try {
        const items: ChecklistItem[] = JSON.parse(checklistData);
        const completed = items.filter(item => item.completed).length;
        setChecklistStats({ completed, total: items.length });
      } catch {
        setChecklistStats({ completed: 0, total: 44 });
      }
    }

    // Budget stats
    const budgetData = localStorage.getItem('haraya-budget');
    if (budgetData) {
      try {
        const data: BudgetData = JSON.parse(budgetData);
        const spent = data.categories.reduce((sum, cat) => sum + cat.actualCost, 0);
        setBudgetStats({ spent, total: data.totalBudget });
      } catch {
        setBudgetStats({ spent: 0, total: 0 });
      }
    }
  }, [activeTab]); // Re-read when switching tabs

  const checklistProgress = checklistStats.total > 0
    ? (checklistStats.completed / checklistStats.total) * 100
    : 0;

  const budgetProgress = budgetStats.total > 0
    ? (budgetStats.spent / budgetStats.total) * 100
    : 0;

  return (
    <div className="min-h-screen bg-bg-primary pattern-hablon">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-text-primary mb-3">
          Plan Your Wedding
        </h1>
        <p className="text-lg text-text-secondary font-light mb-8">
          Everything you need, all in one place
        </p>

        {/* Progress Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Checklist Progress */}
          <div className="bg-bg-primary border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-twilight-blue/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-twilight-blue" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Checklist Progress
                </div>
                <div className="text-lg font-medium text-text-primary">
                  {checklistStats.completed} of {checklistStats.total} tasks done
                </div>
              </div>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-twilight-blue rounded-full transition-all duration-500"
                style={{ width: `${checklistProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="bg-bg-primary border border-border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-golden-hour/10 flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-golden-hour" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Budget Status
                </div>
                <div className="text-lg font-medium text-text-primary">
                  {formatPeso(budgetStats.spent)} of {budgetStats.total > 0 ? formatPeso(budgetStats.total) : '₱0'} spent
                </div>
              </div>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  budgetProgress >= 100
                    ? 'bg-accent-error'
                    : budgetProgress >= 80
                    ? 'bg-accent-warning'
                    : 'bg-golden-hour'
                }`}
                style={{ width: `${Math.min(budgetProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Pill/Segment Style */}
        <div className="bg-whisper/50 border border-border rounded-lg p-1 inline-flex gap-1 mb-8">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-6 py-2.5 font-medium text-sm tracking-wide rounded-md transition-all ${
              activeTab === 'checklist'
                ? 'bg-bg-primary text-twilight-blue shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Checklist
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-6 py-2.5 font-medium text-sm tracking-wide rounded-md transition-all ${
              activeTab === 'budget'
                ? 'bg-bg-primary text-golden-hour shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Budget
          </button>
        </div>

        {/* Tab Content */}
        <div className="pb-16">
          {activeTab === 'checklist' && <Checklist />}
          {activeTab === 'budget' && <BudgetTracker />}
        </div>
      </div>
    </div>
  );
};

export default Plan;
