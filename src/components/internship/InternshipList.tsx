import { Zap, Clock, ChevronRight, Award } from 'lucide-react';
import type { Internship } from '@/types/internship';
import { InternshipCard } from './InternshipCard';
import { Skeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import { useFilterStore } from '@/store/filterStore';

interface InternshipListProps {
  filteredInternships: Internship[];
  isLoading: boolean;
  isError: boolean;
}

export function InternshipList({ filteredInternships, isLoading, isError }: InternshipListProps) {
  const {
    profile,
    location,
    wfh,
    partTime,
    duration,
    minStipend,
    search,
    resetFilters,
  } = useFilterStore();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-gray-200/75 rounded-lg p-3.5 sm:p-4.5 bg-white space-y-3.5 shadow-sm">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5 border-t border-slate-100/60 pt-2.5 pb-0.5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex justify-between items-center pt-1.5">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Error loading internships"
        description="We were unable to retrieve the internship listings. Please check your internet connection or try again."
      />
    );
  }

  const hasActiveFilters = Boolean(profile || location || wfh || partTime || duration || minStipend > 0 || search);

  return (
    <div className="space-y-4">
      {/* Listings or Empty State */}
      {filteredInternships.length > 0 ? (
        <div className="space-y-3.5">
          {/* Promotional Banner Card matching Screenshot 1 */}
          <div className="bg-white dark:bg-[#1E1E1E] border border-amber-100/80 dark:border-zinc-800 rounded-lg p-4 sm:p-4.5 hover:shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_2px_12px_rgba(0,0,0,0.1)] transition-shadow relative select-none">
            {/* Offer badge in top-right */}
            <span className="absolute top-4 right-4 bg-[#FF9800] text-white text-[9px] font-black px-2 py-0.5 rounded-xs select-none tracking-wide">
              OFFER
            </span>
            
            <div className="space-y-2 max-w-[85%]">
              <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white leading-snug">
                Get Internship and Job Preparation training FREE!
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-505 dark:text-gray-400 font-semibold leading-none">
                By enrolling in trainings at 55% + 10% OFF!
              </p>

              {/* Coupon and Timer */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#FF9800] fill-[#FF9800]" />
                  <span>Use coupon: <span className="text-gray-800 dark:text-white font-black">GD10</span></span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Offer ends in <span className="text-gray-700 dark:text-gray-300 font-bold">01d: 00h: 32m: 16s</span></span>
                </span>
              </div>

              {/* Description snippet */}
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium pt-1">
                Choose from Artificial Intelligence and Machine Learning, Full Stack Web Development with AI, Programming in Python with AI, Web Dev. & more
              </p>

              {/* Badges and action */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100/50 dark:border-zinc-800 mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/30 dark:border-emerald-900/30 px-2 py-0.5 rounded">
                  <Award className="w-3 h-3 text-emerald-600" />
                  <span>Government Certified Trainings</span>
                </span>
                
                <a 
                  href="#" 
                  className="inline-flex items-center gap-0.5 text-xs sm:text-[13px] font-black text-[#008BD3] dark:text-[#00A5EC] hover:text-[#006CB7] dark:hover:text-[#008BD3] transition-colors"
                >
                  <span>Enroll now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Internship Listing Cards */}
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No internships found for selected filters"
          description={hasActiveFilters ? "Try adjusting your filters or search query to find what you are looking for." : "Check back later for new internship opportunities."}
          onReset={hasActiveFilters ? resetFilters : undefined}
        />
      )}
    </div>
  );
}
