import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Award,
  TrendingUp,
  MessageCircle,
  GraduationCap,
  Play,
  Pause,
  ArrowRight,
} from 'lucide-react';
import { STUDENT_TESTIMONIALS } from '../data/testimonials';
import { BRAND_CONFIG } from '../data/content';
import { TestimonialItem } from '../types';

interface StudentSuccessStoriesProps {
  onExploreCourses?: () => void;
}

export const StudentSuccessStories: React.FC<StudentSuccessStoriesProps> = ({
  onExploreCourses,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  // Available categories for testimonial filtering
  const testimonialCategories = [
    'All',
    'Data & Analytics',
    'Programming',
    'Business',
    'Design',
    'Remote Careers',
  ];

  // Filter stories based on selected category
  const filteredStories = STUDENT_TESTIMONIALS.filter((story) => {
    if (activeCategory === 'All') return true;
    return story.category === activeCategory;
  });

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Determine items per page based on window width
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.max(1, filteredStories.length - itemsPerPage + 1);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="stories"
      className="py-16 sm:py-24 bg-white border-t border-slate-200/80 relative overflow-hidden scroll-mt-16"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>STUDENT SUCCESS STORIES · REAL OUTCOMES</span>
          </div>

          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062B68] tracking-tight"
          >
            Real Students. Real Skills. Real Career Transformations.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Read how professionals, graduates, and entrepreneurs across Tamale, the Northern Region, and Ghana used our practical programs to accelerate their careers.
          </p>

          {/* Social Proof Trust Badges Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="bg-[#F5F8FC] border border-slate-200/70 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 font-extrabold text-base">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>4.9 / 5.0</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500">Student Satisfaction</span>
            </div>

            <div className="bg-[#F5F8FC] border border-slate-200/70 rounded-2xl p-3 text-center">
              <div className="font-extrabold text-[#062B68] text-base">300+</div>
              <span className="text-[11px] font-medium text-slate-500">Alumni in Work</span>
            </div>

            <div className="bg-[#F5F8FC] border border-slate-200/70 rounded-2xl p-3 text-center">
              <div className="font-extrabold text-emerald-600 text-base">100%</div>
              <span className="text-[11px] font-medium text-slate-500">Hands-on Lab Projects</span>
            </div>

            <div className="bg-[#F5F8FC] border border-slate-200/70 rounded-2xl p-3 text-center">
              <div className="font-extrabold text-[#0866D8] text-base">2-8 Weeks</div>
              <span className="text-[11px] font-medium text-slate-500">Fast-Track Completion</span>
            </div>
          </div>
        </div>

        {/* Testimonials Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {testimonialCategories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count =
              cat === 'All'
                ? STUDENT_TESTIMONIALS.length
                : STUDENT_TESTIMONIALS.filter((s) => s.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                id={`story-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#062B68] text-white border-[#062B68] shadow-md shadow-[#062B68]/15 ring-2 ring-[#10BFAE]/30 scale-105'
                    : 'bg-slate-50 text-slate-600 hover:text-[#062B68] hover:bg-slate-100 border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-[#10BFAE] text-[#062B68]' : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>
          {/* Main Carousel Cards Grid / Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {filteredStories.map((story) => {
                const hasImgError = imageErrorMap[story.id];

                return (
                  <div
                    key={story.id}
                    className="shrink-0 px-3 transition-all duration-300"
                    style={{ width: `${100 / itemsPerPage}%` }}
                  >
                    <div
                      id={`testimonial-card-${story.id}`}
                      className="h-full flex flex-col justify-between rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-6 sm:p-7 hover:border-[#10BFAE]/70 hover:shadow-xl hover:shadow-[#062B68]/5 transition-all duration-300 relative group"
                    >
                      {/* Top Row: Stars Rating & Verified Badge */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          {/* 5-Star Rating */}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < story.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-xs font-extrabold text-slate-700">
                              {story.rating}.0
                            </span>
                          </div>

                          {/* Verified Badge */}
                          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Verified Alumni</span>
                          </div>
                        </div>

                        {/* Course Tag */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#062B68]/5 text-[#062B68] border border-[#062B68]/10 mb-4">
                          <GraduationCap className="w-3.5 h-3.5 text-[#0866D8]" />
                          <span>
                            {story.courseCode} · {story.courseTitle}
                          </span>
                        </div>

                        {/* Quote Text */}
                        <div className="relative mb-5">
                          <Quote className="w-8 h-8 text-[#10BFAE]/30 absolute -top-3 -left-1 select-none pointer-events-none" />
                          <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal relative z-10 pt-2 line-clamp-6">
                            "{story.quote}"
                          </p>
                        </div>
                      </div>

                      {/* Bottom Section: Outcome Badge & Student Info */}
                      <div className="mt-4 pt-4 border-t border-slate-200/80">
                        {/* Tangible Career Outcome */}
                        <div className="mb-4 px-3 py-2 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">{story.outcome}</span>
                        </div>

                        {/* Student Details & Avatar */}
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="relative shrink-0">
                            {!hasImgError ? (
                              <img
                                src={story.avatarUrl}
                                alt={story.name}
                                onError={() => handleImageError(story.id)}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#10BFAE]/40"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#062B68] to-[#0866D8] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm ring-2 ring-[#10BFAE]/40">
                                {getInitials(story.name)}
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="w-1.5 h-1.5 bg-white rounded-full" />
                            </div>
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-[#062B68] truncate">
                              {story.name}
                            </h4>
                            <p className="text-xs text-slate-600 truncate font-medium">
                              {story.role}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {story.organization}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Controls (Prev / Next & Counter) */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
            {/* Play/Pause Auto-Play Indicator */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#062B68] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                title={isAutoPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">Auto-playing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">Paused</span>
                  </>
                )}
              </button>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {filteredStories.length} success stories loaded
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 h-2 bg-[#0866D8]'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="testimonial-prev-btn"
                onClick={handlePrev}
                disabled={filteredStories.length <= itemsPerPage}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-[#0866D8] text-[#062B68] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                id="testimonial-next-btn"
                onClick={handleNext}
                disabled={filteredStories.length <= itemsPerPage}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-[#0866D8] text-[#062B68] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Action Prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#062B68] to-[#0866D8] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16D9C5]">
              Be Our Next Success Story
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Ready to Upgrade Your Career and Income?
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100 mt-1 max-w-xl">
              Classes are hands-on, intensive, and tailored for immediate job placement or freelance contracts. Register today for the upcoming cohort.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onExploreCourses && (
              <button
                type="button"
                onClick={onExploreCourses}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white text-[#062B68] hover:bg-slate-100 shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <a
              href="https://wa.me/233241695698?text=Hello%20StartSmart%20Tech%20Hub,%20I%20saw%20the%20student%20success%20stories%20and%20I%20want%20to%20enroll%20in%20an%20upcoming%20training%20program."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enroll on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
