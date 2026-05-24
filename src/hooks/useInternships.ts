import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import type { SearchApiResponse, Internship } from '@/types/internship';
import { FALLBACK_INTERNSHIPS } from '@/services/internshipFallback';

export function useInternships() {
  return useQuery<Internship[]>({
    queryKey: ['internships'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<SearchApiResponse>('/hiring/search');
        const data = response.data;
        
        if (data && data.internships_meta && data.internship_ids) {
          return data.internship_ids
            .map((id) => data.internships_meta[id])
            .filter((item): item is Internship => !!item);
        }
        
        throw new Error('Invalid API response structure');
      } catch (error) {
        console.warn('Failed to fetch internships from live API, falling back to local static dataset.', error);
        
        const data = FALLBACK_INTERNSHIPS;
        return data.internship_ids
          .map((id) => data.internships_meta[id])
          .filter((item): item is Internship => !!item);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
