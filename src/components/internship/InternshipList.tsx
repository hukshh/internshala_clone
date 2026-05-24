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

    return internships.filter((internship) => {
      // 1. Text Search (title, company, profile, location)
      if (search) {
        const query = search.toLowerCase().trim();
        const matchTitle = internship.title?.toLowerCase().includes(query);
        const matchCompany = internship.company_name?.toLowerCase().includes(query);
        const matchProfile = internship.profile_name?.toLowerCase().includes(query);
        const matchLocs = internship.location_names?.some((loc) =>
          loc.toLowerCase().includes(query)
        );

        if (!matchTitle && !matchCompany && !matchProfile && !matchLocs) {
          return false;
        }
      }

      // 2. Profile Filter
      if (profile && internship.profile_name !== profile) {
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

      // 4. Location Filter (only check if WFH is not checked)
      if (!wfh && location) {
        const matchLoc = internship.location_names?.some((loc) => loc === location);
        if (!matchLoc) {
          return false;
        }
      }

      // 5. Duration Filter
      if (duration && internship.duration !== duration) {
        return false;
      }

      // 6. Stipend Filter (check stipend.salaryValue1)
      if (minStipend > 0) {
        const salaryVal = internship.stipend?.salaryValue1 || 0;
        if (salaryVal < minStipend) {
          return false;
        }
      }

      return true;
    });
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
        <EmptyState onReset={resetFilters} />
      )}
    </div>
  );
}
