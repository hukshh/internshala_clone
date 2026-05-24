import { Filter, RotateCcw } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import { STIPEND_OPTIONS } from '@/constants';

interface FilterSidebarProps {
  profiles: string[];
  locations: string[];
  durations: string[];
}

export function FilterSidebar({ profiles, locations, durations }: FilterSidebarProps) {
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
    <div className="w-full bg-white border border-brand-gray-border rounded-lg p-5 shadow-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-gray-border">
        <div className="flex items-center gap-2 text-brand-gray-dark font-bold text-base">
          <Filter className="w-4.5 h-4.5 text-brand-blue" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-brand-blue hover:text-brand-blue-hover flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Clear all
        </button>
      </div>

      <div className="space-y-5">
        {/* Profile Filter */}
        <div>
          <label className="block text-xs font-bold text-brand-gray mb-2 uppercase tracking-wider">
            Profile
          </label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full h-10 px-3 border border-brand-gray-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white cursor-pointer hover:border-brand-gray transition-colors"
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
          <label className="block text-xs font-bold text-brand-gray mb-2 uppercase tracking-wider">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={wfh}
            className="w-full h-10 px-3 border border-brand-gray-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white disabled:opacity-50 disabled:bg-brand-gray-light cursor-pointer hover:border-brand-gray transition-colors"
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
        <div className="flex items-center gap-2.5 py-1">
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
            className="w-4 h-4 rounded text-brand-blue focus:ring-brand-blue border-brand-gray-border cursor-pointer"
          />
          <label
            htmlFor="wfh-checkbox"
            className="text-sm font-semibold text-brand-gray-dark cursor-pointer select-none"
          >
            Work from home
          </label>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-xs font-bold text-brand-gray mb-2 uppercase tracking-wider">
            Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full h-10 px-3 border border-brand-gray-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue bg-white cursor-pointer hover:border-brand-gray transition-colors"
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
          <label className="block text-xs font-bold text-brand-gray mb-3 uppercase tracking-wider">
            Minimum Monthly Stipend
          </label>
          <div className="space-y-2.5">
            {STIPEND_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2.5 text-sm text-brand-gray-dark font-medium cursor-pointer select-none">
                <input
                  type="radio"
                  name="min-stipend"
                  checked={minStipend === opt.value}
                  onChange={() => setMinStipend(opt.value)}
                  className="w-4 h-4 text-brand-blue focus:ring-brand-blue border-brand-gray-border cursor-pointer"
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
