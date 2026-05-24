import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInternships } from '@/hooks/useInternships';
import { useDerivedFilters } from '@/hooks/useDerivedFilters';
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

  return (
    <Layout
      filterSidebar={
        <FilterSidebar
          profiles={profiles}
          locations={locations}
          durations={durations}
        />
      }
    >
      <InternshipList
        internships={internships}
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
