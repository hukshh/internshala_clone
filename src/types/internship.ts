export interface Location {
  string: string;
  link: string;
  country: string;
  region: string | null;
  locationName: string;
}

export interface Stipend {
  salary: string;
  tooltip: string | null;
  salaryValue1: number;
  salaryValue2: number | null;
  salaryType: 'fixed' | 'variable' | 'unpaid' | 'performance_linked' | string;
  currency: string;
  scale: string;
  large_stipend_text: boolean;
}

export interface Label {
  label_value: string[];
  label_mobile: string[];
  label_app: string[];
  labels_app_in_card: string[];
}

export interface Internship {
  id: number;
  title: string;
  employment_type: string;
  company_name: string;
  company_url: string;
  is_premium: boolean;
  is_premium_internship: boolean;
  work_from_home?: boolean;
  employer_name: string;
  company_logo: string;
  type: string;
  url: string;
  is_active: boolean;
  expires_at: string;
  closed_at: string;
  profile_name: string;
  part_time: boolean;
  start_date: string;
  duration: string;
  stipend: Stipend;
  salary: number | null;
  experience: string;
  posted_on: string;
  postedOnDateTime: number;
  application_deadline: string;
  expiring_in: string;
  posted_by_label: string;
  posted_by_label_type: string;
  location_names: string[];
  locations: Location[];
  is_ppo: boolean;
  ppo_label_value: string;
  office_days: string | null;
}

export interface SearchApiResponse {
  internships_meta: Record<string, Internship>;
  internship_ids: number[];
}
