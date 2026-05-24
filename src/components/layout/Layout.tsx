import React, { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { Navbar } from './Navbar';
import { useFilterStore } from '@/store/filterStore';

interface LayoutProps {
  children: React.ReactNode;
  filterSidebar: React.ReactNode;
}

export function Layout({ children, filterSidebar }: LayoutProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Mobile Filter Button */}
        <div className="flex justify-end mb-3 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1 px-3 h-8 bg-white border border-gray-200 rounded shadow-sm text-xs font-semibold text-brand-gray-dark hover:bg-brand-gray-light cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-brand-blue" />
            Filters
          </button>
        </div>

        {/* Five-Column Grid (1/5 sidebar, 4/5 cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-[72px]">
            {filterSidebar}
          </div>

          {/* Internship Card List */}
          <div className="col-span-1 lg:col-span-4">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/30 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative ml-auto w-full max-w-[285px] h-full bg-white shadow-xl flex flex-col p-4 overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-sm font-bold text-brand-gray-dark">Filter Internships</span>
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
                  className="p-1 rounded text-brand-gray hover:text-brand-gray-dark cursor-pointer"
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
            
            <div className="pt-4 mt-3 border-t border-slate-100">
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
