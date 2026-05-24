import { create } from 'zustand';

interface FilterState {
  profile: string;
  location: string;
  wfh: boolean;
  partTime: boolean;
  duration: string;
  minStipend: number;
  search: string;
  setProfile: (profile: string) => void;
  setLocation: (location: string) => void;
  setWfh: (wfh: boolean) => void;
  setPartTime: (partTime: boolean) => void;
  setDuration: (duration: string) => void;
  setMinStipend: (minStipend: number) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  profile: '',
  location: '',
  wfh: false,
  partTime: false,
  duration: '',
  minStipend: 0,
  search: '',
  setProfile: (profile) => set({ profile }),
  setLocation: (location) => set({ location }),
  setWfh: (wfh) => set({ wfh }),
  setPartTime: (partTime) => set({ partTime }),
  setDuration: (duration) => set({ duration }),
  setMinStipend: (minStipend) => set({ minStipend }),
  setSearch: (search) => set({ search }),
  resetFilters: () => set({
    profile: '',
    location: '',
    wfh: false,
    partTime: false,
    duration: '',
    minStipend: 0,
    search: '',
  }),
}));
