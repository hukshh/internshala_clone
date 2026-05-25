import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Star, ChevronDown, ChevronUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInternships } from '@/hooks/useInternships';
import { useDerivedFilters } from '@/hooks/useDerivedFilters';
import { useFilterStore } from '@/store/filterStore';
import { Layout } from '@/components/layout/Layout';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { InternshipList } from '@/components/internship/InternshipList';
import { InternshipDetailDrawer } from '@/components/internship/InternshipDetailDrawer';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Google Play logo in high-fidelity SVG paths
const GooglePlayLogo = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.5 17C30.2 19.3 29 22.8 29 27.2V484.8C29 489.2 30.2 492.7 32.5 495L38.2 500.7L274 264.9V259.1L38.2 23.3L32.5 17Z" fill="#00C0FF"/>
    <path d="M356 346.9L274 264.9V259.1L356 177.1L356.9 177.6L453.7 232.7C481.3 248.4 481.3 273.6 453.7 289.3L356.9 346.4L356 346.9Z" fill="#FFC107"/>
    <path d="M356.9 177.6L274 259.5L38.2 23.7C46 15.9 59.1 15.4 73.9 23.8L356.9 177.6Z" fill="#FF3B30"/>
    <path d="M356.9 346.4L73.9 508.2C59.1 516.6 46 516.1 38.2 508.3L274 264.5L356.9 346.4Z" fill="#4CAF50"/>
  </svg>
);

// FAQ Item Accordion component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200/80 dark:border-zinc-800/80 py-4 select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left text-gray-700 dark:text-gray-205 hover:text-[#008BD3] dark:hover:text-[#00A5EC] transition-colors cursor-pointer"
      >
        <span className="text-[13px] font-medium leading-relaxed">
          <span className="font-bold text-gray-800 dark:text-white mr-1.5">Q.</span>
          {question}
        </span>
        <span className="text-[#008BD3] dark:text-[#00A5EC] text-lg font-bold ml-4">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium pl-5 animate-slide-right">
          {answer}
        </div>
      )}
    </div>
  );
}

// Collapsible directory links data
const directoryData = {
  profiles: [
    "Computer Science Internship",
    "Marketing Internship",
    "Finance Internship",
    "Graphic Design Internship",
    "Web Development Internship",
    "Business Development Internship",
    "Data Science Internship",
    "Human Resources Internship",
    "Content Writing Internship"
  ],
  locations: [
    "Internship in Bangalore",
    "Internship in Delhi",
    "Internship in Mumbai",
    "Internship in Hyderabad",
    "Internship in Pune",
    "Internship in Chennai",
    "Internship in Kolkata",
    "Internship in Ahmedabad",
    "Internship in Work From Home"
  ],
  jobProfiles: [
    "Software Developer Job",
    "Marketing Manager Job",
    "Business Development Executive Job",
    "Graphic Designer Job",
    "Product Manager Job",
    "Financial Analyst Job",
    "Data Analyst Job",
    "HR Recruiter Job",
    "Content Writer Job"
  ],
  jobLocations: [
    "Jobs in Bangalore",
    "Jobs in Delhi",
    "Jobs in Mumbai",
    "Jobs in Hyderabad",
    "Jobs in Pune",
    "Jobs in Chennai",
    "Jobs in Kolkata",
    "Jobs in Ahmedabad",
    "Jobs in Jaipur"
  ],
  companies: [
    "Google Internships & Jobs",
    "Microsoft Internships & Jobs",
    "Amazon Internships & Jobs",
    "Figma Internships & Jobs",
    "Netflix Internships & Jobs",
    "Canva Internships & Jobs",
    "Meta Internships & Jobs",
    "Apple Internships & Jobs",
    "Adobe Internships & Jobs"
  ]
};

