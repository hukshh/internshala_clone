import { MapPin, ArrowUpRight } from 'lucide-react';
import type { Internship } from '@/types/internship';
import { Badge } from '../ui/Badge';

interface InternshipMetaItemProps {
  label: string;
  value: string;
}

export function InternshipMetaItem({ label, value }: InternshipMetaItemProps) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
        {label}
      </span>
      <span className="text-xs sm:text-[13px] text-gray-700 font-medium break-words">
        {value}
      </span>
    </div>
  );
}

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const isWfh = internship.work_from_home || 
    (internship.location_names && internship.location_names.some(l => 
      l.toLowerCase().includes('home') || l.toLowerCase().includes('wfh')
    ));
  
  const locationText = isWfh 
    ? 'Work From Home' 
    : internship.location_names && internship.location_names.length > 0 
      ? internship.location_names.join(', ')
      : 'Work From Home';

  return (
    <div className="bg-white border border-gray-200/60 rounded-lg p-4 sm:p-5 hover:shadow-md transition-all duration-300 hover:border-gray-300">
      {/* Title & Company Name */}
      <div className="mb-2">
        <h3 className="text-sm sm:text-[15px] font-semibold text-gray-800 hover:text-brand-blue transition-colors leading-snug">
          {internship.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-gray-400 font-medium mt-0.5">
          {internship.company_name}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-start gap-1 text-[11px] sm:text-xs text-gray-500 mb-3.5 leading-relaxed">
        <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <span className="break-words">{locationText}</span>
      </div>

      {/* Grid details (Start Date, Duration, Stipend, Apply By) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-4 border-t border-slate-100/70 pt-3 pb-1">
        <InternshipMetaItem 
          label="Start Date" 
          value={internship.start_date || 'Immediately'} 
        />
        <InternshipMetaItem 
          label="Duration" 
          value={internship.duration} 
        />
        <InternshipMetaItem 
          label="Stipend" 
          value={internship.stipend?.salary || 'Unpaid'} 
        />
        <InternshipMetaItem 
          label="Apply By" 
          value={internship.application_deadline || 'Soon'} 
        />
      </div>

      {/* Footer of Card: Badges and Action Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Posted On Tag */}
          <Badge variant="neutral" className="text-[10px] bg-gray-100/60 text-gray-500 border-none font-medium px-2 py-0.5 rounded">
            {internship.posted_by_label || 'Recently'}
          </Badge>
          
          {/* PPO Tag */}
          {internship.is_ppo && (
            <Badge variant="success" className="text-[10px] bg-emerald-50/70 text-emerald-600 border-none font-semibold px-2 py-0.5 rounded">
              {internship.ppo_label_value || 'PPO'}
            </Badge>
          )}

          {/* Part time */}
          {internship.part_time && (
            <Badge variant="warning" className="text-[10px] bg-amber-50/70 text-amber-700 border-none font-semibold px-2 py-0.5 rounded">
              Part-time
            </Badge>
          )}
        </div>

        {/* View Details External Link */}
        <a
          href={`https://internshala.com/internship/detail/${internship.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-xs sm:text-[13px] font-bold text-brand-blue hover:text-brand-blue-hover transition-colors group animate-none"
        >
          <span>View details</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
