import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInternships } from '@/hooks/useInternships';
import { useDerivedFilters } from '@/hooks/useDerivedFilters';
import { useFilterStore } from '@/store/filterStore';
import { Layout } from '@/components/layout/Layout';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { InternshipList } from '@/components/internship/InternshipList';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MainSearchPage() {
  const { data: internships, isLoading, isError } = useInternships();
  const { profiles, locations, durations } = useDerivedFilters(internships);
  
  const {
    profile,
    location,
    wfh,
    partTime,
    duration,
    minStipend,
    search,
  } = useFilterStore();

  const filteredInternships = useMemo(() => {
    if (!internships) return [];

    const filtered = internships.filter((internship) => {
      // 1. Text Search (title, company, profile, location)
      if (search) {
        const query = search.toLowerCase().trim();
        if (query) {
          const queryWords = query.split(/\s+/);
          const searchFields = [
            internship.title,
            internship.company_name,
            internship.profile_name,
            ...(internship.location_names || [])
          ].map(f => (f || '').toLowerCase());

          const matchesAllWords = queryWords.every(word =>
            searchFields.some(field => field.includes(word))
          );

          if (!matchesAllWords) {
            return false;
          }
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

      // 6. Part-time Filter
      if (partTime && !internship.part_time) {
        return false;
      }

      // 7. Stipend Filter
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
  }, [internships, profile, location, wfh, partTime, duration, minStipend, search]);

  const totalCount = filteredInternships.length;

  return (
    <Layout
      header={
        <div className="select-none text-left w-full">
          <div className="text-[11px] font-semibold text-gray-400 mb-2.5 tracking-wide">
            <span className="hover:text-brand-blue cursor-pointer">Home</span>
            <span className="mx-1.5">&gt;</span>
            <span className="text-gray-500">Internships</span>
          </div>
          
          {!isLoading && !isError && (
            <div className="text-center mt-3 mb-2">
              <h1 className="text-xl sm:text-[22px] font-black text-gray-800 tracking-tight">
                {totalCount} Total Internships
              </h1>
              <p className="text-xs sm:text-xs text-gray-400 font-bold mt-1 select-none">
                Latest Summer Internships in India
              </p>
            </div>
          )}
        </div>
      }
      filterSidebar={
        <FilterSidebar
          profiles={profiles}
          locations={locations}
          durations={durations}
        />
      }
    >
      <InternshipList
        filteredInternships={filteredInternships}
        isLoading={isLoading}
        isError={isError}
      />
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainSearchPage />
    </QueryClientProvider>
  );
}

export default App;
