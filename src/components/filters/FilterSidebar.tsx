import { useState, useEffect, useRef } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { SearchInput } from '@/components/layout/Navbar';

interface FilterSidebarProps {
  profiles: string[];
  locations: string[];
  durations: string[];
  hideHeader?: boolean;
  className?: string;
}

export function FilterSidebar({ 
  profiles, 
  locations, 
  durations,
  hideHeader = false,
  className
}: FilterSidebarProps) {
  const {
    profile,
    setProfile,
    location,
    setLocation,
    wfh,
    setWfh,
    partTime,
    setPartTime,
    duration,
    setDuration,
    minStipend,
    setMinStipend,
    search,
    setSearch,
    resetFilters,
  } = useFilterStore();

  // Autocomplete suggestions open states
  const [showProfileSuggestions, setShowProfileSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Click outside suggestions lists to close them
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestion arrays
  const filteredProfiles = profiles.filter((p) =>
    p.toLowerCase().includes(profile.toLowerCase())
  );

  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full">
      {/* 1. Filters Card */}
      <div className={className || "w-full bg-white border border-gray-200/70 rounded-lg p-3.5 shadow-sm"}>
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center gap-1.5 text-brand-gray-dark font-bold text-xs sm:text-sm pb-2 mb-2.5 border-b border-slate-100 select-none">
            <Filter className="w-3.5 h-3.5 text-brand-blue" />
            <span>Filters</span>
          </div>
        )}

        <div className="space-y-3.5">
          {/* Preferences Checkbox */}
          <div className="flex items-center gap-2 py-0.5">
            <input
              type="checkbox"
              id="pref-checkbox"
              className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="pref-checkbox"
              className="text-[11px] font-semibold text-brand-gray-dark cursor-pointer select-none"
            >
              As per my <span className="text-[#008BD3] hover:underline">preferences</span>
            </label>
          </div>

          {/* Profile Filter (Searchable Autocomplete) */}
          <div className="relative" ref={profileRef}>
            <label className="block text-[11px] font-bold text-brand-gray-dark mb-1 select-none">
              Profile
            </label>
            <input
              type="text"
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value);
                setShowProfileSuggestions(true);
              }}
              onFocus={() => setShowProfileSuggestions(true)}
              placeholder="e.g. Marketing"
              className="w-full h-8 px-2.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white font-medium"
            />
            {showProfileSuggestions && profile && filteredProfiles.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-y-auto">
                {filteredProfiles.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setProfile(p);
                      setShowProfileSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 text-gray-700 font-medium transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter (Searchable Autocomplete) */}
          <div className="relative" ref={locationRef}>
            <label className="block text-[11px] font-bold text-brand-gray-dark mb-1 select-none">
              Location
            </label>
            <input
              type="text"
              value={location}
              disabled={wfh}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowLocationSuggestions(true);
              }}
              onFocus={() => setShowLocationSuggestions(true)}
              placeholder="e.g. Delhi"
              className="w-full h-8 px-2.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white disabled:opacity-50 disabled:bg-slate-50 font-medium"
            />
            {showLocationSuggestions && location && filteredLocations.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-y-auto">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 text-gray-700 font-medium transition-colors cursor-pointer"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Standard Checkboxes */}
          <div className="space-y-1.5 pt-1">
            {/* In my city (dummy) */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="my-city-checkbox"
                className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 cursor-pointer"
              />
              <label
                htmlFor="my-city-checkbox"
                className="text-[11px] font-semibold text-brand-gray-dark cursor-pointer select-none"
              >
                Internships in my city
              </label>
            </div>

            {/* WFH Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="wfh-checkbox"
                checked={wfh}
                onChange={(e) => {
                  setWfh(e.target.checked);
                  if (e.target.checked) {
                    setLocation('');
                  }
                }}
                className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 cursor-pointer"
              />
              <label
                htmlFor="wfh-checkbox"
                className="text-[11px] font-semibold text-brand-gray-dark cursor-pointer select-none"
              >
                Work from home
              </label>
            </div>

            {/* Part-time Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="part-time-checkbox"
                checked={partTime}
                onChange={(e) => setPartTime(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 cursor-pointer"
              />
              <label
                htmlFor="part-time-checkbox"
                className="text-[11px] font-semibold text-brand-gray-dark cursor-pointer select-none"
              >
                Part-time
              </label>
            </div>
          </div>

          {/* Stipend Range Slider */}
          <div className="pt-1">
            <label className="block text-[11px] font-bold text-brand-gray-dark mb-2 select-none">
              Desired minimum monthly stipend (₹)
            </label>
            <div className="px-1">
              <input
                type="range"
                min="0"
                max="10000"
                step="2000"
                value={minStipend}
                onChange={(e) => setMinStipend(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#008BD3] focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-gray-400 font-semibold mt-1 select-none">
                <span>0</span>
                <span>2K</span>
                <span>4K</span>
                <span>6K</span>
                <span>8K</span>
                <span>10K</span>
              </div>
            </div>
          </div>

          {/* View more filters toggle */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="text-[11px] font-bold text-[#008BD3] hover:text-[#006CB7] flex items-center gap-0.5 transition-colors cursor-pointer select-none"
            >
              <span>{showMoreFilters ? 'View less filters' : 'View more filters'}</span>
              <span className="text-[8px]">{showMoreFilters ? '▲' : '▼'}</span>
            </button>
          </div>

          {/* Collapsible Duration Filter */}
          {showMoreFilters && (
            <div className="pt-2 border-t border-slate-100 mt-2">
              <label className="block text-[11px] font-bold text-brand-gray-dark mb-1 select-none">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full h-8 px-2 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white cursor-pointer"
              >
                <option value="">Select Duration</option>
                {durations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Clear all bottom-right link */}
          <div className="flex justify-end pt-2 border-t border-slate-50 mt-2">
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-bold text-[#008BD3] hover:text-[#006CB7] flex items-center gap-0.5 transition-colors cursor-pointer select-none"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* 2. Keyword Search Card */}
      <div className="w-full bg-white border border-gray-200/70 rounded-lg p-3.5 shadow-sm">
        <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide select-none">
          Keyword Search
        </label>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          placeholder="e.g. Design, Mumbai, Google"
          className="w-full"
        />
      </div>
    </div>
  );
}
