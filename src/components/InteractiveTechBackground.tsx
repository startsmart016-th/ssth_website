import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Zap, Radio, Layers, Volume2, Eye } from 'lucide-react';

export type BackgroundMode = 'constellation' | 'flow' | 'quantum';

interface InteractiveTechBackgroundProps {
  className?: string;
  showControls?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseAngle: number;
  label?: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  speed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export const InteractiveTechBackground: React.FC<InteractiveTechBackgroundProps> = ({
  className = '',
  showControls = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<BackgroundMode>('constellation');
  const [particleSpeedMultiplier, setParticleSpeedMultiplier] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(true);

  // Mouse / pointer state
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    isInside: boolean;
    lastMoved: number;
  }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isInside: false,
    lastMoved: 0,
  });

  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Tech glyphs for subtle floating data labels
  const techLabels = ['01', '10', '</>', 'fn()', 'SQL', 'fx', 'JSON', 'AI', '{ }', 'API'];
  const brandColors = [
    '#16D9C5', // StartSmart Teal
    '#10BFAE', // Vibrant Cyan-Teal
    '#38BDF8', // Sky Blue
    '#0866D8', // Royal Electric Blue
    '#FBBF24', // Amber Spark
  ];

  // Initialize particles based on canvas size
  const initParticles = useCallback((width: number, height: number, mode: BackgroundMode) => {
    const particles: Particle[] = [];
    // Adjust density based on screen resolution
    const densityDivisor = width < 768 ? 16000 : 11000;
    const count = Math.min(Math.max(Math.floor((width * height) / densityDivisor), 35), 90);

    for (let i = 0; i < count; i++) {
      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      const baseRadius = Math.random() * 2.2 + 1.2;
      const baseAlpha = Math.random() * 0.5 + 0.35;
      const label = Math.random() > 0.85 ? techLabels[Math.floor(Math.random() * techLabels.length)] : undefined;

      let vx = (Math.random() - 0.5) * 0.9;
      let vy = (Math.random() - 0.5) * 0.9;

      if (mode === 'flow') {
        vx = Math.random() * 1.2 + 0.4;
        vy = (Math.random() - 0.5) * 0.4;
      } else if (mode === 'quantum') {
        vx = (Math.random() - 0.5) * 1.4;
        vy = (Math.random() - 0.5) * 1.4;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        radius: baseRadius,
        baseRadius,
        color,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseAngle: Math.random() * Math.PI * 2,
        label,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Spawn energy ripple and sparks on click / tap
  const triggerRippleAndSparks = useCallback((x: number, y: number) => {
    // 1. Add expanding shockwave ripple
    ripplesRef.current.push({
      x,
      y,
      radius: 5,
      maxRadius: 180,
      alpha: 0.85,
      color: '#16D9C5',
      speed: 4.5,
    });

    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 130,
      alpha: 0.6,
      color: '#0866D8',
      speed: 3,
    });

    // 2. Add celebratory energetic sparks
    const sparkCount = 18;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 4.5 + 2;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 30 + 25,
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        size: Math.random() * 2.5 + 1.5,
      });
    }

    // 3. Push nearby particles outward
    particlesRef.current.forEach((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180 && dist > 0) {
        const force = (180 - dist) / 180;
        p.vx += (dx / dist) * force * 5;
        p.vy += (dy / dist) * force * 5;
      }
    });

    setClickCount((prev) => prev + 1);
    setShowHint(false);
  }, []);

  // Setup Canvas and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    initParticles(width, height, activeMode);

    // Resize Observer to adjust dimensions smoothly
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          width = canvas.width = newW;
          height = canvas.height = newH;
          initParticles(newW, newH, activeMode);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Intersection observer to pause rendering when not in viewport
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    // Render loop
    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const time = Date.now() * 0.001;

      // 1. Draw Mouse Interactive Glow Aura if inside
      if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          activeMode === 'quantum' ? 240 : 180
        );
        gradient.addColorStop(0, 'rgba(22, 217, 197, 0.22)');
        gradient.addColorStop(0.35, 'rgba(16, 191, 174, 0.12)');
        gradient.addColorStop(0.7, 'rgba(8, 102, 216, 0.04)');
        gradient.addColorStop(1, 'rgba(4, 30, 74, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 240, 0, Math.PI * 2);
        ctx.fill();

        // Target reticle / subtle pulse ring around cursor
        ctx.strokeStyle = 'rgba(22, 217, 197, 0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 32 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Render & Update Shockwave Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha *= 0.94;

        if (r.alpha <= 0.02 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = r.alpha;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Render & Update Click Sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.life++;

        const lifeRatio = 1 - s.life / s.maxLife;
        if (lifeRatio <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = lifeRatio * 0.9;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Update & Render Particles
      const particles = particlesRef.current;
      const connectionDist = width < 768 ? 100 : 135;
      const mouseConnectionDist = 170;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulsing radius & opacity
        p.pulseAngle += p.pulseSpeed;
        const pulse = Math.sin(p.pulseAngle);
        p.radius = p.baseRadius + pulse * 0.6;
        p.alpha = Math.max(0.2, p.baseAlpha + pulse * 0.2);

        // Move particle based on mode and speed
        const speed = particleSpeedMultiplier;
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        // Mode-specific physics
        if (activeMode === 'flow') {
          if (p.x > width + 20) p.x = -20;
          if (p.y > height + 20) p.y = -20;
          if (p.y < -20) p.y = height + 20;
        } else if (activeMode === 'quantum' && mouse.isInside) {
          // Gravitational swirl around cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 20 && dist < 320) {
            const angle = Math.atan2(dy, dx);
            // Perpendicular swirl + slight attraction
            const force = (320 - dist) / 320;
            p.vx += (-Math.sin(angle) * 0.35 + Math.cos(angle) * 0.15) * force;
            p.vy += (Math.cos(angle) * 0.35 + Math.sin(angle) * 0.15) * force;
            // Damping
            p.vx *= 0.96;
            p.vy *= 0.96;
          }
        }

        // Bounce off canvas boundaries
        if (p.x <= p.radius) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx);
        } else if (p.x >= width - p.radius) {
          p.x = width - p.radius;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y <= p.radius) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy);
        } else if (p.y >= height - p.radius) {
          p.y = height - p.radius;
          p.vy = -Math.abs(p.vy);
        }

        // Mouse interaction: Magnetism & Laser Link
        if (mouse.isInside) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectionDist) {
            // Draw interactive glowing beam to cursor
            const beamAlpha = (1 - dist / mouseConnectionDist) * 0.75;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = beamAlpha;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Energy node light-up
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = beamAlpha * 0.9;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Gentle magnetism attraction
            const pull = (1 - dist / mouseConnectionDist) * 0.08;
            p.vx += dx * pull * 0.05;
            p.vy += dy * pull * 0.05;
          }
        }

        // Inter-particle connections (Constellation mesh)
        if (activeMode !== 'quantum' || i % 2 === 0) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              const lineAlpha = (1 - dist / connectionDist) * 0.28;
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              // Gradient-like line effect
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth = dist < connectionDist * 0.4 ? 1.2 : 0.8;
              ctx.stroke();
              ctx.restore();
            }
          }
        }

        // Draw particle node
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node outer subtle glow halo
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.4;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.stroke();

        // Draw tech label if present
        if (p.label) {
          ctx.font = '9px monospace';
          ctx.fillStyle = '#16D9C5';
          ctx.globalAlpha = p.alpha * 0.85;
          ctx.fillText(p.label, p.x + p.radius + 3, p.y + 3);
        }
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [activeMode, initParticles, particleSpeedMultiplier]);

  // Pointer event handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
    mouseRef.current.isInside = true;
    mouseRef.current.lastMoved = Date.now();
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    mouseRef.current.isInside = false;
    mouseRef.current.targetX = -1000;
    mouseRef.current.targetY = -1000;
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerRippleAndSparks(x, y);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`absolute inset-0 overflow-hidden cursor-crosshair select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* 1. Underlying animated tech gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031533] via-[#062B68] to-[#073B87] opacity-95 pointer-events-none" />

      {/* 1b. Real Background Imagery: Diverse people enthusiastically learning tech & coding on laptops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80"
          alt="People and students learning tech and coding on computers in classroom"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_30%] filter saturate-[1.2] contrast-[1.1] opacity-30 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft atmospheric gradient overlays to ensure text legibility while displaying learners */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031533]/95 via-[#062B68]/75 to-[#073B87]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041E4A] via-transparent to-[#031533]/80" />

        {/* Human code syntax background watermark traces */}
        <div className="absolute top-16 left-8 font-mono text-[11px] text-[#16D9C5]/10 leading-relaxed pointer-events-none hidden md:block">
          <p>{`// Human Coder: StartSmart Student Lab`}</p>
          <p>{`const future = new TechCareer({ track: 'Software Engineering' });`}</p>
          <p>{`await future.learnPracticalSkills(['React', 'TypeScript', 'Python']);`}</p>
          <p>{`future.deployToCloud({ status: 'Job Ready' });`}</p>
        </div>

        <div className="absolute bottom-20 right-12 font-mono text-[11px] text-[#38BDF8]/10 leading-relaxed pointer-events-none hidden lg:block text-right">
          <p>{`def build_tomorrow(student):`}</p>
          <p>{`    skills = ["Data Analytics", "AI Foundations", "Hardware"]`}</p>
          <p>{`    return student.lead_the_future(skills)`}</p>
        </div>
      </div>

      {/* 2. Interactive SVG Tech Circuit Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 transition-opacity duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGradInteractive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16D9C5" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#10BFAE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0866D8" stopOpacity="0.2" />
          </linearGradient>
          <pattern id="interactiveGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(22, 217, 197, 0.08)" strokeWidth="1" />
            <circle cx="40" cy="40" r="1.5" fill="rgba(22, 217, 197, 0.2)" />
          </pattern>
        </defs>

        {/* Dynamic Grid Background */}
        <rect width="100%" height="100%" fill="url(#interactiveGridPattern)" />

        {/* Traced Circuit Lines with glowing junctions */}
        <g className="transition-transform duration-700 ease-out">
          <path
            d="M -50 160 L 240 160 L 380 300 L 850 300 L 980 430 L 1500 430"
            stroke="url(#circuitGradInteractive)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 6"
          />
          <path
            d="M 120 -20 L 120 120 L 220 220 L 520 220"
            stroke="url(#circuitGradInteractive)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 650 650 L 820 480 L 1150 480 L 1280 610"
            stroke="url(#circuitGradInteractive)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Circuit glowing micro-terminals */}
          <circle cx="240" cy="160" r="4" fill="#16D9C5" className="animate-pulse" />
          <circle cx="380" cy="300" r="5" fill="#10BFAE" />
          <circle cx="850" cy="300" r="4" fill="#38BDF8" />
          <circle cx="220" cy="220" r="3.5" fill="#16D9C5" />
          <circle cx="820" cy="480" r="4.5" fill="#FBBF24" />
        </g>
      </svg>

      {/* 3. HTML5 Canvas rendering interactive constellation, particles & cursor link */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. Interactive Ambient Controller Pill / Status Bar (Bottom Right of Hero) */}
      {showControls && (
        <div
          id="interactive-bg-controller"
          className="absolute bottom-2.5 right-2.5 sm:bottom-6 sm:right-6 z-20 pointer-events-auto flex flex-col items-end gap-1.5 max-w-[calc(100vw-1.5rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Helpful interaction hint bubble that auto-fades or dismisses */}
          {showHint && clickCount === 0 && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#16D9C5]/40 text-[11px] font-semibold text-cyan-200 shadow-lg animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-[#16D9C5]" />
              <span>Tip: Click or move cursor over background to interact</span>
            </div>
          )}

          {/* Control Bar Badge */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-[#041E4A]/90 backdrop-blur-md border border-white/15 shadow-xl shadow-[#041E4A]/40 text-xs">
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#16D9C5] animate-ping inline-block" />
              <span className="hidden md:inline">Neural Mode:</span>
            </div>

            {/* Mode Selectors */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                id="bg-mode-constellation"
                onClick={() => setActiveMode('constellation')}
                className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeMode === 'constellation'
                    ? 'bg-[#10BFAE] text-[#062B68] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Interactive Connected Constellation"
              >
                <Radio className="w-3 h-3 shrink-0" />
                <span>Nodes</span>
              </button>

              <button
                type="button"
                id="bg-mode-flow"
                onClick={() => setActiveMode('flow')}
                className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeMode === 'flow'
                    ? 'bg-[#10BFAE] text-[#062B68] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Cyber Flow Matrix"
              >
                <Layers className="w-3 h-3 shrink-0" />
                <span className="hidden xs:inline sm:inline">Flow</span>
              </button>

              <button
                type="button"
                id="bg-mode-quantum"
                onClick={() => setActiveMode('quantum')}
                className={`px-2 py-1 sm:px-2.5 sm:py-1 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeMode === 'quantum'
                    ? 'bg-[#10BFAE] text-[#062B68] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Quantum Gravitational Orbits"
              >
                <Zap className="w-3 h-3 shrink-0" />
                <span className="hidden xs:inline sm:inline">Orbit</span>
              </button>
            </div>

            {/* Speed toggle */}
            <button
              type="button"
              id="bg-speed-toggle"
              onClick={() => setParticleSpeedMultiplier((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 0.4 : 1))}
              className="px-1.5 sm:px-2 py-1 rounded-xl text-[10px] font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-l border-white/10 pl-1.5 sm:pl-2 ml-0.5"
              title="Toggle animation velocity"
            >
              {particleSpeedMultiplier}x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
