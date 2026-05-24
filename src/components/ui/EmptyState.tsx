import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = 'No internships found',
  description = 'Try adjusting your filters or search query to find what you are looking for.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-lg border border-brand-gray-border shadow-card max-w-lg mx-auto">
      <div className="w-16 h-16 bg-brand-blue-light rounded-full flex items-center justify-center text-brand-blue mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-brand-gray-dark mb-2">{title}</h3>
      <p className="text-sm text-brand-gray mb-6 leading-relaxed max-w-xs">
        {description}
      </p>
      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset}>
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
