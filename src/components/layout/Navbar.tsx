import React from 'react';
import { Menu, Search, X } from 'lucide-react';
import debounce from 'lodash.debounce';
import { NAV_LINKS } from '@/constants';
import { useFilterStore } from '@/store/filterStore';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, onClear, placeholder = 'Search...', className }: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-2.5 w-3.5 h-3.5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-8 pl-8 pr-7 text-xs bg-gray-50 border border-gray-200 rounded placeholder-gray-400/80 focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-2.5 p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

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
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[52px] items-center">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center text-lg font-bold tracking-tight select-none">
              <span className="text-[#333333]">intern</span>
              <span className="text-[#008BD3]">shala</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-semibold text-gray-500 hover:text-[#008BD3] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Search */}
          <SearchInput
            value={localSearch}
            onChange={handleSearchChange}
            onClear={handleClear}
            placeholder="Search profile, company..."
            className="hidden sm:flex w-56"
          />

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
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-1 text-sm font-semibold text-gray-500 hover:text-[#008BD3]"
            >
              {link.label}
            </a>
          ))}
          {/* Mobile Search using extracted SearchInput */}
          <SearchInput
            value={localSearch}
            onChange={handleSearchChange}
            onClear={handleClear}
            placeholder="Search profile, company..."
            className="w-full pt-1"
          />
        </div>
      )}
    </nav>
  );
}
