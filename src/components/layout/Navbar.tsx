import { useState, type ChangeEvent } from 'react';
import { Menu, Search, X, MessageSquare, Sun, Moon } from 'lucide-react';
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
        className="w-full h-8 pl-8 pr-7 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded placeholder-gray-400/50 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 dark:text-white transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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

  const { setProfile, setLocation, setWfh, isDarkMode, toggleTheme } = useFilterStore();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#1E1E1E] border-b border-gray-150 dark:border-zinc-800/80 h-[52px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center select-none py-1">
              <svg width="118" height="32" viewBox="0 0 118 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[26px] w-auto">
                <path d="M91.1885 5.48222L96.1378 9.29731L96.1213 14.5188L100.143 11.873L104.007 14.6013L112.686 1L91.1885 5.48222ZM98.4609 10.5594L97.0513 12.9309L97.0575 8.93951L109.964 2.72504L98.4609 10.5594Z" fill="#00A5EC"/>
                <path d="M1 19.8433H3.21997V30.9957H1V19.8433Z" fill="#00A5EC"/>
                <path d="M5.45605 30.9962V19.853H6.20154L13.1832 26.8326V19.853H15.4103V30.9962H14.5947L7.68634 24.0878V30.9962H5.45605Z" fill="#00A5EC"/>
                <path d="M26.8154 19.853V21.9328H23.1034V30.9952H20.8721V21.9328H17.1602V19.853H26.8154Z" fill="#00A5EC"/>
                <path d="M28.4414 30.9958V19.8599H36.6315V21.9396H30.6717V24.3111H35.1395V26.3847H30.6717V28.9171H36.615V30.9989L28.4414 30.9958Z" fill="#00A5EC"/>
                <path d="M45.5825 26.1345L48.3582 30.9952H45.8052L43.1346 26.3882H41.1002V30.9952H38.873V19.853H43.7306C46.331 19.853 47.6309 20.9219 47.6302 23.0598C47.7033 23.731 47.5383 24.4066 47.1641 24.9686C46.7898 25.5306 46.23 25.9432 45.5825 26.1345ZM41.1002 24.3084H44.2235C45.1185 24.2919 45.5814 23.8847 45.6031 23.0835C45.5825 22.3493 45.1267 21.9699 44.2441 21.9379H41.1002V24.3095V24.3084Z" fill="#00A5EC"/>
                <path d="M49.5205 30.9962V19.853H50.2598L57.2466 26.8326V19.853H59.4738V30.9962H58.6551L51.7467 24.0878V30.9962H49.5205Z" fill="#00A5EC"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M79.2275 18.5012C84.5615 17.7279 89.5933 15.8832 94.788 14.1582C93.1795 15.4491 81.1671 18.8219 79.2275 18.5012Z" fill="#666666" className="dark:fill-gray-400"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M100.139 11.873L96.1172 14.5189L98.4599 10.5625L100.139 11.873Z" fill="#666666" className="dark:fill-gray-400"/>
                <path d="M67.8185 20.2238C68.4154 20.4912 68.9566 20.8686 69.4137 21.3364L67.9309 22.8243C67.6755 22.5256 67.3545 22.2898 66.9931 22.1353C66.6317 21.9808 66.2395 21.9117 65.8471 21.9334C64.9572 21.9334 64.387 22.1396 64.1406 22.5634C64.0192 22.7168 63.9532 22.9066 63.9532 23.1022C63.9532 23.2977 64.0192 23.4876 64.1406 23.6409C64.6223 24.0423 65.2209 24.2771 65.8471 24.3101C66.7657 24.3999 67.6472 24.719 68.4104 25.2381C68.8006 25.5181 69.1117 25.8943 69.3135 26.3301C69.5153 26.7659 69.601 27.2465 69.5621 27.7251C69.5549 28.1787 69.4398 28.6241 69.2264 29.0244C69.0131 29.4248 68.7076 29.7686 68.3351 30.0276C67.5192 30.6691 66.5074 31.0103 65.4697 30.9938C64.5847 31.0207 63.7034 30.8688 62.8785 30.5473C62.2129 30.2702 61.6074 29.8664 61.0957 29.3584L62.5754 27.8767C62.9056 28.2098 63.2991 28.4736 63.7328 28.6524C64.1664 28.8313 64.6315 28.9216 65.1005 28.9181C66.0925 28.9181 66.708 28.7119 66.9565 28.2881C67.0768 28.0993 67.1407 27.88 67.1407 27.6561C67.1407 27.4321 67.0768 27.2129 66.9565 27.024C66.7091 26.6043 66.0956 26.3424 65.1005 26.2434C64.2342 26.1527 63.3981 25.874 62.6506 25.4268C62.2719 25.1818 61.9678 24.8375 61.7714 24.4315C61.575 24.0255 61.494 23.5733 61.537 23.1243C61.5295 22.6542 61.6417 22.1899 61.863 21.775C62.0843 21.3602 62.4075 21.0084 62.8022 20.7528C63.5551 20.1883 64.4669 19.8758 65.4078 19.8599C66.2275 19.8215 67.0467 19.9451 67.8185 20.2238Z" fill="#666666" className="dark:fill-gray-400"/>
                <path d="M71.5537 30.9972V19.854H73.784V24.3094H78.9766V19.8447H81.21V30.9869L78.9766 30.9972V26.3902H73.784V30.9972H71.5537Z" fill="#666666" className="dark:fill-gray-400"/>
                <path d="M83.0215 30.9972L87.4759 19.854H89.7061L94.1564 30.9899L91.7848 31.0003L91.1157 29.2927H86.0632L85.3941 31.0003L83.0215 30.9972ZM88.6513 22.8246L86.9562 27.0604H90.299L88.6513 22.8246Z" fill="#666666" className="dark:fill-gray-400"/>
                <path d="M98.0769 19.854V28.9154H104.02V30.9972H95.8477V19.854H98.0769Z" fill="#666666" className="dark:fill-gray-400"/>
                <path d="M105.268 30.9972L109.728 19.854H111.955L116.405 30.9899L114.033 31.0003L113.372 29.2896H108.32L107.652 30.9972H105.268ZM110.897 22.8246L109.203 27.0604H112.547L110.897 22.8246Z" fill="#666666" className="dark:fill-gray-400"/>
              </svg>
            </a>
          </div>

          {/* Desktop Navigation Links & User Items (Aligned Right) */}
          <div className="hidden md:flex items-center space-x-1 h-full pt-1 select-none">
            {/* Internships Dropdown Link (with active bottom border) */}
            <div 
              className={`relative h-full flex items-center px-4 border-b-[3px] border-[#00A5EC] cursor-pointer transition-colors duration-150 ${internshipsOpen ? 'bg-[#F2F8FF] dark:bg-zinc-800/60' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/30'}`}
              onMouseEnter={() => setInternshipsOpen(true)}
              onMouseLeave={() => setInternshipsOpen(false)}
            >
              <a href="#" className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors h-full ${internshipsOpen ? 'text-[#008BD3] dark:text-[#00A5EC]' : 'text-gray-805 dark:text-gray-200'}`}>
                <span>Internships</span>
                <span className={`text-[7px] transition-transform duration-200 inline-block ${internshipsOpen ? 'rotate-180 text-[#008BD3] dark:text-[#00A5EC]' : 'text-gray-500 dark:text-gray-400'}`}>▼</span>
              </a>
              {internshipsOpen && (
                <div className="absolute top-[49px] right-0 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-zinc-800 rounded-md shadow-lg p-5 flex gap-8 w-[420px] z-50">
                  <div className="flex-1">
                    <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-100 dark:border-zinc-800 pb-1">By Profile</h4>
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
                          className="text-left text-xs text-gray-600 dark:text-gray-300 hover:text-[#008BD3] dark:hover:text-[#00A5EC] font-semibold transition-colors cursor-pointer"
                        >
                          {prof}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-100 dark:border-zinc-800 pb-1">By Location</h4>
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setWfh(true);
                          setLocation('');
                          setInternshipsOpen(false);
                        }}
                        className="text-left text-xs text-gray-600 dark:text-gray-300 hover:text-[#008BD3] dark:hover:text-[#00A5EC] font-semibold transition-colors cursor-pointer"
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
                          className="text-left text-xs text-gray-600 dark:text-gray-300 hover:text-[#008BD3] dark:hover:text-[#00A5EC] font-semibold transition-colors cursor-pointer"
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
              className={`relative h-full flex items-center px-4 cursor-pointer transition-colors duration-150 ${coursesOpen ? 'bg-[#F2F8FF] dark:bg-zinc-800/60' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/30'}`}
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <a href="#" className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors h-full ${coursesOpen ? 'text-[#008BD3] dark:text-[#00A5EC]' : 'text-gray-600 dark:text-gray-355 hover:text-gray-900 dark:hover:text-white'}`}>
                <span>Courses</span>
                <span className="bg-[#FF9800] text-white text-[9px] font-black px-1.5 py-0.2 rounded-xs select-none tracking-wide">OFFER</span>
                <span className={`text-[7px] transition-transform duration-200 inline-block ${coursesOpen ? 'rotate-180 text-[#008BD3] dark:text-[#00A5EC]' : 'text-gray-500 dark:text-gray-400'}`}>▼</span>
              </a>
              {coursesOpen && (
                <div className="absolute top-[49px] left-0 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-zinc-800 rounded-md shadow-lg p-4 flex flex-col gap-2 w-[220px] z-50">
                  <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-zinc-800 pb-1 mb-1">Popular Training Courses</h4>
                  {['Web Development', 'Machine Learning', 'Python Programming', 'Digital Marketing', 'Financial Modeling', 'UI/UX Design'].map(course => (
                    <a key={course} href="#" className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#008BD3] dark:hover:text-[#00A5EC] font-semibold transition-colors py-0.5">
                      {course}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Jobs Dropdown Link */}
            <div 
              className={`relative h-full flex items-center px-4 cursor-pointer transition-colors duration-150 ${jobsOpen ? 'bg-[#F2F8FF] dark:bg-zinc-800/60' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/30'}`}
              onMouseEnter={() => setJobsOpen(true)}
              onMouseLeave={() => setJobsOpen(false)}
            >
              <a href="#" className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors h-full ${jobsOpen ? 'text-[#008BD3] dark:text-[#00A5EC]' : 'text-gray-600 dark:text-gray-350 hover:text-gray-900 dark:hover:text-white'}`}>
                <span>Jobs</span>
                <span className={`text-[7px] transition-transform duration-200 inline-block ${jobsOpen ? 'rotate-180 text-[#008BD3] dark:text-[#00A5EC]' : 'text-gray-500 dark:text-gray-400'}`}>▼</span>
              </a>
              {jobsOpen && (
                <div className="absolute top-[49px] left-0 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-zinc-800 rounded-md shadow-lg p-4 flex flex-col gap-2 w-[200px] z-50">
                  <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-zinc-800 pb-1 mb-1">Jobs by Location</h4>
                  {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata'].map(loc => (
                    <a key={loc} href="#" className="text-xs text-gray-600 dark:text-gray-300 hover:text-[#008BD3] dark:hover:text-[#00A5EC] font-semibold transition-colors py-0.5">
                      Jobs in {loc}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* IS PRO */}
            <a href="#" className="text-[13px] font-bold text-gray-600 dark:text-gray-350 hover:text-gray-900 dark:hover:text-white transition-colors h-full flex items-center">
              IS PRO
            </a>

            {/* Message Icon */}
            <button className="text-gray-500 dark:text-gray-405 hover:text-[#008BD3] dark:hover:text-[#00A5EC] transition-colors cursor-pointer p-1 flex items-center">
              <MessageSquare className="w-[18px] h-[18px] stroke-[1.8]" />
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-400 hover:text-[#008BD3] dark:hover:text-[#00A5EC] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer p-1.5 rounded-full flex items-center justify-center"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-[18px] h-[18px] stroke-[1.8]" /> : <Moon className="w-[18px] h-[18px] stroke-[1.8]" />}
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-1 cursor-pointer h-full">
              <div className="w-[28px] h-[28px] rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 font-bold text-[11px] flex items-center justify-center select-none shadow-xs">
                O
              </div>
              <span className="text-[7px] text-gray-400">▼</span>
            </div>
          </div>

          {/* Right items block (mobile menu and toggle) */}
          <div className="flex md:hidden items-center gap-2.5">
            {/* Mobile Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-gray-500 dark:text-gray-405 hover:text-[#008BD3] dark:hover:text-[#00A5EC] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer p-1.5 rounded-full flex items-center justify-center"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-[18px] h-[18px] stroke-[1.8]" /> : <Moon className="w-[18px] h-[18px] stroke-[1.8]" />}
            </button>

            {/* Hamburger Menu (mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-gray-dark dark:text-gray-300 hover:text-[#008BD3] dark:hover:text-[#00A5EC] focus:outline-none cursor-pointer p-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1E1E1E] border-b border-gray-150 dark:border-zinc-800 px-4 pt-1.5 pb-3.5 space-y-2.5 shadow-sm transition-all duration-300">
          <div className="py-1">
            <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Internships</span>
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
                  className="bg-gray-100 dark:bg-zinc-800 hover:bg-brand-blue-light hover:text-brand-blue text-[10px] text-gray-600 dark:text-gray-300 font-semibold px-2 py-0.5 rounded cursor-pointer transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="py-1 border-t border-gray-100 dark:border-zinc-800">
            <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Courses</span>
            <div className="flex flex-wrap gap-1.5 pl-1 pt-0.5">
              {['Web Development', 'Machine Learning', 'Python'].map(course => (
                <a key={course} href="#" className="bg-gray-100 dark:bg-zinc-800 text-[10px] text-gray-600 dark:text-gray-300 font-semibold px-2 py-0.5 rounded">
                  {course}
                </a>
              ))}
            </div>
          </div>

          <div className="py-1 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <a href="#" className="block text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#008BD3] dark:hover:text-[#00A5EC]">
              Jobs
            </a>
            <a href="#" className="block text-sm font-bold text-[#008BD3] dark:text-[#00A5EC]">
              IS PRO
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
