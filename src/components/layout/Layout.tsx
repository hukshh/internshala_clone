import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw, Send } from 'lucide-react';
import { Navbar } from './Navbar';
import { useFilterStore } from '@/store/filterStore';

interface LayoutProps {
  children: React.ReactNode;
  filterSidebar: React.ReactNode;
  header?: React.ReactNode;
  extraBottomContent?: React.ReactNode;
  fullWidthBottomContent?: React.ReactNode;
}

export function Layout({ children, filterSidebar, header, extraBottomContent, fullWidthBottomContent }: LayoutProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[980px] w-full mx-auto px-4 py-5">
        {header && <div className="w-full mb-6 select-none">{header}</div>}

        {/* Mobile Filter Button */}
        <div className="flex justify-end mb-3 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1 px-3 h-8 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded shadow-sm text-xs font-semibold text-brand-gray-dark dark:text-gray-300 hover:bg-brand-gray-light dark:hover:bg-zinc-750 cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-brand-blue" />
            Filters
          </button>
        </div>

        {/* Flex layout for exact Internshala spacing and proportions */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-[270px] flex-shrink-0 sticky top-[72px]">
            {filterSidebar}
          </div>

          {/* Internship Card List */}
          <div className="flex-1 w-full max-w-[640px]">
            {children}
          </div>
        </div>

        {extraBottomContent && (
          <div className="w-full mt-10">
            {extraBottomContent}
          </div>
        )}
      </main>

      {fullWidthBottomContent && (
        <div className="w-full">
          {fullWidthBottomContent}
        </div>
      )}

      {/* Platform Footer */}
      <footer className="bg-[#222222] text-[#EAEAEA] border-t border-gray-800 dark:border-zinc-900 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Main Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 select-none">
            {/* Col 1 */}
            <div>
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-1.5">Internships by places</h4>
              <ul className="space-y-1.5 text-xs text-gray-400 font-semibold">
                {['India', 'Delhi', 'Bangalore', 'Hyderabad', 'Mumbai', 'Chennai', 'Pune', 'Kolkata'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#008BD3] transition-colors">{`Internships in ${item}`}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Col 2 */}
            <div>
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-1.5">Internships by stream</h4>
              <ul className="space-y-1.5 text-xs text-gray-400 font-semibold">
                {['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'Marketing', 'Finance', 'Graphic Design'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#008BD3] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-1.5">Jobs by places</h4>
              <ul className="space-y-1.5 text-xs text-gray-400 font-semibold">
                {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata', 'Chennai', 'Pune'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#008BD3] transition-colors">{`Jobs in ${item}`}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-1.5">About Internshala</h4>
              <ul className="space-y-1.5 text-xs text-gray-400 font-semibold">
                {['About us', "We're hiring", 'Hire interns for your company', 'Team diary', 'Blog', 'Our services', 'Contact us'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#008BD3] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5 */}
            <div>
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-1.5">Resources</h4>
              <ul className="space-y-1.5 text-xs text-gray-400 font-semibold">
                {['Privacy', 'Terms', 'Security', 'Sitemap', 'Help Center', 'Mobile App'].map(item => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#008BD3] transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left Copyright */}
            <div className="flex items-center gap-1 select-none">
              <span className="text-[#008BD3] text-xs font-black tracking-widest uppercase">INTERNSHALA</span>
              <Send className="w-3 h-3 text-[#008BD3] -rotate-[15deg] -translate-y-0.5 fill-[#008BD3]" />
              <span className="text-xs text-gray-500 ml-3">© Copyright 2026 Internshala</span>
            </div>

            {/* Right Social Links */}
            <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold select-none">
              <a href="#" className="hover:text-[#008BD3] transition-colors">Facebook</a>
              <a href="#" className="hover:text-[#008BD3] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#008BD3] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#008BD3] transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative ml-auto w-full max-w-[285px] h-full bg-white dark:bg-[#1E1E1E] shadow-xl flex flex-col p-4 overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800 mb-4">
              <span className="text-sm font-bold text-brand-gray-dark dark:text-gray-300">Filter Internships</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] font-bold text-brand-blue hover:text-brand-blue-hover flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  Clear all
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded text-brand-gray dark:text-gray-400 hover:text-brand-gray-dark dark:hover:text-gray-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Filter Sidebar container */}
            <div className="flex-1 overflow-y-auto pr-1">
              {React.isValidElement(filterSidebar) 
                ? React.cloneElement(filterSidebar as React.ReactElement<{ hideHeader?: boolean; className?: string }>, { 
                    hideHeader: true, 
                    className: "w-full border-none shadow-none p-0 bg-transparent space-y-4" 
                  })
                : filterSidebar
              }
            </div>
            
            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-zinc-800">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full h-9 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-bold rounded shadow transition-colors cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
