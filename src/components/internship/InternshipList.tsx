import { useMemo } from 'react';
import { useFilterStore } from '@/store/filterStore';
import type { Internship } from '@/types/internship';
import { InternshipCard } from './InternshipCard';
import { Skeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';

interface InternshipListProps {
  internships: Internship[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function InternshipList({ internships, isLoading, isError }: InternshipListProps) {
  const {
    profile,
    location,
    wfh,
    duration,
    minStipend,
    search,
    resetFilters,
  } = useFilterStore();

  const filteredInternships = useMemo(() => {
    if (!internships) return [];

    const filtered = internships.filter((internship) => {
      // 1. Text Search (title, company, profile, location)
      if (search) {
        const query = search.toLowerCase().trim();
        const searchFields = [
          internship.title,
          internship.company_name,
          internship.profile_name,
          ...(internship.location_names || [])
        ].map(f => (f || '').toLowerCase());

        if (!searchFields.some(field => field.includes(query))) {
          return false;
        }
      }

      // 2. Profile Filter (Case-insensitive)
      if (profile && internship.profile_name?.toLowerCase() !== profile.toLowerCase()) {
        return false;
      }

      // 3. WFH Filter
      const isWfhInternship = internship.work_from_home ||
        (internship.location_names && internship.location_names.some((loc) => 
          loc.toLowerCase().includes('home') || loc.toLowerCase().includes('wfh')
        ));

      if (wfh && !isWfhInternship) {
        return false;
      }

      // 4. Location Filter (Case-insensitive)
      if (!wfh && location) {
        const matchLoc = internship.location_names?.some((loc) => 
          loc.toLowerCase() === location.toLowerCase()
        );
        if (!matchLoc) {
          return false;
        }
      }

      // 5. Duration Filter (Case-insensitive)
      if (duration && internship.duration?.toLowerCase() !== duration.toLowerCase()) {
        return false;
      }

      // 6. Stipend Filter
      if (minStipend > 0) {
        const salaryVal = internship.stipend?.salaryValue1 || 0;
        if (salaryVal < minStipend) {
          return false;
        }
      }

      return true;
    });

    // Sort by latest first (descending timestamp order)
    return filtered.sort((a, b) => b.postedOnDateTime - a.postedOnDateTime);
  }, [internships, profile, location, wfh, duration, minStipend, search]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-3" />
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

  const hasActiveFilters = Boolean(profile || location || wfh || duration || minStipend > 0 || search);

  return (
    <div className="space-y-4">
      {/* Count Label */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-bold text-brand-gray-dark">
          {filteredInternships.length} {filteredInternships.length === 1 ? 'internship' : 'internships'} matching filters
        </h2>
      </div>

      {/* Listings or Empty State */}
      {filteredInternships.length > 0 ? (
        <div className="space-y-4">
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