function DirectoryAccordionItem({ title, links }: { title: string; links: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-150 dark:border-zinc-800/80 py-3.5 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left text-gray-700 dark:text-gray-200 hover:text-[#008BD3] dark:hover:text-[#00A5EC] transition-colors cursor-pointer select-none"
      >
        <span className="text-[13.5px] font-semibold">{title}</span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#008BD3] dark:text-[#00A5EC]' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 py-3 text-[11.5px] text-gray-500 dark:text-gray-400 font-semibold select-none animate-slide-right">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href="#" 
              className="hover:text-[#008BD3] dark:hover:text-[#00A5EC] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function DirectoryAccordionsCard() {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200/70 dark:border-zinc-800 rounded-lg p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] select-none">
      <h3 className="text-base sm:text-[17px] font-extrabold text-gray-805 dark:text-white tracking-tight mb-3">
        Apply to 2317 Internships on Internshala.com
      </h3>
      <div className="divide-y divide-gray-150 dark:divide-zinc-800/80">
        <DirectoryAccordionItem title="Internships by Profile" links={directoryData.profiles} />
        <DirectoryAccordionItem title="Internships by Location" links={directoryData.locations} />
        <DirectoryAccordionItem title="Jobs by Profile" links={directoryData.jobProfiles} />
        <DirectoryAccordionItem title="Jobs by Location" links={directoryData.jobLocations} />
        <DirectoryAccordionItem title="Top Companies" links={directoryData.companies} />
      </div>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, 6, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 py-4 select-none">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 text-[13px] font-bold py-1.5 px-3 transition-colors cursor-pointer select-none ${
          currentPage === 1
            ? 'text-gray-300 dark:text-zinc-700 cursor-not-allowed'
            : 'text-[#008BD3] dark:text-[#00A5EC] hover:text-[#006CB7]'
        }`}
      >
        <span className="text-base font-extrabold -translate-y-0.5">&lt;</span> Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-[4px] transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#008BD3] text-white'
                  : 'bg-white dark:bg-zinc-800 text-gray-705 dark:text-gray-300 border border-gray-250 dark:border-zinc-700/60 hover:bg-slate-50 dark:hover:bg-zinc-700'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 text-[13px] font-bold py-1.5 px-3 transition-colors cursor-pointer select-none ${
          currentPage === totalPages
            ? 'text-gray-300 dark:text-zinc-700 cursor-not-allowed'
            : 'text-[#008BD3] dark:text-[#00A5EC] hover:text-[#006CB7]'
        }`}
      >
        Next <span className="text-base font-extrabold -translate-y-0.5">&gt;</span>
      </button>
    </div>
  );
}

