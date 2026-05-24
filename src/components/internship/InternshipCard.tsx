import { MapPin, Home, Calendar, Banknote, Clock, FileText, CheckCircle2 } from 'lucide-react';
import type { Internship } from '@/types/internship';

interface InternshipCardProps {
  internship: Internship;
}

function getCompanyColor(company: string): string {
  const colors: Record<string, string> = {
    'google': '#EA4335',
    'meta': '#0668E1',
    'apple': '#000000',
    'netflix': '#E50914',
    'amazon': '#FF9900',
    'microsoft': '#00A4EF',
    'canva': '#00C4CC',
    'cloudflare': '#F38020',
    'figma': '#F24E1E',
    'redhat': '#EE0000',
  };
  return colors[company.toLowerCase()] || '#008BD3';
}

function getResponsibilitySnippet(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('data science')) {
    return '1. Work on machine learning models, database pipelines, and statistical analysis projects.';
  }
  if (t.includes('frontend') || t.includes('web developer')) {
    return '1. Build and maintain interactive user interfaces using ReactJS, Tailwind CSS, and TypeScript.';
  }
  if (t.includes('mobile') || t.includes('app') || t.includes('ios')) {
    return '1. Develop high-performance mobile features for iOS/Android platforms using React Native / Swift.';
  }
  if (t.includes('marketing')) {
    return '1. Plan, implement, and track growth marketing campaigns across digital and social media channels.';
  }
  if (t.includes('backend')) {
    return '1. Write robust API services, optimize SQL databases, and deploy server infrastructure.';
  }
  if (t.includes('product')) {
    return '1. Conduct user research, define product requirements, and collaborate with engineering teams.';
  }
  if (t.includes('graphic') || t.includes('design')) {
    return '1. Create custom visual designs, illustrations, and marketing assets for visual channels.';
  }
  if (t.includes('cyber')) {
    return '1. Conduct vulnerability scans, security audits, and monitor cloud server traffic logs.';
  }
  if (t.includes('ui/ux') || t.includes('figma')) {
    return '1. Research user flows, create high-fidelity wireframes, and design prototypes in Figma.';
  }
  if (t.includes('devops')) {
    return '1. Configure CI/CD build scripts, manage Docker containers, and monitor server scaling.';
  }
  return '1. Assist the development and operational teams in daily delivery tasks and project goals.';
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const isWfh = internship.work_from_home || 
    (internship.location_names && internship.location_names.some(l => 
      l.toLowerCase().includes('home') || l.toLowerCase().includes('wfh')
    ));
  
  const locationText = isWfh 
    ? 'Work from home' 
    : internship.location_names && internship.location_names.length > 0 
      ? internship.location_names[0]
      : 'Work from home';

  const snippet = getResponsibilitySnippet(internship.title);
  const companyColor = getCompanyColor(internship.company_name);

  return (
    <a
      href={`https://internshala.com/internship/detail/${internship.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white border border-gray-200/70 rounded-lg p-4 hover:shadow-[0_2px_12px_rgba(0,0,0,0.035)] transition-all duration-300 hover:border-gray-300 relative">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Title & Company Name */}
            <div>
              <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-800 group-hover:text-brand-blue transition-colors leading-snug truncate">
                {internship.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-xs sm:text-[13px] text-gray-500 font-semibold truncate">
                  {internship.company_name}
                </span>
                
                {/* Actively Hiring Badge */}
                <span className="inline-flex items-center gap-0.5 bg-blue-50/50 text-[#008BD3] border border-blue-100/50 px-1.5 py-0.5 rounded text-[10px] font-bold">
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#008BD3]" />
                  <span>Actively hiring</span>
                </span>
              </div>
            </div>

            {/* Core Details (Location, Stipend, Duration) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 pt-1 leading-none select-none font-medium">
              <span className="flex items-center gap-1">
                {isWfh ? <Home className="w-3.5 h-3.5 text-gray-400" /> : <MapPin className="w-3.5 h-3.5 text-gray-400" />}
                <span>{locationText}</span>
              </span>
              <span className="flex items-center gap-1">
                <Banknote className="w-3.5 h-3.5 text-gray-400" />
                <span>{internship.stipend?.salary || 'Unpaid'}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{internship.duration}</span>
              </span>
            </div>
          </div>

          {/* Company Brand Initial Logo */}
          <div 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-md flex-shrink-0 flex items-center justify-center font-black text-xs sm:text-sm text-white select-none shadow-sm"
            style={{ backgroundColor: companyColor }}
          >
            {internship.company_name.substring(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Bullet description snippet */}
        <div className="border-t border-slate-100/60 mt-3 pt-3">
          <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed flex items-start gap-1.5 font-medium">
            <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{snippet}</span>
          </p>
        </div>

        {/* Footer block: tags & time label */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-1 border-t border-slate-100/50">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded select-none">
              {internship.profile_name}
            </span>
            {internship.part_time && (
              <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded select-none">
                Part-time
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1 bg-blue-50/50 text-[#008BD3] px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold select-none">
            <Clock className="w-3 h-3 text-[#008BD3]" />
            <span>{internship.posted_by_label || 'Recently'}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
