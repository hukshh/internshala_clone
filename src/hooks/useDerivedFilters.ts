import { useMemo } from 'react';
import type { Internship } from '@/types/internship';

export function useDerivedFilters(internships: Internship[] | undefined) {
  return useMemo(() => {
    if (!internships || internships.length === 0) {
      return {
        profiles: [] as string[],
        locations: [] as string[],
        durations: [] as string[],
      };
    }

    const profilesSet = new Set<string>();
    const locationsSet = new Set<string>();
    const durationsSet = new Set<string>();

    internships.forEach((internship) => {
      if (internship.profile_name) {
        profilesSet.add(internship.profile_name.trim());
      }

      if (internship.location_names && Array.isArray(internship.location_names)) {
        internship.location_names.forEach((loc) => {
          if (loc) {
            locationsSet.add(loc.trim());
          }
        });
      }

      if (internship.duration) {
        durationsSet.add(internship.duration.trim());
      }
    });

    return {
      profiles: Array.from(profilesSet).sort(),
      locations: Array.from(locationsSet).sort(),
      durations: Array.from(durationsSet).sort(),
    };
  }, [internships]);
}
