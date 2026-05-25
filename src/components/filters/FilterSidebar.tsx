import { useState, useEffect, useRef } from 'react';
import { Filter, Search } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';

interface FilterSidebarProps {
  profiles: string[];
  locations: string[];
  durations?: string[];
  hideHeader?: boolean;
  className?: string;
}

export function FilterSidebar({ 
  profiles, 
  locations, 
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
    maxDuration,
    setMaxDuration,
    minStipend,
    setMinStipend,
    startDate,
    setStartDate,
    withJobOffer,
    setWithJobOffer,
    fastResponse,
    setFastResponse,
    earlyApplicant,
    setEarlyApplicant,
    forWomen,
    setForWomen,
    resetFilters,
    showOnlySaved,
    setShowOnlySaved,
    search,
    setSearch,
  } = useFilterStore();

  // Autocomplete suggestions open states
  const [showProfileSuggestions, setShowProfileSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(true);

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
      <div className={className || "w-full bg-white dark:bg-[#1E1E1E] border border-gray-200/70 dark:border-zinc-800 rounded-lg p-3.5 shadow-sm"}>
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center gap-1.5 pb-1 mb-2 select-none">
            <Filter className="w-4 h-4 text-brand-blue" />
            <span className="text-[14px] font-extrabold text-gray-800 dark:text-white">Filters</span>
          </div>
        )}

        <div className="space-y-3.5">
          {/* Show Saved Only checkbox */}
          <div className="flex items-center gap-2 py-0.5">
            <input
              type="checkbox"
              id="saved-only-checkbox"
              checked={showOnlySaved}
              onChange={(e) => setShowOnlySaved(e.target.checked)}
              className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-305 dark:border-zinc-700 cursor-pointer"
            />
            <label
              htmlFor="saved-only-checkbox"
              className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer select-none"
            >
              Saved internships only
            </label>
          </div>

          {/* Preferences Checkbox */}
          <div className="flex items-center gap-2 py-0.5">
            <input
              type="checkbox"
              id="pref-checkbox"
              className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-305 dark:border-zinc-700 cursor-pointer"
            />
            <label
              htmlFor="pref-checkbox"
              className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer select-none"
            >
              As per my <span className="text-[#008BD3] hover:underline">preferences</span>
            </label>
          </div>

          {/* Profile Filter (Searchable Autocomplete) */}
          <div className="relative" ref={profileRef}>
            <label className="block text-[11px] font-bold text-brand-gray-dark dark:text-gray-400 mb-1 select-none">
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
              className="w-full h-8 px-2.5 border border-gray-200 dark:border-zinc-700 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white dark:bg-zinc-800 dark:text-white font-medium"
            />
            {showProfileSuggestions && profile && filteredProfiles.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded shadow-lg max-h-40 overflow-y-auto">
                {filteredProfiles.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setProfile(p);
                      setShowProfileSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-750 dark:text-gray-300 font-medium transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter (Searchable Autocomplete) */}
          <div className="relative" ref={locationRef}>
            <label className="block text-[11px] font-bold text-brand-gray-dark dark:text-gray-400 mb-1 select-none">
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
              className="w-full h-8 px-2.5 border border-gray-200 dark:border-zinc-700 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white dark:bg-zinc-800 dark:text-white disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-zinc-900 font-medium"
            />
            {showLocationSuggestions && location && filteredLocations.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded shadow-lg max-h-40 overflow-y-auto">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-755 dark:text-gray-300 font-medium transition-colors cursor-pointer"
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
                className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-zinc-700 cursor-pointer"
              />
              <label
                htmlFor="my-city-checkbox"
                className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer select-none"
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
                className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-zinc-700 cursor-pointer"
              />
              <label
                htmlFor="wfh-checkbox"
                className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer select-none"
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
                className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-zinc-700 cursor-pointer"
              />
              <label
                htmlFor="part-time-checkbox"
                className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer select-none"
              >
                Part-time
              </label>
            </div>
          </div>

          {/* Stipend Range Slider */}
          <div className="pt-1 select-none">
            <label className="block text-[11px] font-bold text-brand-gray-dark dark:text-gray-400 mb-2">
              Desired minimum monthly stipend (₹)
            </label>
            <div className="px-1 relative">
              <input
                type="range"
                min="0"
                max="10000"
                step="2000"
                value={minStipend}
                onChange={(e) => setMinStipend(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #00A5EC 0%, #00A5EC ${(minStipend / 10000) * 100}%, #E2E8F0 ${(minStipend / 10000) * 100}%, #E2E8F0 100%)`
                }}
                className="custom-range w-full h-[4px] bg-gray-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
                <span>0</span>
                <span>2K</span>
                <span>4K</span>
                <span>6K</span>
                <span>8K</span>
                <span>10K</span>
              </div>
            </div>
          </div>

          {/* View more/less filters toggle */}
          <div className="pt-1.5 select-none">
            <button
              type="button"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="text-[11px] font-bold text-[#008BD3] dark:text-[#00A5EC] hover:text-[#006CB7] flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <span>{showMoreFilters ? 'View less filters' : 'View more filters'}</span>
              <span className="text-[8px]">{showMoreFilters ? '▲' : '▼'}</span>
            </button>
          </div>

          {/* Collapsible Filters */}
          {showMoreFilters && (
            <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-zinc-805 mt-2">
              {/* Starting from date input */}
              <div>
                <label className="block text-[11px] font-bold text-brand-gray-dark dark:text-gray-400 mb-1 select-none">
                  Starting from (or after)
                </label>
                <input
                  type="text"
                  placeholder="Choose date"
                  value={startDate}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-8 px-2.5 border border-gray-255 border-gray-200 dark:border-zinc-700 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white dark:bg-zinc-800 dark:text-white font-medium text-gray-700"
                />
              </div>

              {/* Max duration dropdown */}
              <div>
                <label className="block text-[11px] font-bold text-brand-gray-dark dark:text-gray-400 mb-1 select-none">
                  Max. duration (months)
                </label>
                <select
                  value={maxDuration || ""}
                  onChange={(e) => setMaxDuration(Number(e.target.value))}
                  className="w-full h-8 px-2 border border-gray-200 dark:border-zinc-700 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white dark:bg-zinc-800 dark:text-white cursor-pointer font-medium text-gray-705"
                >
                  <option value="" className="dark:bg-zinc-800">Choose duration</option>
                  {[1, 2, 3, 4, 6, 12].map((m) => (
                    <option key={m} value={m} className="dark:bg-zinc-800">
                      {m} month{m > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Four specialized checkboxes */}
              <div className="space-y-2 pt-1 select-none">
                {/* 1. Job Offer checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="job-offer-checkbox"
                    checked={withJobOffer}
                    onChange={(e) => setWithJobOffer(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-zinc-700 cursor-pointer"
                  />
                  <label
                    htmlFor="job-offer-checkbox"
                    className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer flex items-center"
                  >
                    Internships with job offer
                    <span 
                      className="w-3 h-3 flex items-center justify-center rounded-full bg-transparent border border-gray-400 dark:border-zinc-600 text-[8px] text-gray-500 dark:text-gray-400 font-bold ml-1.5 cursor-help" 
                      title="Includes job offer potential (PPO) upon completion"
                    >
                      ?
                    </span>
                  </label>
                </div>

                {/* 2. Fast response checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="fast-response-checkbox"
                    checked={fastResponse}
                    onChange={(e) => setFastResponse(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-zinc-700 cursor-pointer"
                  />
                  <label
                    htmlFor="fast-response-checkbox"
                    className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer flex items-center"
                  >
                    Fast response
                    <span 
                      className="w-3 h-3 flex items-center justify-center rounded-full bg-transparent border border-gray-400 dark:border-zinc-600 text-[8px] text-gray-500 dark:text-gray-400 font-bold ml-1.5 cursor-help" 
                      title="Companies that respond back within a few days"
                    >
                      ?
                    </span>
                  </label>
                </div>

                {/* 3. Early applicant checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="early-applicant-checkbox"
                    checked={earlyApplicant}
                    onChange={(e) => setEarlyApplicant(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-zinc-700 cursor-pointer"
                  />
                  <label
                    htmlFor="early-applicant-checkbox"
                    className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer flex items-center"
                  >
                    Early applicant
                    <span 
                      className="w-3 h-3 flex items-center justify-center rounded-full bg-transparent border border-gray-400 dark:border-zinc-600 text-[8px] text-gray-500 dark:text-gray-400 font-bold ml-1.5 cursor-help" 
                      title="Be one of the first few to apply to get noticed sooner"
                    >
                      ?
                    </span>
                  </label>
                </div>

                {/* 4. Internships for women checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="for-women-checkbox"
                    checked={forWomen}
                    onChange={(e) => setForWomen(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-brand-blue focus:ring-brand-blue border-gray-300 dark:border-zinc-700 cursor-pointer"
                  />
                  <label
                    htmlFor="for-women-checkbox"
                    className="text-[11px] font-semibold text-brand-gray-dark dark:text-gray-350 cursor-pointer flex items-center"
                  >
                    Internships for women
                    <span 
                      className="w-3 h-3 flex items-center justify-center rounded-full bg-transparent border border-gray-400 dark:border-zinc-600 text-[8px] text-gray-500 dark:text-gray-400 font-bold ml-1.5 cursor-help" 
                      title="Opportunities that are specifically welcoming female applicants"
                    >
                      ?
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Clear all bottom-right link */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={resetFilters}
              className="text-[12px] font-bold text-[#008BD3] hover:text-[#006CB7] dark:text-[#00A5EC] dark:hover:text-[#008BD3] transition-colors cursor-pointer select-none"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* 2. Keyword Search Card (replicated to match Screenshot 2) */}
      <div className="w-full bg-white dark:bg-[#1E1E1E] border border-gray-200/70 dark:border-zinc-800 rounded-lg p-4 shadow-sm select-none">
        <h3 className="text-center font-bold text-[14px] text-gray-800 dark:text-white mb-2.5">
          Keyword Search
        </h3>
        <div className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Design, Mumbai, Infosys"
            className="flex-1 h-9 px-3 border border-gray-200 dark:border-zinc-700 border-r-0 rounded-l-md text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white dark:bg-zinc-800 dark:text-white placeholder-gray-400/60 font-semibold"
          />
          <button
            type="button"
            className="h-9 px-3 bg-[#00A5EC] hover:bg-[#008BD3] text-white rounded-r-md flex items-center justify-center transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
