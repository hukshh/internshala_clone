import { Calendar, Clock, MapPin, Wallet, ArrowUpRight } from 'lucide-react';
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
    <div className="bg-white border border-brand-gray-border rounded-lg p-5 hover:shadow-card-hover transition-all duration-200">
      {/* Premium indicator tag */}
      {internship.is_premium_internship && (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mb-3">
          Premium
        </span>
      )}

      {/* Title & Company Name */}
      <div className="mb-3">
        <h3 className="text-base font-bold text-brand-gray-dark hover:text-brand-blue transition-colors leading-snug">
          {internship.title}
        </h3>
        <p className="text-sm text-brand-gray font-medium mt-0.5">
          {internship.company_name}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-brand-gray-dark mb-4">
        <MapPin className="w-3.5 h-3.5 text-brand-gray flex-shrink-0" />
        <span className="truncate">{locationText}</span>
      </div>

      {/* Grid of key details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 border-t border-b border-brand-gray-light py-3">
        <div>
          <span className="block text-[10px] uppercase font-semibold text-brand-gray mb-0.5 tracking-wider">
            Start Date
          </span>
          <div className="flex items-center gap-1 text-xs text-brand-gray-dark font-medium">
            <Calendar className="w-3.5 h-3.5 text-brand-gray flex-shrink-0" />
            <span>{internship.start_date || 'Immediately'}</span>
          </div>
        </div>

        <div>
          <span className="block text-[10px] uppercase font-semibold text-brand-gray mb-0.5 tracking-wider">
            Duration
          </span>
          <div className="flex items-center gap-1 text-xs text-brand-gray-dark font-medium">
            <Clock className="w-3.5 h-3.5 text-brand-gray flex-shrink-0" />
            <span>{internship.duration}</span>
          </div>
        </div>

        <div>
          <span className="block text-[10px] uppercase font-semibold text-brand-gray mb-0.5 tracking-wider">
            Stipend
          </span>
          <div className="flex items-center gap-1 text-xs text-brand-gray-dark font-semibold">
            <Wallet className="w-3.5 h-3.5 text-brand-gray flex-shrink-0" />
            <span>{internship.stipend?.salary || 'Unpaid'}</span>
          </div>
        </div>

        <div>
          <span className="block text-[10px] uppercase font-semibold text-brand-gray mb-0.5 tracking-wider">
            Apply By
          </span>
          <div className="text-xs text-brand-gray-dark font-medium">
            <span>{internship.application_deadline || 'Soon'}</span>
          </div>
        </div>
      </div>

      {/* Footer of Card: Badges and Action Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Posted On Tag */}
          <Badge variant="neutral" className="text-[10px]">
            {internship.posted_by_label || 'Recently'}
          </Badge>
          
          {/* PPO Tag */}
          {internship.is_ppo && (
            <Badge variant="success" className="text-[10px] font-bold">
              {internship.ppo_label_value || 'PPO'}
            </Badge>
          )}

          {/* Part time */}
          {internship.part_time && (
            <Badge variant="warning" className="text-[10px] font-bold">
              Part-time
            </Badge>
          )}
        </div>

        {/* View Details External Link */}
        <a
          href={`https://internshala.com/internship/detail/${internship.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-xs font-bold text-brand-blue hover:text-brand-blue-hover transition-colors group"
        >
          <span>View details</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
