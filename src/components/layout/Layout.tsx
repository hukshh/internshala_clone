import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  filterSidebar: React.ReactNode;
}

export function Layout({ children, filterSidebar }: LayoutProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
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
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-xl flex flex-col p-4 overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="text-sm font-bold text-brand-gray-dark">Filter Internships</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded text-brand-gray hover:text-brand-gray-dark cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Filter Sidebar container */}
            <div className="flex-1 overflow-y-auto pr-1">
              {filterSidebar}
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
