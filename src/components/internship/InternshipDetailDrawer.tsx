import { useState, useEffect } from 'react';
import { X, MapPin, Home, Calendar, Banknote, Clock, Bookmark, CheckCircle2, ExternalLink } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import type { Internship } from '@/types/internship';

interface InternshipDetailDrawerProps {
  internship: Internship;
  onClose: () => void;
}

function getInitials(name: string): string {
  if (!name) return 'IS';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
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
    return ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn'];
  }
  if (p.includes('frontend') || p.includes('web dev') || p.includes('react')) {
    return ['HTML', 'CSS', 'JavaScript', 'ReactJS', 'Tailwind CSS', 'TypeScript', 'Git'];
  }
  if (p.includes('mobile') || p.includes('app') || p.includes('ios') || p.includes('android')) {
    return ['React Native', 'Mobile App Development', 'Swift', 'Kotlin', 'REST APIs', 'Git'];
  }
  if (p.includes('marketing') || p.includes('social media')) {
    return ['Social Media Marketing', 'SEO', 'Content Writing', 'Email Marketing', 'Digital Marketing'];
  }
  if (p.includes('backend') || p.includes('node')) {
    return ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'Python', 'REST APIs', 'Git'];
  }
  if (p.includes('product')) {
    return ['Product Management', 'Market Research', 'User Research', 'Wireframing', 'Agile Methodology'];
  }
  if (p.includes('graphic') || p.includes('design')) {
    return ['Adobe Illustrator', 'Adobe Photoshop', 'Graphic Design', 'Creativity', 'Figma'];
  }
  return ['Communication Skills', 'MS-Office', 'Problem Solving', 'Teamwork', 'Research'];
}

export function InternshipDetailDrawer({ internship, onClose }: InternshipDetailDrawerProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const { savedIds, appliedIds, toggleSave, applyToInternship } = useFilterStore();

  const isSaved = savedIds.includes(internship.id);
  const isApplied = appliedIds.includes(internship.id);

  // Esc key closes the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
  const skills = getSkillsForProfile(internship.profile_name, internship.title);

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
      'figma': 'figma.com',
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

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop backdrop-blur-xs */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300"
      />

      {/* Slide-in drawer container */}
      <div className="relative w-full max-w-[460px] h-full bg-white dark:bg-[#1E1E1E] shadow-2xl flex flex-col z-10 transition-transform duration-300 animate-slide-in-right">
        
        {/* Drawer Header Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-28 space-y-6">
          {/* Logo, Title & Company */}
          <div className="flex gap-4 items-start">
            <div className="w-[56px] h-[56px] rounded-xl border border-gray-150 dark:border-zinc-800 bg-[#F2F7FD] dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center p-1 select-none overflow-hidden shadow-xs">
              {logoUrl && !imgFailed ? (
                <img 
                  src={logoUrl} 
                  alt={`${internship.company_name} Logo`}
                  onError={() => setImgFailed(true)}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-brand-blue dark:text-blue-400 font-extrabold text-[15px] tracking-tight">
                  {getInitials(internship.company_name)}
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                {internship.title}
              </h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 font-semibold">
                {internship.company_name}
              </p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="bg-[#F8FAFC] dark:bg-zinc-800/40 border border-gray-150 dark:border-zinc-800 rounded-xl p-4 grid grid-cols-2 gap-y-4 gap-x-5 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                {isWfh ? <Home className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                <span>LOCATION</span>
              </div>
              <div className="text-gray-800 dark:text-white text-[13px] font-semibold">{locationText}</div>
            </div>

            <div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5" />
                <span>STIPEND</span>
              </div>
              <div className="text-gray-800 dark:text-white text-[13px] font-semibold">{internship.stipend?.salary || 'Unpaid'}</div>
            </div>

            <div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>START DATE</span>
              </div>
              <div className="text-gray-800 dark:text-white text-[13px] font-semibold">Starts Immediately</div>
            </div>

            <div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>DURATION</span>
              </div>
              <div className="text-gray-800 dark:text-white text-[13px] font-semibold">{internship.duration}</div>
            </div>
          </div>

          {/* Premium Pill */}
          <div className="flex items-center gap-1.5 bg-[#FFF9E6] dark:bg-amber-950/20 text-[#D97706] dark:text-amber-400 border border-[#FFEBA6] dark:border-amber-900/30 px-2.5 py-0.5 rounded text-[11px] font-bold w-fit select-none">
            <span>⚡ Premium</span>
          </div>

          {/* Date lines */}
          <div className="text-xs font-semibold flex items-center gap-4 select-none pb-4 border-b border-dashed border-gray-150 dark:border-zinc-800">
            <span className="text-[#1B9B5C] bg-[#EAFBF3] dark:bg-emerald-950/20 px-2 py-0.5 rounded">
              Posted: {internship.posted_on || 'Just now'}
            </span>
            <span className="text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded">
              Apply by: {internship.application_deadline}
            </span>
          </div>

          {/* Description section */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider select-none">
              About the internship
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              {snippet} This is a remote or office based internship opportunity offering exposure to industry production pipelines, teamwork, and modern engineering practices. You will collaborate directly with our designers and senior developer leads.
            </p>
          </div>

          {/* Skills Required */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider select-none">
              Skills Required
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span 
                  key={skill} 
                  className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-transparent dark:border-zinc-700/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Perks */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider select-none">
              Perks & Benefits
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Certificate', 'Letter of recommendation', 'Flexible work hours', 'Informal dress code'].map(perk => (
                <span 
                  key={perk} 
                  className="bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 text-[11px] font-semibold px-2 py-0.5 rounded border border-gray-200/50 dark:border-zinc-850"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Action Footer */}
        <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-[#1E1E1E] border-t border-gray-150 dark:border-zinc-800 p-4 flex gap-3 items-center z-10 shadow-lg select-none">
          <button 
            onClick={() => toggleSave(internship.id)}
            className="h-10 px-4 border border-gray-200 dark:border-zinc-750 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#008BD3] text-[#008BD3]' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          {isApplied ? (
            <div className="flex-1 h-10 bg-[#EAFBF3] dark:bg-emerald-950/20 text-[#1B9B5C] border border-[#1B9B5C]/20 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#1B9B5C]" />
              <span>Applied</span>
            </div>
          ) : (
            <button
              onClick={() => applyToInternship(internship.id)}
              className="flex-1 h-10 bg-[#00A5EC] hover:bg-[#008BD3] text-white rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Apply now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
