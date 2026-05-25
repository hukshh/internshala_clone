import { useState } from 'react';
import { MapPin, Home, Calendar, Banknote, Clock, FileText, Zap, Bookmark, Check } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import type { Internship } from '@/types/internship';

interface InternshipCardProps {
  internship: Internship;
}

function getResponsibilitySnippet(title: string, company: string): string {
  const t = title.toLowerCase();
  const c = company;
  if (t.includes('data science')) {
    return `As a Data Science intern at ${c}, you will have the opportunity to work on machine learning models, database pipelines, and statistical analysis projects.`;
  }
  if (t.includes('frontend') || t.includes('web developer')) {
    return `As a Frontend Web Developer intern at ${c}, you will build and maintain interactive user interfaces using ReactJS, Tailwind CSS, and TypeScript.`;
  }
  if (t.includes('mobile') || t.includes('app') || t.includes('ios') || t.includes('android')) {
    return `As a Mobile App Developer intern at ${c}, you will develop high-performance mobile features for iOS/Android platforms using React Native / Swift.`;
  }
  if (t.includes('marketing')) {
    return `As a Marketing Associate intern at ${c}, you will plan, implement, and track growth marketing campaigns across digital and social media channels.`;
  }
  if (t.includes('backend')) {
    return `As a Backend Development intern at ${c}, you will write robust API services, optimize SQL databases, and deploy server infrastructure.`;
  }
  if (t.includes('product')) {
    return `As a Product Management intern at ${c}, you will conduct user research, define product requirements, and collaborate with engineering teams.`;
  }
  if (t.includes('graphic') || t.includes('design')) {
    return `As a Graphic Design intern at ${c}, you will create custom visual designs, illustrations, and marketing assets for visual channels.`;
  }
  if (t.includes('cyber')) {
    return `As a Cybersecurity Analyst intern at ${c}, you will conduct vulnerability scans, security audits, and monitor cloud server traffic logs.`;
  }
  if (t.includes('ui/ux') || t.includes('figma')) {
    return `As a UI/UX Designer intern at ${c}, you will research user flows, create high-fidelity wireframes, and design prototypes in Figma.`;
  }
  if (t.includes('devops')) {
    return `As a DevOps Engineer intern at ${c}, you will configure CI/CD build scripts, manage Docker containers, and monitor server scaling.`;
  }
  if (t.includes('business consultant') || t.includes('consultant')) {
    return `As a Business Consultant intern at ${c}, you will have the opportunity to work on live consulting projects, market research, and client deliverables.`;
  }
  if (t.includes('fundraising')) {
    return `As a fundraising intern at ${c}, you will play a crucial role in supporting our mission, securing donations, and coordinating campaigns.`;
  }
  return `As an intern at ${c}, you will assist the development and operational teams in daily delivery tasks, research, and project goals.`;
}

function getSkillsForProfile(profile: string, title: string): string[] {
  const p = (profile || title).toLowerCase();
  if (p.includes('data science') || p.includes('machine learning')) {
    return ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'Deep Learning'];
  }
  if (p.includes('frontend') || p.includes('web dev') || p.includes('react')) {
    return ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'Tailwind CSS', 'TypeScript', 'Redux', 'Git', 'Webpack'];
  }
  if (p.includes('mobile') || p.includes('app') || p.includes('ios') || p.includes('android')) {
    return ['React Native', 'Mobile App Development', 'Swift', 'Kotlin', 'REST APIs', 'Git', 'iOS Development'];
  }
  if (p.includes('marketing') || p.includes('social media')) {
    return ['Social Media Marketing', 'SEO', 'Content Writing', 'Email Marketing', 'Google Analytics', 'Digital Marketing'];
  }
  if (p.includes('backend') || p.includes('node')) {
    return ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'Python', 'REST APIs', 'Git', 'Docker', 'AWS'];
  }
  if (p.includes('product')) {
    return ['Product Management', 'Market Research', 'User Research', 'Wireframing', 'Agile Methodology', 'Product Strategy'];
  }
  if (p.includes('graphic') || p.includes('design')) {
    return ['Adobe Illustrator', 'Adobe Photoshop', 'Graphic Design', 'Creativity', 'Figma', 'UI Design', 'Typography'];
  }
  if (p.includes('cyber') || p.includes('security')) {
    return ['Network Security', 'Vulnerability Assessment', 'Linux', 'Cybersecurity', 'Ethical Hacking', 'Penetration Testing'];
  }
  if (p.includes('ui/ux') || p.includes('figma')) {
    return ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'UI/UX Design', 'User Flows', 'Interaction Design'];
  }
  if (p.includes('devops') || p.includes('cloud')) {
    return ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux', 'DevOps', 'GitHub Actions', 'Terraform'];
  }
  if (p.includes('business consultant') || p.includes('business development') || p.includes('fundraising') || p.includes('consultant')) {
    return ['Social Media Marketing', 'MS-Office', 'Market Analysis', 'MS-Excel', 'Social Work', 'Report Writing', 'Business Analysis', 'Communication', 'Fundraising', 'Relationship Building'];
  }
  return ['Communication Skills', 'MS-Office', 'Problem Solving', 'Teamwork', 'MS-Excel', 'Time Management', 'Research'];
}

