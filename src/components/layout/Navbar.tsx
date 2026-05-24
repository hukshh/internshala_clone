import React from 'react';
import { Menu, Search, X } from 'lucide-react';
import debounce from 'lodash.debounce';
import { NAV_LINKS } from '@/constants';
import { useFilterStore } from '@/store/filterStore';

export function Navbar() {
  const { search, setSearch } = useFilterStore();
  const [localSearch, setLocalSearch] = React.useState(search);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Keep local input state synchronized with store (e.g. on reset/clear)
  React.useEffect(() => {
    if (localSearch !== search) {
      const timer = setTimeout(() => {
        setLocalSearch(search);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [search, localSearch]);

  // Debounced store update
  const debouncedSetSearch = React.useMemo(
    () => debounce((val: string) => setSearch(val), 300),
    [setSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSetSearch(value);
  };

  const handleClear = () => {
    setLocalSearch('');
    setSearch('');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-brand-gray-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1 text-lg font-bold tracking-tight">
              <span className="text-[#008BD3]">intern</span>
              <span className="text-[#00A5EC]">shala</span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-blue-light text-brand-blue border border-brand-blue/15 ml-0.5">
                Clone
              </span>
            </a>
            
            <div className="hidden md:flex items-center space-x-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold text-brand-gray-dark hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Search bar inside navbar (desktop) */}
          <div className="hidden sm:flex items-center relative w-60">
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-brand-gray" />
            <input
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Search profile, company..."
              className="w-full h-8 pl-8 pr-7 text-xs bg-brand-gray-light border border-brand-gray-border rounded focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue focus:bg-white transition-all"
            />
            {localSearch && (
              <button
                onClick={handleClear}
                className="absolute right-2.5 text-[10px] text-brand-gray hover:text-brand-gray-dark cursor-pointer font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Hamburger Menu (mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-gray-dark hover:text-brand-blue focus:outline-none cursor-pointer p-1"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-brand-gray-border px-4 pt-2 pb-4 space-y-3 shadow-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-sm font-semibold text-brand-gray-dark hover:text-brand-blue"
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Search */}
          <div className="flex items-center relative w-full pt-2">
            <Search className="absolute left-3 w-4 h-4 text-brand-gray" />
            <input
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Search profile, company..."
              className="w-full h-9 pl-9 pr-8 text-sm bg-brand-gray-light border border-brand-gray-border rounded focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue"
            />
            {localSearch && (
              <button
                onClick={handleClear}
                className="absolute right-3 text-xs text-brand-gray hover:text-brand-gray-dark"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
