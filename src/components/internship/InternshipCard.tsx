import { MapPin, ArrowUpRight } from 'lucide-react';
import type { Internship } from '@/types/internship';
import { Badge } from '../ui/Badge';

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  // Format location string: fallback to WFH if list is empty or explicitly says WFH
  const isWfh = internship.work_from_home || 
    (internship.location_names && internship.location_names.some(l => l.toLowerCase().includes('home') || l.toLowerCase().includes('wfh')));
  
  const locationText = isWfh 
    ? 'Work From Home' 
    : internship.location_names && internship.location_names.length > 0 
      ? internship.location_names.join(', ')
      : 'Work From Home';

  return (
    <div className="bg-white border border-gray-200/75 rounded-lg p-4 sm:p-5 hover:shadow-md transition-all duration-300 hover:border-brand-blue/35">
      {/* Title & Company Name */}
      <div className="mb-2">
        <h3 className="text-sm sm:text-[15px] font-bold text-brand-gray-dark hover:text-brand-blue transition-colors leading-tight">
          {internship.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-brand-gray font-medium mt-1">
          {internship.company_name}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-[11px] sm:text-xs text-brand-gray-dark mb-3.5">
        <MapPin className="w-3 h-3 text-brand-gray flex-shrink-0" />
        <span className="truncate">{locationText}</span>
      </div>

      {/* Row details (Start Date, Duration, Stipend, Apply By) */}
      <div className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-3.5 mb-4 border-t border-slate-100 pt-3.5 pb-1">
        <div>
          <span className="block text-[10px] uppercase font-medium text-gray-400 tracking-wider mb-0.5">
            Start Date
          </span>
          <span className="text-xs sm:text-[13px] text-[#333333] font-medium">
            {internship.start_date || 'Immediately'}
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase font-medium text-gray-400 tracking-wider mb-0.5">
            Duration
          </span>
          <span className="text-xs sm:text-[13px] text-[#333333] font-medium">
            {internship.duration}
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase font-medium text-gray-400 tracking-wider mb-0.5">
            Stipend
          </span>
          <span className="text-xs sm:text-[13px] text-[#333333] font-semibold">
            {internship.stipend?.salary || 'Unpaid'}
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase font-medium text-gray-400 tracking-wider mb-0.5">
            Apply By
          </span>
          <span className="text-xs sm:text-[13px] text-[#333333] font-medium">
            {internship.application_deadline || 'Soon'}
          </span>
        </div>
      </div>

      {/* Footer of Card: Badges and Action Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-50">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Posted On Tag */}
          <Badge variant="neutral" className="text-[10px] px-2 py-0.5">
            {internship.posted_by_label || 'Recently'}
          </Badge>
          
          {/* PPO Tag */}
          {internship.is_ppo && (
            <Badge variant="success" className="text-[10px] font-semibold px-2 py-0.5">
              {internship.ppo_label_value || 'PPO'}
            </Badge>
          )}

          {/* Part time */}
          {internship.part_time && (
            <Badge variant="warning" className="text-[10px] font-semibold px-2 py-0.5">
              Part-time
            </Badge>
          )}
        </div>

        {/* View Details External Link */}
        <a
          href={`https://internshala.com/internship/detail/${internship.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-blue-hover transition-colors group"
        >
          <span>View details</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
