export interface StipendOption {
  label: string;
  value: number;
}

export const STIPEND_OPTIONS: StipendOption[] = [
  { label: '₹0+', value: 0 },
  { label: '₹5,000+', value: 5000 },
  { label: '₹10,000+', value: 10000 },
  { label: '₹15,000+', value: 15000 },
];

export const NAV_LINKS = [
  { label: 'Internships', href: '#' },
  { label: 'Jobs', href: '#' },
  { label: 'Courses', href: '#' },
];

export const DEFAULT_DURATION_OPTIONS = [
  { label: 'Choose Duration', value: '' },
  { label: '1 Month', value: '1 Month' },
  { label: '2 Months', value: '2 Months' },
  { label: '3 Months', value: '3 Months' },
  { label: '4 Months', value: '4 Months' },
  { label: '6 Months', value: '6 Months' },
];
