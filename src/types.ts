export interface StatisticItem {
  id: string;
  value: string;
  label: string;
  subtext?: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Clock' | 'Globe' | 'ShieldCheck' | 'Target' | 'Sparkles' | 'Laptop';
}

export interface HeroFeaturePoint {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'GraduationCap' | 'Laptop' | 'TrendingUp';
  accentColor: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  level: string;
  levelTier: '100' | '200' | '300' | '400';
  levelTierName: string;
  levelGoal?: string;
  duration: string;
  priceGhs: number;
  lessonsCount?: number;
  featured?: boolean;
  isNew?: boolean;
  badge?: string;
  iconName: string;
  modules: string[];
  keyOutcomes: string[];
}

export interface PackageDeal {
  id: string;
  title: string;
  subtitle: string;
  coursesIncluded: string;
  originalPriceGhs: number;
  discountedPriceGhs: number;
  badge: string;
  popular?: boolean;
  description: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Wrench' | 'CalendarCheck' | 'Briefcase' | 'Rocket';
  badgeNumber: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  courseInterest: string;
  message: string;
}

export interface InstructorApplicationData {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  experienceYears: string;
  portfolioUrl: string;
  bio: string;
}