function MainSearchPage() {
  const { data: internships, isLoading, isError } = useInternships();
  const { profiles, locations, durations } = useDerivedFilters(internships);
  
  const {
    profile,
    location,
    wfh,
    partTime,
    duration,
    maxDuration,
    minStipend,
    search,
    startDate,
    withJobOffer,
    fastResponse,
    earlyApplicant,
    forWomen,
    // Saved, Drawer states
    showOnlySaved,
    savedIds,
    activeInternshipId,
    setActiveInternshipId,
  } = useFilterStore();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Reset page when filters change (during render to avoid cascading effect warning)
  const [prevFiltersKey, setPrevFiltersKey] = useState('');
  const currentFiltersKey = `${profile}-${location}-${wfh}-${partTime}-${duration}-${maxDuration}-${minStipend}-${search}-${startDate}-${withJobOffer}-${fastResponse}-${earlyApplicant}-${forWomen}-${showOnlySaved}`;

  if (currentFiltersKey !== prevFiltersKey) {
    setPrevFiltersKey(currentFiltersKey);
    setCurrentPage(1);
  }

  // FAQs expansion state
  const [faqsExpanded, setFaqsExpanded] = useState(true);

  // Reviews carousel state
  const reviews = [
    {
      title: "Must-have app for students",
      quote: "I got my first internship from here. Internshala is must for career oriented students. This app has a lot of opportunities for every kind of students.",
      name: "Yogesh Singh",
      avatar: "YS"
    },
    {
      title: "I landed a job at Amazon",
      quote: "I applied to Amazon and got the job! It was my dream. I wanted to get in tech but I was from electrical background. My friend suggested Data Science Placement Guarantee Course. In the course, I learnt SQL, Python, Tableau & worked on a lot of projects which came in handy in my interviews. I was able to explain the concepts and applications well. The placement team helped me with everything.",
      name: "Yaswanth Mandapati",
      avatar: "YM"
    },
    {
      title: "Found my dream frontend role",
      quote: "The interface makes looking for internships incredibly fast. The side-sheet drawer and details saved me from opening dozens of browser tabs. I got a frontend developer internship at Figma and now converted to full-time!",
      name: "Amit Verma",
      avatar: "AV"
    },
    {
      title: "Highly accurate WFH search",
      quote: "The WFH filter is extremely accurate. I easily found a part-time marketing role that fit my schedule. Being able to toggle the dark mode made late night research very pleasant.",
      name: "Priya Patel",
      avatar: "PP"
    }
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');

  const nextReview = () => {
    setSlideDirection('right');
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };
  
  const prevReview = () => {
    setSlideDirection('left');
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const filteredInternships = useMemo(() => {
    if (!internships) return [];

    const filtered = internships.filter((internship) => {
      // 0. Saved Only Filter
      if (showOnlySaved && !savedIds.includes(internship.id)) {
        return false;
      }

      // 1. Text Search (title, company, profile, location)
      if (search) {
        const query = search.toLowerCase().trim();
        if (query) {
          const queryWords = query.split(/\s+/);
          const searchFields = [
            internship.title,
            internship.company_name,
            internship.profile_name,
            ...(internship.location_names || [])
          ].map(f => (f || '').toLowerCase());

          const matchesAllWords = queryWords.every(word =>
            searchFields.some(field => field.includes(word))
          );

          if (!matchesAllWords) {
            return false;
          }
        }
      }

      // 2. Profile Filter (Case-insensitive)
      if (profile && internship.profile_name?.toLowerCase() !== profile.toLowerCase()) {
        return false;
      }

      // 3. WFH Filter
      const isWfhInternship = internship.work_from_home ||
        (internship.location_names && internship.location_names.some((loc) => 
          loc.toLowerCase().includes('home') || loc.toLowerCase().includes('wfh')
        ));

      if (wfh && !isWfhInternship) {
        return false;
      }

      // 4. Location Filter (Case-insensitive)
      if (!wfh && location) {
        const matchLoc = internship.location_names?.some((loc) => 
          loc.toLowerCase() === location.toLowerCase()
        );
        if (!matchLoc) {
          return false;
        }
      }

      // 5. Duration Filter (Case-insensitive)
      if (duration && internship.duration?.toLowerCase() !== duration.toLowerCase()) {
        return false;
      }

      // 5b. Max Duration Filter
      if (maxDuration > 0) {
        const match = internship.duration?.match(/(\d+)\s*month/i);
        const durationVal = match ? parseInt(match[1], 10) : 0;
        if (durationVal > maxDuration || durationVal === 0) {
          return false;
        }
      }

      // 6. Part-time Filter
      if (partTime && !internship.part_time) {
        return false;
      }

      // 7. Stipend Filter
      if (minStipend > 0) {
        const salaryVal = internship.stipend?.salaryValue1 || 0;
        if (salaryVal < minStipend) {
          return false;
        }
      }

      // 8. Start Date Filter (Starting from or after)
      if (startDate) {
        const selectedDate = new Date(startDate);
        if (isNaN(selectedDate.getTime())) {
          return false;
        }
      }

      // 9. Job Offer (PPO) Filter
      if (withJobOffer && !internship.is_ppo) {
        return false;
      }

      // 10. Fast Response Filter
      if (fastResponse) {
        const isFast = ['Google', 'Microsoft', 'Figma', 'Amazon'].includes(internship.company_name);
        if (!isFast) return false;
      }

      // 11. Early Applicant Filter
      if (earlyApplicant) {
        const isEarly = ['Today', 'Yesterday', '1 day ago', '2 days ago'].includes(internship.posted_by_label) || 
          internship.posted_on?.toLowerCase().includes('today') || 
          internship.posted_on?.toLowerCase().includes('yesterday') || 
          internship.posted_on?.toLowerCase().includes('2 days');
        if (!isEarly) return false;
      }

      // 12. Internships for Women Filter
      if (forWomen) {
        const isForWomen = ['Canva', 'Netflix', 'Google', 'Apple', 'Meta'].includes(internship.company_name);
        if (!isForWomen) return false;
      }

      return true;
    });

    // Sort by latest first (descending timestamp order)
    return filtered.sort((a, b) => b.postedOnDateTime - a.postedOnDateTime);
  }, [
    internships,
    profile,
    location,
    wfh,
    partTime,
    duration,
    maxDuration,
    minStipend,
    search,
    startDate,
    withJobOffer,
    fastResponse,
    earlyApplicant,
    forWomen,
    showOnlySaved,
    savedIds
  ]);

  const activeInternship = useMemo(() => {
    if (!activeInternshipId || !internships) return null;
    return internships.find(item => item.id === activeInternshipId) || null;
  }, [activeInternshipId, internships]);

  const totalCount = filteredInternships.length;

  // Paginated subset of internships
  const paginatedInternships = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredInternships.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInternships, currentPage]);

  return (
    <Layout
      header={
        <div className="select-none text-left w-full">
          <div className="text-[11px] font-semibold text-gray-400 mb-2.5 tracking-wide">
            <span className="hover:text-brand-blue cursor-pointer">Home</span>
            <span className="mx-1.5">&gt;</span>
            <span className="text-gray-505">Internships</span>
          </div>
          
          {!isLoading && !isError && (
            <div className="text-center mt-4 mb-3">
              <h1 className="text-xl sm:text-[22px] font-bold text-gray-800 dark:text-white tracking-tight">
                {totalCount} Total Internships
              </h1>
              <p className="text-xs sm:text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1 select-none">
                Latest Summer Internships
              </p>
            </div>
          )}
        </div>
      }
      filterSidebar={
        <FilterSidebar
          profiles={profiles}
          locations={locations}
          durations={durations}
        />
      }
      extraBottomContent={
        <div className="w-full select-none">
          {/* FAQs Section - Un-boxed, directly on the background */}
          <div className="w-full max-w-[800px] mx-auto py-6">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setFaqsExpanded(!faqsExpanded)}
                className="flex items-center gap-2 px-4.5 py-2 border border-[#008BD3] text-[#008BD3] dark:text-[#00A5EC] dark:border-[#00A5EC] font-bold text-xs sm:text-xs rounded bg-white dark:bg-zinc-800 shadow-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors select-none"
              >
                <span>Frequently asked questions</span>
                {faqsExpanded ? <ChevronUp className="w-4 h-4 text-[#008BD3] dark:text-[#00A5EC]" /> : <ChevronDown className="w-4 h-4 text-[#008BD3] dark:text-[#00A5EC]" />}
              </button>
            </div>

            {faqsExpanded && (
              <div className="divide-y divide-gray-150 dark:divide-zinc-805/85 animate-none">
                <FaqItem
                  question="How do I search for internships in my preferred category/profile?"
                  answer="You can enter keywords in the search bar or use the Autocomplete profile filter (e.g. 'Frontend Development') on the left filter panel. This updates the results instantaneously."
                />
                <FaqItem
                  question="How can I apply for an internship on Internshala?"
                  answer="Browse through any listing, click on the opportunity card to open the detail panel, read details and click the 'Apply now' button to complete the application. The button state changes to 'Applied' immediately."
                />
                <FaqItem
                  question="Do I need to pay to apply for an internship on Internshala?"
                  answer="No, applying to internships on Internshala is completely free. We do not charge students for applications or placement processing."
                />
                <FaqItem
                  question="What all internships are available on Internshala?"
                  answer="There are thousands of internships across Technical streams (Web, App, Data Science), Creative streams (Design, UX/UI, Video), and Management streams (Marketing, HR, Finance) available both locally and as WFH."
                />
                <FaqItem
                  question="Are there any courses that offer a placement?"
                  answer="Yes, Internshala offers several Placement Guarantee Courses where you receive rigorous skill trainings and direct job interviews upon completion."
                />
                <FaqItem
                  question="How do I get certified online?"
                  answer="You can check out our Trainings section in the Courses dropdown. These offer government-recognized certifications in multiple tech and business domains."
                />
              </div>
            )}
          </div>
        </div>
      }
      fullWidthBottomContent={
        /* Student Reviews & Testimonials - Full width light blue container */
        <div className="w-full bg-[#F2F8FF] dark:bg-[#151D2A] border-t border-b border-gray-150 dark:border-zinc-800/60 py-12 select-none">
          <div className="max-w-[980px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Stat ratings */}
              <div className="lg:col-span-4 space-y-4 text-center lg:text-left pr-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950/40 text-[#008BD3] flex items-center justify-center mx-auto lg:mx-0 shadow-2xs">
                  <Quote className="w-5 h-5 fill-current stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-[22px] font-black text-gray-850 dark:text-white leading-tight">
                  Join the pool of 21Mn+ students and get started with your career
                </h3>
                <div className="pt-1">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">
                    PLAY STORE RATINGS
                  </span>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5">
                    <span className="text-4xl sm:text-5xl font-black text-gray-800 dark:text-white leading-none">
                      4.4
                    </span>
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-450 dark:text-gray-400 font-semibold mt-0.5">
                        (42K Reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Google Play Button */}
                <div className="flex justify-center lg:justify-start pt-2">
                  <button className="bg-[#222222] hover:bg-black text-white flex items-center gap-2.5 px-4 py-2 rounded-lg transition-colors text-left w-fit shadow-xs select-none border border-zinc-700/30 cursor-pointer">
                    <GooglePlayLogo />
                    <div>
                      <div className="text-[8px] font-semibold text-gray-300 tracking-wider">GET IT ON</div>
                      <div className="text-[12px] font-bold text-white leading-none">Google Play</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Column: Carousel */}
              <div className="lg:col-span-8 relative px-2 sm:px-10">
                {/* Horizontal slide content */}
                <div 
                  key={`${currentReviewIndex}-${slideDirection}`}
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                    slideDirection === 'right' ? 'animate-slide-right' : 'animate-slide-left'
                  }`}
                >
                  {/* Testimonial Card 1 */}
                  <div className="border border-gray-150 dark:border-zinc-800/80 rounded-xl p-5 bg-white dark:bg-[#1E1E1E] flex flex-col justify-between min-h-[190px] shadow-sm">
                    <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic">
                      "{reviews[currentReviewIndex].quote}"
                    </p>
                    <div className="flex items-center gap-3 mt-4 border-t border-gray-100 dark:border-zinc-800/60 pt-3 flex-shrink-0">
                      <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-tr from-[#008BD3] to-[#00A5EC] text-white font-extrabold text-[11px] flex items-center justify-center shadow-2xs flex-shrink-0">
                        {reviews[currentReviewIndex].avatar}
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-gray-805 dark:text-gray-200">
                          {reviews[currentReviewIndex].name}
                        </h4>
                        <div className="flex items-center gap-0.5 mt-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Card 2 (Adjacent) */}
                  <div className="hidden sm:flex border border-gray-150 dark:border-zinc-800/80 rounded-xl p-5 bg-white dark:bg-[#1E1E1E] flex-col justify-between min-h-[190px] shadow-sm">
                    <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium italic">
                      "{reviews[(currentReviewIndex + 1) % reviews.length].quote}"
                    </p>
                    <div className="flex items-center gap-3 mt-4 border-t border-gray-100 dark:border-zinc-800/60 pt-3 flex-shrink-0">
                      <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-tr from-[#008BD3] to-[#00A5EC] text-white font-extrabold text-[11px] flex items-center justify-center shadow-2xs flex-shrink-0">
                        {reviews[(currentReviewIndex + 1) % reviews.length].avatar}
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-gray-805 dark:text-gray-200">
                          {reviews[(currentReviewIndex + 1) % reviews.length].name}
                        </h4>
                        <div className="flex items-center gap-0.5 mt-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Arrow Button */}
                <button
                  onClick={prevReview}
                  className="absolute left-[-15px] sm:left-0 top-[50%] -translate-y-[50%] w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-850 bg-white dark:bg-zinc-800 flex items-center justify-center text-[#008BD3] shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4 text-[#008BD3]" />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={nextReview}
                  className="absolute right-[-15px] sm:right-0 top-[50%] -translate-y-[50%] w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-850 bg-white dark:bg-zinc-800 flex items-center justify-center text-[#008BD3] shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4 text-[#008BD3]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <InternshipList
        filteredInternships={paginatedInternships}
        isLoading={isLoading}
        isError={isError}
      />

      {/* Pagination & Accordion Directory Card rendered inside the children column */}
      {!isLoading && !isError && filteredInternships.length > 0 && (
        <div className="mt-6 space-y-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredInternships.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
          <DirectoryAccordionsCard />
        </div>
      )}

      {/* Side Overlay Drawer for detailed view */}
      {activeInternship && (
        <InternshipDetailDrawer
          internship={activeInternship}
          onClose={() => setActiveInternshipId(null)}
        />
      )}
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainSearchPage />
    </QueryClientProvider>
  );
}

export default App;
