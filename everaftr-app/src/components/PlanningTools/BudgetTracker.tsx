import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface BudgetCategory {
  id: string;
  name: string;
  estimatedCost: number;
  actualCost: number;
  suggestedPercentage: string;
}

const INITIAL_BUDGET_CATEGORIES: Omit<BudgetCategory, 'id'>[] = [
  {
    name: 'Venue & Catering',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '35-40%',
  },
  {
    name: 'Photo & Video',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '10-15%',
  },
  {
    name: 'Coordination',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '5-8%',
  },
  {
    name: 'Flowers & Styling',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '5-10%',
  },
  {
    name: 'Attire & HMUA',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '5-8%',
  },
  {
    name: 'Lights & Sound',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '3-5%',
  },
  {
    name: 'Invitations',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '2-3%',
  },
  {
    name: 'Ceremony Fees',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '2-5%',
  },
  {
    name: 'Transportation',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '1-3%',
  },
  {
    name: 'Miscellaneous/Emergency',
    estimatedCost: 0,
    actualCost: 0,
    suggestedPercentage: '10%',
  },
];

interface BudgetData {
  totalBudget: number;
  categories: BudgetCategory[];
}

const formatPeso = (amount: number): string => {
  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const BudgetTracker = () => {
  const [budgetData, setBudgetData] = useState<BudgetData>({
    totalBudget: 0,
    categories: [],
  });
  const [isEditingTotal, setIsEditingTotal] = useState(false);
  const [totalBudgetInput, setTotalBudgetInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('haraya-budget');
    if (stored) {
      try {
        setBudgetData(JSON.parse(stored));
      } catch {
        initializeBudget();
      }
    } else {
      initializeBudget();
    }
  }, []);

  const initializeBudget = () => {
    const categories = INITIAL_BUDGET_CATEGORIES.map((cat, index) => ({
      ...cat,
      id: `category-${index + 1}`,
    }));
    setBudgetData({
      totalBudget: 0,
      categories,
    });
  };

  // Save to localStorage whenever budgetData changes
  useEffect(() => {
    if (budgetData.categories.length > 0) {
      localStorage.setItem('haraya-budget', JSON.stringify(budgetData));
    }
  }, [budgetData]);

  const updateTotalBudget = () => {
    const amount = parseFloat(totalBudgetInput.replace(/[^0-9.]/g, ''));
    if (!isNaN(amount) && amount > 0) {
      setBudgetData((prev) => ({ ...prev, totalBudget: amount }));
    }
    setIsEditingTotal(false);
    setShowCustomInput(false);
  };

  const setPresetBudget = (amount: number) => {
    setBudgetData((prev) => ({ ...prev, totalBudget: amount }));
  };

  const updateCategoryEstimate = (id: string, value: string) => {
    const amount = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    setBudgetData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === id ? { ...cat, estimatedCost: amount } : cat
      ),
    }));
  };

  const updateCategoryActual = (id: string, value: string) => {
    const amount = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    setBudgetData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === id ? { ...cat, actualCost: amount } : cat
      ),
    }));
  };

  const addCustomCategory = () => {
    const newCategory: BudgetCategory = {
      id: `custom-${Date.now()}`,
      name: 'Custom Category',
      estimatedCost: 0,
      actualCost: 0,
      suggestedPercentage: '',
    };
    setBudgetData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }));
  };

  const updateCategoryName = (id: string, name: string) => {
    setBudgetData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === id ? { ...cat, name } : cat
      ),
    }));
  };

  const removeCategory = (id: string) => {
    setBudgetData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat.id !== id),
    }));
  };

  const totalSpent = budgetData.categories.reduce(
    (sum, cat) => sum + cat.actualCost,
    0
  );
  const remaining = budgetData.totalBudget - totalSpent;
  const percentUsed =
    budgetData.totalBudget > 0
      ? (totalSpent / budgetData.totalBudget) * 100
      : 0;

  const getBudgetStatusColor = (): string => {
    if (percentUsed >= 100) return 'text-accent-error';
    if (percentUsed >= 80) return 'text-accent-warning';
    return 'text-accent-success';
  };

  return (
    <div className="max-w-6xl">
      {budgetData.totalBudget === 0 ? (
        /* Onboarding State - Budget Presets */
        <div className="bg-bg-primary border border-border rounded-lg p-8 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-serif font-light text-text-primary mb-2">
              Let's set your budget
            </h3>
            <p className="text-text-secondary">
              Choose a starting point or enter a custom amount
            </p>
          </div>

          {!showCustomInput ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {[
                { label: '₱100,000', value: 100000, desc: 'Intimate' },
                { label: '₱150,000', value: 150000, desc: 'Practical' },
                { label: '₱250,000', value: 250000, desc: 'Moderate' },
                { label: '₱500,000', value: 500000, desc: 'Standard' },
                { label: '₱1,000,000', value: 1000000, desc: 'Grand' },
              ].map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setPresetBudget(preset.value)}
                  className="p-6 border-2 border-border rounded-lg hover:border-golden-hour hover:bg-golden-hour/5 transition-all group"
                >
                  <div className="text-2xl font-medium text-text-primary group-hover:text-hablon-green transition-colors">
                    {preset.label}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">
                    {preset.desc}
                  </div>
                </button>
              ))}
              <button
                onClick={() => setShowCustomInput(true)}
                className="p-6 border-2 border-dashed border-border rounded-lg hover:border-hablon-blue hover:bg-hablon-blue/5 transition-all group"
              >
                <div className="text-xl font-medium text-text-primary group-hover:text-hablon-blue transition-colors">
                  Custom
                </div>
                <div className="text-sm text-text-secondary mt-1">
                  Enter amount
                </div>
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={totalBudgetInput}
                  onChange={(e) => setTotalBudgetInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && updateTotalBudget()}
                  placeholder="Enter amount (e.g., 350000)"
                  className="flex-1 px-4 py-3 text-lg border border-border rounded bg-bg-primary text-text-primary focus:border-hablon-green focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={updateTotalBudget}
                  className="px-6 py-3 bg-golden-hour text-white rounded hover:bg-golden-hour/90 transition-colors"
                >
                  Set
                </button>
              </div>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setTotalBudgetInput('');
                }}
                className="mt-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Back to presets
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Total Budget Card */}
          <div className="bg-bg-primary border border-border rounded-lg p-6 mb-6">
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
              Total Budget
            </label>
            {isEditingTotal ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={totalBudgetInput}
                  onChange={(e) => setTotalBudgetInput(e.target.value)}
                  onBlur={updateTotalBudget}
                  onKeyDown={(e) => e.key === 'Enter' && updateTotalBudget()}
                  placeholder="₱350,000"
                  className="flex-1 px-4 py-3 text-2xl font-medium border border-border rounded bg-bg-primary text-text-primary focus:border-golden-hour focus:outline-none"
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsEditingTotal(true);
                  setTotalBudgetInput(budgetData.totalBudget.toString());
                }}
                className="text-3xl font-medium text-text-primary hover:text-golden-hour transition-colors"
              >
                {formatPeso(budgetData.totalBudget)}
              </button>
            )}
          </div>

          {/* Summary Cards - 3 cards instead of 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-bg-primary border border-border rounded-lg p-5">
              <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                Total Spent
              </div>
              <div className="text-2xl font-medium text-text-primary">
                {formatPeso(totalSpent)}
              </div>
            </div>

            <div className="bg-bg-primary border border-border rounded-lg p-5">
              <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                Remaining
              </div>
              <div className={`text-2xl font-medium ${getBudgetStatusColor()}`}>
                {formatPeso(remaining)}
              </div>
            </div>

            <div className="bg-bg-primary border border-border rounded-lg p-5">
              <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                % Used
              </div>
              <div className={`text-2xl font-medium ${getBudgetStatusColor()}`}>
                {percentUsed.toFixed(1)}%
              </div>
            </div>
          </div>
        </>
      )}

      {/* Category Breakdown */}
      <div className="bg-bg-primary border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-text-primary">
              Budget Breakdown
            </h3>
            <button
              onClick={addCustomCategory}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded text-text-primary hover:border-dream-lavender hover:text-dream-lavender transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-whisper">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Suggested %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Estimated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Difference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {budgetData.categories.map((category) => {
                const difference = category.estimatedCost - category.actualCost;
                const progressPercent =
                  category.estimatedCost > 0
                    ? (category.actualCost / category.estimatedCost) * 100
                    : 0;
                const isCustom = category.id.startsWith('custom-');

                return (
                  <tr key={category.id} className="hover:bg-bg-warm/50">
                    <td className="px-6 py-4">
                      {isCustom ? (
                        <input
                          type="text"
                          value={category.name}
                          onChange={(e) =>
                            updateCategoryName(category.id, e.target.value)
                          }
                          className="w-full px-2 py-1 text-sm border border-border rounded bg-bg-primary text-text-primary focus:border-golden-hour focus:outline-none"
                        />
                      ) : (
                        <span className="text-sm font-medium text-text-primary">
                          {category.name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {category.suggestedPercentage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={
                          category.estimatedCost > 0
                            ? formatPeso(category.estimatedCost)
                            : ''
                        }
                        onChange={(e) =>
                          updateCategoryEstimate(category.id, e.target.value)
                        }
                        placeholder="₱0"
                        className="w-32 px-3 py-2 text-sm border border-border rounded bg-bg-primary text-text-primary focus:border-golden-hour focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={
                          category.actualCost > 0 ? formatPeso(category.actualCost) : ''
                        }
                        onChange={(e) =>
                          updateCategoryActual(category.id, e.target.value)
                        }
                        placeholder="₱0"
                        className="w-32 px-3 py-2 text-sm border border-border rounded bg-bg-primary text-text-primary focus:border-golden-hour focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${
                          difference >= 0
                            ? 'text-accent-success'
                            : 'text-accent-error'
                        }`}
                      >
                        {formatPeso(Math.abs(difference))}
                        {difference < 0 ? ' over' : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              progressPercent >= 100
                                ? 'bg-accent-error'
                                : progressPercent >= 80
                                ? 'bg-accent-warning'
                                : 'bg-golden-hour'
                            }`}
                            style={{
                              width: `${Math.min(progressPercent, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isCustom && (
                        <button
                          onClick={() => removeCategory(category.id)}
                          className="text-accent-error hover:text-tnalak-red transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {budgetData.categories.map((category) => {
            const difference = category.estimatedCost - category.actualCost;
            const progressPercent =
              category.estimatedCost > 0
                ? (category.actualCost / category.estimatedCost) * 100
                : 0;
            const isCustom = category.id.startsWith('custom-');
            const isOverBudget = category.actualCost > category.estimatedCost && category.estimatedCost > 0;

            return (
              <div
                key={category.id}
                className={`border rounded-lg p-4 ${
                  isOverBudget
                    ? 'border-accent-error/50 bg-accent-error/5'
                    : 'border-border'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  {isCustom ? (
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) =>
                        updateCategoryName(category.id, e.target.value)
                      }
                      className="flex-1 px-2 py-1 text-sm font-medium border border-border rounded bg-bg-primary text-text-primary focus:border-golden-hour focus:outline-none mr-2"
                    />
                  ) : (
                    <h4 className="text-sm font-medium text-text-primary">
                      {category.name}
                    </h4>
                  )}
                  {category.suggestedPercentage && (
                    <span className="text-xs text-text-secondary whitespace-nowrap">
                      {category.suggestedPercentage}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">
                      Estimated
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={
                        category.estimatedCost > 0 ? formatPeso(category.estimatedCost) : ''
                      }
                      onChange={(e) =>
                        updateCategoryEstimate(category.id, e.target.value)
                      }
                      placeholder="₱0"
                      className="w-full px-3 py-2 text-sm border border-border rounded bg-bg-primary text-text-primary focus:border-golden-hour focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">
                      Actual
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={category.actualCost > 0 ? formatPeso(category.actualCost) : ''}
                      onChange={(e) =>
                        updateCategoryActual(category.id, e.target.value)
                      }
                      placeholder="₱0"
                      className="w-full px-3 py-2 text-sm border border-border rounded bg-bg-primary text-text-primary focus:border-golden-hour focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-text-secondary">Difference:</span>
                  <span
                    className={`font-medium ${
                      difference >= 0
                        ? 'text-accent-success'
                        : 'text-accent-error'
                    }`}
                  >
                    {formatPeso(Math.abs(difference))}
                    {difference < 0 ? ' over' : ''}
                  </span>
                </div>

                <div className="h-2 bg-border rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      progressPercent >= 100
                        ? 'bg-accent-error'
                        : progressPercent >= 80
                        ? 'bg-accent-warning'
                        : 'bg-golden-hour'
                    }`}
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  ></div>
                </div>

                {isCustom && (
                  <button
                    onClick={() => removeCategory(category.id)}
                    className="flex items-center gap-1 text-sm text-accent-error hover:text-tnalak-red transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Category Button at Bottom (Mobile Only) */}
          <button
            onClick={addCustomCategory}
            className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-dream-lavender hover:bg-dream-lavender/5 transition-all text-text-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Category</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
