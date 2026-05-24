import { useState, type ChangeEvent } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { NAV_LINKS } from '@/constants';
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
      <Search className="absolute left-2.5 w-3.5 h-3.5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-8 pl-8 pr-7 text-xs bg-gray-50/40 border border-gray-200/70 rounded placeholder-gray-400/60 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 focus:border-brand-blue focus:bg-white transition-all"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch('');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            value={search}
            onChange={handleSearchChange}
            onClear={handleClear}
            placeholder="Search profile, company..."
            className="hidden sm:flex w-48"
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
          {/* Mobile Search */}
          <SearchInput
            value={search}
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
