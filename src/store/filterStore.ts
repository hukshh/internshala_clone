import { create } from 'zustand';

interface FilterState {
  profile: string;
  location: string;
  wfh: boolean;
  partTime: boolean;
  duration: string;
  maxDuration: number; // in months
  minStipend: number;
  search: string;
  startDate: string; // date string "YYYY-MM-DD"
  withJobOffer: boolean;
  fastResponse: boolean;
  earlyApplicant: boolean;
  forWomen: boolean;

  // New features
  activeInternshipId: number | null;
  savedIds: number[];
  appliedIds: number[];
  isDarkMode: boolean;
  showOnlySaved: boolean;

  setProfile: (profile: string) => void;
  setLocation: (location: string) => void;
  setWfh: (wfh: boolean) => void;
  setPartTime: (partTime: boolean) => void;
  setDuration: (duration: string) => void;
  setMaxDuration: (maxDuration: number) => void;
  setMinStipend: (minStipend: number) => void;
  setSearch: (search: string) => void;
  setStartDate: (startDate: string) => void;
  setWithJobOffer: (withJobOffer: boolean) => void;
  setFastResponse: (fastResponse: boolean) => void;
  setEarlyApplicant: (earlyApplicant: boolean) => void;
  setForWomen: (forWomen: boolean) => void;
  resetFilters: () => void;

  // New setters & toggles
  setActiveInternshipId: (activeInternshipId: number | null) => void;
  toggleSave: (id: number) => void;
  applyToInternship: (id: number) => void;
  toggleTheme: () => void;
  setShowOnlySaved: (showOnlySaved: boolean) => void;
}

// Initialize theme from localStorage or system preferences
const getInitialTheme = (): boolean => {
  if (typeof window === 'undefined') return false;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) return storedTheme === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialTheme = getInitialTheme();
if (typeof window !== 'undefined') {
  if (initialTheme) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useFilterStore = create<FilterState>((set) => ({
  profile: '',
  location: '',
  wfh: false,
  partTime: false,
  duration: '',
  maxDuration: 0,
  minStipend: 0,
  search: '',
  startDate: '',
  withJobOffer: false,
  fastResponse: false,
  earlyApplicant: false,
  forWomen: false,

  // New features default values
  activeInternshipId: null,
  savedIds: JSON.parse(localStorage.getItem('saved_internships') || '[]'),
  appliedIds: JSON.parse(localStorage.getItem('applied_internships') || '[]'),
  isDarkMode: initialTheme,
  showOnlySaved: false,

  setProfile: (profile) => set({ profile }),
  setLocation: (location) => set({ location }),
  setWfh: (wfh) => set({ wfh }),
  setPartTime: (partTime) => set({ partTime }),
  setDuration: (duration) => set({ duration }),
  setMaxDuration: (maxDuration) => set({ maxDuration }),
  setMinStipend: (minStipend) => set({ minStipend }),
  setSearch: (search) => set({ search }),
  setStartDate: (startDate) => set({ startDate }),
  setWithJobOffer: (withJobOffer) => set({ withJobOffer }),
  setFastResponse: (fastResponse) => set({ fastResponse }),
  setEarlyApplicant: (earlyApplicant) => set({ earlyApplicant }),
  setForWomen: (forWomen) => set({ forWomen }),
  
  resetFilters: () => set({
    profile: '',
    location: '',
    wfh: false,
    partTime: false,
    duration: '',
    maxDuration: 0,
    minStipend: 0,
    search: '',
    startDate: '',
    withJobOffer: false,
    fastResponse: false,
    earlyApplicant: false,
    forWomen: false,
    showOnlySaved: false,
  }),

  // New actions
  setActiveInternshipId: (activeInternshipId) => set({ activeInternshipId }),
  
  toggleSave: (id) => set((state) => {
    const isSaved = state.savedIds.includes(id);
    const newSaved = isSaved 
      ? state.savedIds.filter(savedId => savedId !== id)
      : [...state.savedIds, id];
    localStorage.setItem('saved_internships', JSON.stringify(newSaved));
    return { savedIds: newSaved };
  }),

  applyToInternship: (id) => set((state) => {
    if (state.appliedIds.includes(id)) return {};
    const newApplied = [...state.appliedIds, id];
    localStorage.setItem('applied_internships', JSON.stringify(newApplied));
    return { appliedIds: newApplied };
  }),

  toggleTheme: () => set((state) => {
    const nextTheme = !state.isDarkMode;
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
    if (nextTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: nextTheme };
  }),

  setShowOnlySaved: (showOnlySaved) => set({ showOnlySaved }),
}));

