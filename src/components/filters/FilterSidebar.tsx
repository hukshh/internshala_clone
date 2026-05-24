import { Filter, RotateCcw } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { STIPEND_OPTIONS } from '@/constants';

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
    duration,
    setDuration,
    minStipend,
    setMinStipend,
    resetFilters,
  } = useFilterStore();

  return (
    <div className={className || "w-full bg-white border border-gray-200/70 rounded-lg p-3.5 shadow-sm"}>
      {/* Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-brand-gray-dark font-bold text-xs sm:text-sm">
            <Filter className="w-3.5 h-3.5 text-brand-blue" />
            <span>Filters</span>
          </div>
          <button
            onClick={resetFilters}
            className="text-[10px] font-bold text-brand-blue hover:text-brand-blue-hover flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            Clear all
          </button>
        </div>
      )}

      <div className="space-y-3">
        {/* Profile Filter */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-wide">
            Profile
          </label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full h-8 px-2 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white cursor-pointer hover:border-gray-300 transition-colors"
          >
            <option value="">Select Profile</option>
            {profiles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-wide">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={wfh}
            className="w-full h-8 px-2 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white disabled:opacity-50 disabled:bg-slate-50 cursor-pointer hover:border-gray-300 transition-colors"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* WFH Checkbox */}
        <div className="flex items-center gap-2 py-0.5">
          <input
            type="checkbox"
            id="wfh-checkbox"
            checked={wfh}
            onChange={(e) => {
              setWfh(e.target.checked);
              if (e.target.checked) {
                // If WFH is checked, clear location filter
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

        {/* Duration Filter */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-wide">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full h-8 px-2 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white cursor-pointer hover:border-gray-300 transition-colors"
          >
            <option value="">Select Duration</option>
            {durations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Stipend radio group */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
            Minimum Monthly Stipend
          </label>
          <div className="space-y-1.5">
            {STIPEND_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-[11px] text-brand-gray-dark font-medium cursor-pointer select-none">
                <input
                  type="radio"
                  name="min-stipend"
                  checked={minStipend === opt.value}
                  onChange={() => setMinStipend(opt.value)}
                  className="w-3.5 h-3.5 text-brand-blue focus:ring-brand-blue border-gray-300 cursor-pointer"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
