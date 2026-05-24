import React, { useState } from 'react';
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Mobile Filter Button */}
        <div className="flex justify-end mb-4 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1.5 px-3.5 h-9 bg-white border border-brand-gray-border rounded shadow-sm text-xs font-semibold text-brand-gray-dark hover:bg-brand-gray-light cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-blue" />
            Filters
          </button>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-20">
            {filterSidebar}
          </div>

          {/* Internship Card List */}
          <div className="col-span-1 lg:col-span-3">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative ml-auto w-full max-w-xs h-full bg-white shadow-xl flex flex-col p-5 overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between pb-3 border-b border-brand-gray-border mb-4">
              <span className="font-bold text-brand-gray-dark">Filter Internships</span>
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
            
            <div className="pt-5 mt-4 border-t border-brand-gray-border">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full h-10 bg-brand-blue hover:bg-brand-blue-hover text-white font-bold rounded shadow transition-colors cursor-pointer"
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
