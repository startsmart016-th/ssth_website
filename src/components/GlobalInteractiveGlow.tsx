import React, { useEffect, useState, useRef } from 'react';

interface GlowState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isInside: boolean;
}

interface ClickPulse {
  id: number;
  x: number;
  y: number;
}

export const GlobalInteractiveGlow: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [pulses, setPulses] = useState<ClickPulse[]>([]);
  const stateRef = useRef<GlowState>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isInside: false,
  });

  useEffect(() => {
    let animationFrameId: number;

    const handlePointerMove = (e: MouseEvent) => {
      stateRef.current.targetX = e.clientX;
      stateRef.current.targetY = e.clientY;
      stateRef.current.isInside = true;
    };

    const handlePointerLeave = () => {
      stateRef.current.isInside = false;
    };

    const handleClick = (e: MouseEvent) => {
      // Don't trigger if user clicked inside input or button to avoid visual clutter
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      const newPulse: ClickPulse = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setPulses((prev) => [...prev.slice(-4), newPulse]);

      // Remove pulse after animation
      setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== newPulse.id));
      }, 700);
    };

    // Smooth lerp loop for the global cursor ambient light
    const updateGlow = () => {
      const state = stateRef.current;
      if (state.isInside) {
        state.x += (state.targetX - state.x) * 0.12;
        state.y += (state.targetY - state.y) * 0.12;
        setCoords({ x: Math.round(state.x), y: Math.round(state.y) });
      }
      animationFrameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('click', handleClick, { passive: true });

    animationFrameId = requestAnimationFrame(updateGlow);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      {/* 1. Global Interactive Spotlight Following Cursor */}
      {coords.x > -500 && (
        <div
          className="absolute rounded-full transition-opacity duration-300 pointer-events-none"
          style={{
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(22, 217, 197, 0.07) 0%, rgba(8, 102, 216, 0.03) 45%, transparent 70%)',
          }}
        />
      )}

      {/* 2. Expanding Digital Energy Rings upon Click */}
      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: pulse.x,
            top: pulse.y,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            animation: 'expand-ring 0.7s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
            border: '2px solid rgba(22, 217, 197, 0.8)',
            boxShadow: '0 0 15px rgba(22, 217, 197, 0.5), inset 0 0 10px rgba(16, 191, 174, 0.3)',
          }}
        />
      ))}

      <style>{`
        @keyframes expand-ring {
          0% {
            width: 8px;
            height: 8px;
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            width: 140px;
            height: 140px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.4);
          }
        }
      `}</style>
    </div>
  );
};
