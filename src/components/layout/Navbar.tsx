import { useState, type ChangeEvent } from 'react';
import { Menu, Search, X, ChevronDown, Send, MessageSquare, Bell } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, onClear, placeholder = 'Search...', className }: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-2.5 w-3.5 h-3.5 text-gray-400/80" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-8 pl-8 pr-7 text-xs bg-white border border-gray-200 rounded placeholder-gray-400/50 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 p-0.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer animate-none"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internshipsOpen, setInternshipsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);

  const { setProfile, setLocation, setWfh } = useFilterStore();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[52px] items-center">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-1 select-none">
              <span className="text-[15px] font-[900] tracking-wider text-[#008BD3] uppercase">INTERNSHALA</span>
              <Send className="w-3.5 h-3.5 text-[#008BD3] -rotate-[15deg] -translate-y-1 fill-[#008BD3]" />
            </a>
            
            <div className="hidden md:flex items-center space-x-6 h-full pt-1 select-none">
              {/* Internships Dropdown Link */}
              <div 
                className="relative h-full flex items-center py-4 cursor-pointer"
                onMouseEnter={() => setInternshipsOpen(true)}
                onMouseLeave={() => setInternshipsOpen(false)}
              >
                <a href="#" className="flex items-center gap-0.5 text-[13px] font-semibold text-gray-600 hover:text-[#008BD3] transition-colors">
                  <span>Internships</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </a>
                {internshipsOpen && (
                  <div className="absolute top-[48px] left-0 bg-white border border-gray-200 rounded-md shadow-lg p-5 flex gap-8 w-[420px] z-50">
                    <div className="flex-1">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">By Profile</h4>
                      <div className="flex flex-col gap-1.5">
                        {[
                          'Frontend Development',
                          'Data Science',
                          'Mobile App Development',
                          'Marketing',
                          'Backend Development',
                          'UI/UX Design',
                          'DevOps'
                        ].map(prof => (
                          <button
                            key={prof}
                            type="button"
                            onClick={() => {
                              setProfile(prof);
                              setInternshipsOpen(false);
                            }}
                            className="text-left text-xs text-gray-600 hover:text-[#008BD3] font-semibold transition-colors cursor-pointer"
                          >
                            {prof}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">By Location</h4>
                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setWfh(true);
                            setLocation('');
                            setInternshipsOpen(false);
                          }}
                          className="text-left text-xs text-gray-600 hover:text-[#008BD3] font-semibold transition-colors cursor-pointer"
                        >
                          Work from Home
                        </button>
                        {['Bangalore', 'Delhi', 'Hyderabad', 'Mumbai', 'Chennai', 'Pune'].map(loc => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              setWfh(false);
                              setLocation(loc);
                              setInternshipsOpen(false);
                            }}
                            className="text-left text-xs text-gray-600 hover:text-[#008BD3] font-semibold transition-colors cursor-pointer"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Courses Dropdown Link */}
              <div 
                className="relative h-full flex items-center py-4 cursor-pointer"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <a href="#" className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-600 hover:text-[#008BD3] transition-colors">
                  <span>Courses</span>
                  <span className="bg-[#FF9800] text-white text-[9px] font-black px-1.5 py-0.2 rounded-xs select-none tracking-wide">OFFER</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </a>
                {coursesOpen && (
                  <div className="absolute top-[48px] left-0 bg-white border border-gray-200 rounded-md shadow-lg p-4 flex flex-col gap-2 w-[220px] z-50">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1 mb-1">Popular Training Courses</h4>
                    {['Web Development', 'Machine Learning', 'Python Programming', 'Digital Marketing', 'Financial Modeling', 'UI/UX Design'].map(course => (
                      <a key={course} href="#" className="text-xs text-gray-600 hover:text-[#008BD3] font-semibold transition-colors py-0.5">
                        {course}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Jobs Dropdown Link */}
              <div 
                className="relative h-full flex items-center py-4 cursor-pointer"
                onMouseEnter={() => setJobsOpen(true)}
                onMouseLeave={() => setJobsOpen(false)}
              >
                <a href="#" className="flex items-center gap-0.5 text-[13px] font-semibold text-gray-600 hover:text-[#008BD3] transition-colors">
                  <span>Jobs</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </a>
                {jobsOpen && (
                  <div className="absolute top-[48px] left-0 bg-white border border-gray-200 rounded-md shadow-lg p-4 flex flex-col gap-2 w-[200px] z-50">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1 mb-1">Jobs by Location</h4>
                    {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata'].map(loc => (
                      <a key={loc} href="#" className="text-xs text-gray-600 hover:text-[#008BD3] font-semibold transition-colors py-0.5">
                        Jobs in {loc}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#" className="text-[13px] font-bold text-[#008BD3] hover:text-[#006CB7] transition-colors">
                IS PRO
              </a>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-5 text-gray-500">
            <button className="hover:text-[#008BD3] transition-colors cursor-pointer p-1">
              <MessageSquare className="w-[18px] h-[18px]" />
            </button>
            <button className="hover:text-[#008BD3] transition-colors cursor-pointer p-1 relative">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF9800] border-2 border-white rounded-full" />
            </button>
            <div className="w-6 h-6 rounded-full bg-brand-blue-light text-[#008BD3] font-bold text-[10px] flex items-center justify-center border border-brand-blue/20 cursor-pointer select-none">
              O
            </div>
          </div>

          {/* Hamburger Menu (mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-gray-dark hover:text-[#008BD3] focus:outline-none cursor-pointer p-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-150 px-4 pt-1.5 pb-3.5 space-y-2.5 shadow-sm transition-all duration-300">
          <div className="py-1">
            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Internships</span>
            <div className="flex flex-wrap gap-1.5 pl-1 pt-0.5">
              {['Frontend Development', 'Data Science', 'Work from Home', 'Bangalore', 'Delhi'].map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (item === 'Work from Home') {
                      setWfh(true);
                      setLocation('');
                    } else if (item === 'Bangalore' || item === 'Delhi') {
                      setWfh(false);
                      setLocation(item);
                    } else {
                      setProfile(item);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gray-100 hover:bg-brand-blue-light hover:text-brand-blue text-[10px] text-gray-600 font-semibold px-2 py-0.5 rounded cursor-pointer transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="py-1 border-t border-gray-100">
            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Courses</span>
            <div className="flex flex-wrap gap-1.5 pl-1 pt-0.5">
              {['Web Development', 'Machine Learning', 'Python'].map(course => (
                <a key={course} href="#" className="bg-gray-100 text-[10px] text-gray-600 font-semibold px-2 py-0.5 rounded">
                  {course}
                </a>
              ))}
            </div>
          </div>

          <div className="py-1 border-t border-gray-100 flex justify-between items-center">
            <a href="#" className="block text-sm font-semibold text-gray-600 hover:text-[#008BD3]">
              Jobs
            </a>
            <a href="#" className="block text-sm font-bold text-[#008BD3]">
              IS PRO
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
