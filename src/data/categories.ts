import { Course } from '../types';

export interface CategoryFilterItem {
  id: string;
  label: string;
  description: string;
  iconName: 'LayoutGrid' | 'Code' | 'Briefcase' | 'Palette' | 'Database' | 'Sparkles';
  tagColor: string;
}

export const COURSE_CATEGORIES: CategoryFilterItem[] = [
  {
    id: 'all',
    label: 'All Categories',
    description: 'Explore the full spectrum of practical tech and digital programs',
    iconName: 'LayoutGrid',
    tagColor: 'bg-slate-100 text-slate-700',
  },
  {
    id: 'programming',
    label: 'Programming',
    description: 'Web development, coding logic, software engineering & automation',
    iconName: 'Code',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Enterprise tools, HR, sales, financial modeling & office administration',
    iconName: 'Briefcase',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'design',
    label: 'Design',
    description: 'Visual branding, typography, commercial graphics & social media art',
    iconName: 'Palette',
    tagColor: 'bg-pink-50 text-pink-700 border-pink-200',
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    description: 'Spreadsheet mastery, PivotTables, data cleaning & KPI dashboards',
    iconName: 'Database',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'ai-tech',
    label: 'AI & Tech',
    description: 'AI prompt engineering, workflow automation, modern mobile & IT tools',
    iconName: 'Sparkles',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
];

// Mapping each course code to its primary and secondary domain categories
export const COURSE_CATEGORY_MAP: Record<string, string[]> = {
  // 100 Level: Foundation
  'SST 101': ['ai-tech', 'business'], // Intro to Computers
  'SST 102': ['ai-tech', 'business'], // Basic Literacy in Computer
  'SST 103': ['data'], // MS Excel Beginner
  'SST 104': ['design'], // Intro to Graphic Design

  // 200 Level: Intermediate
  'SST 201': ['data'], // MS Excel Intermediate
  'SST 202': ['data'], // Data Analysis with Excel
  'SST 203': ['business', 'data'], // Excel for Business Applications
  'SST 204': ['design'], // Graphic Design Intermediate
  'SST 205': ['ai-tech'], // AI in Research Fundamentals
  'SST 206': ['business'], // Professional PowerPoint Presentations
  'SST 207': ['business'], // Advanced MS Word
  'SST 208': ['business'], // Public Speaking & Communication

  // 300 Level: Specialization Tracks
  'SST 301': ['business', 'data'], // Excel for Financial Analysis
  'SST 302': ['business', 'data'], // Excel for HR Analytics
  'SST 303': ['business', 'data'], // Excel for Sales System Management
  'SST 304': ['business'], // Excel for Hospital Management
  'SST 305': ['business'], // Excel for School Management
  'SST 306': ['design'], // Professional Graphic Design
  'SST 307': ['ai-tech'], // AI for Academic & Professional Research
  'SST 308': ['business'], // Virtual Assistant (VA) Training
  'SST 309': ['ai-tech', 'programming'], // Mobile Apps Management
  'SST 310': ['business', 'design'], // Advanced PowerPoint for Business

  // 400 Level: Advanced Programs
  'SST 401': ['programming', 'data'], // Excel VBA Programming (Automation)
  'SST 402': ['programming'], // Software Development (Full Stack Basics)
  'SST 403': ['ai-tech', 'business'], // Office Automation with AI & Tools
};

export function matchesCategory(course: Course, categoryId: string): boolean {
  if (categoryId === 'all') return true;
  const categories = COURSE_CATEGORY_MAP[course.code] || [];
  return categories.includes(categoryId);
}

export function getCategoryBadgeLabel(courseCode: string): string {
  const cats = COURSE_CATEGORY_MAP[courseCode] || [];
  if (cats.includes('programming')) return 'Programming';
  if (cats.includes('design')) return 'Design';
  if (cats.includes('data')) return 'Data & Analytics';
  if (cats.includes('ai-tech')) return 'AI & Tech';
  if (cats.includes('business')) return 'Business';
  return 'General';
}