function getClockPillStyles(label: string): { bg: string; text: string; iconColor: string } {
  const text = (label || 'Just now').toLowerCase();
  
  const isGreen = text.includes('today') || 
                  text.includes('now') || 
                  text.includes('hour') || 
                  text.includes('recently') || 
                  text.includes('yesterday') ||
                  text.includes('1 day') || 
                  text.includes('2 day') || 
                  text.includes('1d') || 
                  text.includes('2d');
                  
  if (isGreen) {
    return {
      bg: 'bg-[#EAFBF3] dark:bg-emerald-950/20',
      text: 'text-[#1B9B5C] dark:text-emerald-450',
      iconColor: '#1B9B5C'
    };
  }
  
  const isBlue = text.includes('3 day') || 
                 text.includes('4 day') || 
                 text.includes('5 day') || 
                 text.includes('6 day') || 
                 text.includes('3d') || 
                 text.includes('4d') || 
                 text.includes('5d') || 
                 text.includes('6d');
                 
  if (isBlue) {
    return {
      bg: 'bg-[#F2F8FF] dark:bg-blue-950/20',
      text: 'text-[#008BD3] dark:text-blue-450',
      iconColor: '#008BD3'
    };
  }
  
  return {
    bg: 'bg-[#F5F5F5] dark:bg-zinc-800/60',
    text: 'text-gray-500 dark:text-gray-400',
    iconColor: '#8A8A8A'
  };
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const { savedIds, appliedIds, setActiveInternshipId } = useFilterStore();

  const isSaved = savedIds.includes(internship.id);
  const isApplied = appliedIds.includes(internship.id);

  const isWfh = internship.work_from_home || 
    (internship.location_names && internship.location_names.some(l => 
      l.toLowerCase().includes('home') || l.toLowerCase().includes('wfh')
    ));
  
  const locationText = isWfh 
    ? 'Work from home' 
    : internship.location_names && internship.location_names.length > 0 
      ? internship.location_names[0]
      : 'Work from home';

  const snippet = getResponsibilitySnippet(internship.title, internship.company_name);
  
  const getClearbitLogoUrl = (logoName: string): string => {
    const clean = logoName.toLowerCase().replace('.png', '').trim();
    const domains: Record<string, string> = {
      'google': 'google.com',
      'meta': 'meta.com',
      'apple': 'apple.com',
      'netflix': 'netflix.com',
      'amazon': 'amazon.com',
      'microsoft': 'microsoft.com',
      'canva': 'canva.com',
      'cloudflare': 'cloudflare.com',
      'figma': 'figma.com',
      'redhat': 'redhat.com',
    };
    return domains[clean] ? `https://logo.clearbit.com/${domains[clean]}` : '';
  };

  let logoUrl = '';
  if (internship.company_logo) {
    if (internship.company_logo.startsWith('http')) {
      logoUrl = internship.company_logo;
    } else {
      const clearbit = getClearbitLogoUrl(internship.company_logo);
      if (clearbit) {
        logoUrl = clearbit;
      } else {
        logoUrl = `https://internshala-uploads.internshala.com/logo-images/${internship.company_logo}`;
      }
    }
  }

  const allSkills = getSkillsForProfile(internship.profile_name, internship.title);
  const skillsToShow = allSkills.slice(0, 7);
  const extraSkillsCount = allSkills.length > 7 ? allSkills.length - 7 + 10 : 0;

  // Show "Be an early applicant" on a clean heuristic
  const isRecent = ['today', 'just now', 'yesterday', '1 day ago', '2 days ago', 'recently'].includes((internship.posted_by_label || '').toLowerCase());
  const showEarlyApplicant = isRecent && (internship.id % 2 === 1 || internship.posted_by_label === 'Just now');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveInternshipId(internship.id);
  };

  return (
    <a
      href={`https://internshala.com/internship/detail/${internship.url}`}
      onClick={handleClick}
      className="block group mb-4"
    >
      <div className="bg-white dark:bg-[#252528] border border-[#E0E0E0]/60 dark:border-zinc-800 rounded-xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.065)] hover:border-[#CCCCCC] dark:hover:border-zinc-700 transition-all duration-300 ease-out transform hover:-translate-y-[2.5px] relative">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            {/* Title & Company Name */}
            <div>
              <h3 className="text-[15px] sm:text-[16px] font-bold text-[#333333] dark:text-white group-hover:text-[#008BD3] dark:group-hover:text-[#00A5EC] transition-colors leading-snug truncate">
                {internship.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2.5 mt-1">
                <span className="text-[13px] text-gray-500 dark:text-gray-400 font-semibold truncate">
                  {internship.company_name}
                </span>
                
                {/* Actively Hiring Badge */}
                <span className="inline-flex items-center bg-[#F2F8FF] dark:bg-blue-950/20 text-[#008BD3] dark:text-blue-400 border border-[#E2F0FF] dark:border-blue-900/30 px-2 py-0.5 rounded-[4px] text-[10.5px] font-bold">
                  Actively hiring
                </span>
              </div>
            </div>

            {/* Core Details (Location, Stipend, Duration) */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-gray-600 dark:text-gray-300 pt-2 select-none font-medium">
              <span className="flex items-center gap-1.5">
                {isWfh ? <Home className="w-[15px] h-[15px] text-gray-400 dark:text-gray-500" /> : <MapPin className="w-[15px] h-[15px] text-gray-400 dark:text-gray-500" />}
                <span>{locationText}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Banknote className="w-[15px] h-[15px] text-gray-400 dark:text-gray-500" />
                <span>{internship.stipend?.salary || 'Unpaid'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-[15px] h-[15px] text-gray-400 dark:text-gray-500" />
                <span>{internship.duration}</span>
              </span>
            </div>
          </div>

          {/* Company Brand Logo / Placeholder */}
          <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-lg border border-gray-150 dark:border-zinc-800 flex-shrink-0 flex items-center justify-center select-none bg-white dark:bg-zinc-800 p-1 overflow-hidden shadow-xs">
            {logoUrl && !imgFailed ? (
              <img 
                src={logoUrl} 
                alt={`${internship.company_name} Logo`}
                onError={() => setImgFailed(true)}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="w-full h-full rounded bg-[#F2F7FD] dark:bg-zinc-900 border border-[#D0E2F5] dark:border-zinc-800 flex items-center justify-center select-none p-1 shadow-xs">
                <svg className="w-[20px] h-[20px] text-[#A6C4E4]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 2H9c-1.1 0-2 .9-2 2v3H3c-1.1 0-2 .9-2 2v11c0 1.1 0 2 .9 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 19H3v-2h2v2zm0-4H3v-2h2v2zm0-4H3V9h2v2zm4 8H7V4h2v15zm10 0h-8V9h2v2h2V9h2v2h2v8zm-2-6h-2v2h2v-2zm0-4h-2v2h2V9z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Bullet description snippet */}
        <div className="mt-3.5 flex items-start gap-2 text-[12.5px] text-gray-600 dark:text-gray-300 font-medium">
          <FileText className="w-[15px] h-[15px] text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="line-clamp-1 flex-1 leading-relaxed">
            {snippet}
          </p>
        </div>

        {/* Skills required list (replicated to match Screenshot 1) */}
        <div className="mt-3 flex flex-wrap gap-1.5 pl-6.5 select-none">
          {skillsToShow.map(skill => (
            <span key={skill} className="bg-[#F8F9FA] dark:bg-zinc-800/80 text-gray-500 dark:text-gray-400 text-[11px] px-2 py-0.5 rounded-sm font-medium border border-gray-150/40 dark:border-transparent">
              {skill}
            </span>
          ))}
          {extraSkillsCount > 0 && (
            <span className="bg-[#FAFBFD] dark:bg-zinc-900/60 text-gray-400 dark:text-gray-500 text-[11px] px-2 py-0.5 rounded-sm font-semibold border border-dashed border-gray-150 dark:border-transparent">
              +{extraSkillsCount} more
            </span>
          )}
        </div>

        {/* Footer block: tags & time label */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-3 border-t border-slate-100/60 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 select-none">
            {/* Dynamic Clock Pill */}
            {(() => {
              const labelStyles = getClockPillStyles(internship.posted_by_label);
              return (
                <div className={`inline-flex items-center gap-1 ${labelStyles.bg} ${labelStyles.text} px-2.5 py-0.5 rounded text-[11px] font-bold`}>
                  <Clock className="w-3.5 h-3.5" style={{ color: labelStyles.iconColor }} />
                  <span>{internship.posted_by_label || 'Just now'}</span>
                </div>
              );
            })()}

            {/* Early Applicant Pill (Yellow) */}
            {showEarlyApplicant && (
              <div className="inline-flex items-center gap-1 bg-[#FFF5E5] dark:bg-amber-950/20 text-[#D97706] dark:text-amber-450 px-2.5 py-0.5 rounded text-[11px] font-bold">
                <Zap className="w-3 h-3 fill-current text-[#D97706] dark:text-amber-450" />
                <span>Be an early applicant</span>
              </div>
            )}

            {/* Part-time text */}
            {internship.part_time && (
              <span className="text-[12px] text-gray-500 dark:text-gray-400 font-medium ml-1 flex items-center gap-1">
                <span className="text-gray-300 dark:text-gray-600 text-[10px]">•</span> Part time
              </span>
            )}
          </div>

          {/* Applied & Saved Quick indicators */}
          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="inline-flex items-center justify-center p-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-[#008BD3] dark:text-blue-400" title="Saved">
                <Bookmark className="w-3.5 h-3.5 fill-current" />
              </span>
            )}
            {isApplied && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-bold" title="Applied">
                <Check className="w-3 h-3" />
                <span>Applied</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

