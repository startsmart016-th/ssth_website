import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Layers,
  MessageCircle,
  Tag,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { ALL_COURSES, PACKAGE_DEALS, BRAND_CONFIG } from '../data/content';
import { Course } from '../types';
import { CourseCard } from './CourseCard';

interface FeaturedCoursesProps {
  onViewCourse: (course: Course) => void;
  onContactAdmissions: () => void;
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  onViewCourse,
  onContactAdmissions,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Courses', count: ALL_COURSES.length },
    { id: '100', label: '100 Level: Foundation', count: 4, goal: 'Low barrier entry' },
    { id: '200', label: '200 Level: Intermediate', count: 8, goal: 'Skill-building & job readiness' },
    { id: '300', label: '300 Level: Specializations', count: 10, goal: 'Career specialization' },
    { id: '400', label: '400 Level: Advanced', count: 3, goal: 'High-income tech skills' },
    { id: 'packages', label: 'Smart Package Deals', count: PACKAGE_DEALS.length, goal: 'Save up to GHC 400' },
  ];

  const filteredCourses = ALL_COURSES.filter((course) => {
    const matchesTab =
      selectedTab === 'all' ||
      (selectedTab === '100' && course.levelTier === '100') ||
      (selectedTab === '200' && course.levelTier === '200') ||
      (selectedTab === '300' && course.levelTier === '300') ||
      (selectedTab === '400' && course.levelTier === '400');

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.code.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });

  return (
    <section
      id="courses"
      className="py-16 sm:py-24 bg-[#F5F8FC] border-t border-slate-200/60 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#062B68]/10 to-[#10BFAE]/20 border border-[#10BFAE]/30 text-[#062B68] text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#10BFAE]" />
            2026 TECH TRAINING PROGRAMS NOW OPEN
          </div>

          <h2
            id="featured-courses-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062B68] tracking-tight"
          >
            Explore All 25+ Training Courses
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Upgrade your skills and become job-ready in 2 to 8 weeks. Choose a level below or enroll in a smart discounted package.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course code or keyword (e.g. SST 201, Excel, Graphic Design, AI)..."
                className="w-full pl-11 pr-16 py-3 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0866D8] focus:border-transparent shadow-sm placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#062B68] text-white shadow-md shadow-[#062B68]/20 scale-105'
                    : 'bg-white text-slate-600 hover:text-[#062B68] hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-[#10BFAE] text-[#062B68]' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Package Deals Section (Shown when 'packages' or 'all' is selected and no conflicting search) */}
        {(selectedTab === 'packages' || (selectedTab === 'all' && !searchQuery)) && (
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#062B68] via-[#073B87] to-[#0866D8] text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10BFAE]/20 text-[#16D9C5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#10BFAE]/40">
                  <Tag className="w-3.5 h-3.5" />
                  Package Deals · Smart Bundles
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Smart Bundles = More Value, More Savings, More Success!
                </h3>
                <p className="text-xs sm:text-sm text-cyan-100 mt-1">
                  Bundle essential courses together to save up to GHC 400 while mastering end-to-end career tracks.
                </p>
              </div>

              <a
                href="https://wa.me/233241695698?text=Hello%20StartSmart%20Tech%20Hub,%20I%20am%20interested%20in%20enrolling%20in%20a%20Smart%20Package%20Deal."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {PACKAGE_DEALS.map((deal) => {
                const waUrl = `https://wa.me/233241695698?text=${encodeURIComponent(
                  `Hello StartSmart Tech Hub, I want to enroll in the ${deal.title} (${deal.coursesIncluded}) for GHC ${deal.discountedPriceGhs}. Please send me the details!`
                )}`;

                return (
                  <div
                    key={deal.id}
                    className={`rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
                      deal.popular
                        ? 'bg-white text-slate-800 shadow-2xl ring-2 ring-[#16D9C5]'
                        : 'bg-white/10 text-white border border-white/15 hover:bg-white/15'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            deal.popular
                              ? 'bg-[#10BFAE]/20 text-[#073B87] border border-[#10BFAE]/40'
                              : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                          }`}
                        >
                          {deal.badge}
                        </span>
                      </div>

                      <h4
                        className={`text-lg font-bold ${
                          deal.popular ? 'text-[#062B68]' : 'text-white'
                        }`}
                      >
                        {deal.title}
                      </h4>

                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          deal.popular ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {deal.description}
                      </p>

                      <div
                        className={`mt-3 p-2.5 rounded-xl text-[11px] font-mono leading-tight ${
                          deal.popular ? 'bg-slate-100 text-slate-700' : 'bg-black/20 text-cyan-200'
                        }`}
                      >
                        <span className="font-bold block mb-0.5">Includes:</span>
                        {deal.coursesIncluded}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/40">
                      <div className="flex items-baseline justify-between mb-3">
                        <span
                          className={`text-xs line-through ${
                            deal.popular ? 'text-slate-400' : 'text-slate-400'
                          }`}
                        >
                          GHC {deal.originalPriceGhs}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-xs font-bold ${
                              deal.popular ? 'text-[#073B87]' : 'text-[#16D9C5]'
                            }`}
                          >
                            GHC
                          </span>
                          <span
                            className={`text-2xl font-extrabold tracking-tight ${
                              deal.popular ? 'text-[#062B68]' : 'text-white'
                            }`}
                          >
                            {deal.discountedPriceGhs}
                          </span>
                        </div>
                      </div>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          deal.popular
                            ? 'bg-[#062B68] hover:bg-[#0866D8] text-white shadow-md'
                            : 'bg-[#10BFAE] hover:bg-[#16D9C5] text-[#062B68]'
                        }`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Claim Deal on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Course Cards Grid */}
        {selectedTab !== 'packages' && (
          <>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewCourse={onViewCourse}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-700">No courses match "{searchQuery}"</h4>
                <p className="text-xs text-slate-500 mt-1">Try another course code or keyword.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTab('all');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-[#0866D8] bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  Reset Search & View All 25 Courses
                </button>
              </div>
            )}
          </>
        )}

        {/* Bottom Contact / WhatsApp Assistance Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Direct Enrollment Hotline
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-[#062B68]">
                Need Help Choosing the Right Course or Package?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Chat directly with our admissions counselor on WhatsApp: <strong className="text-slate-800">{BRAND_CONFIG.contact.phone}</strong> or visit us opposite SSNIT Pension Tower, Tamale.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/233241695698?text=Hello%20StartSmart%20Tech%20Hub,%20I%20would%20like%20guidance%20on%20which%20course%20to%20enroll%20in."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={onContactAdmissions}
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#062B68] hover:bg-[#0866D8] text-white shadow-md transition-colors cursor-pointer"
            >
              <span>Contact Form</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
