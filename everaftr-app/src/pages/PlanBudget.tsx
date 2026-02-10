import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BudgetTracker from '../components/PlanningTools/BudgetTracker';

export default function PlanBudget() {
  return (
    <div className="min-h-screen bg-bg-primary pattern-dream">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <Link
          to="/plan"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Planning Space
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-text-primary mb-3">
          Budget
        </h1>
        <p className="text-lg text-text-secondary font-light mb-8">
          Know where every peso goes
        </p>

        <BudgetTracker />
      </div>
    </div>
  );
}
