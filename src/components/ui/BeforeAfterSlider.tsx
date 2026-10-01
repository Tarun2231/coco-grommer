'use client';

import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  petName: string;
  breed: string;
  service: string;
}

export default function BeforeAfterSlider({
  beforeImg,
  afterImg,
  petName,
  breed,
  service
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-soft border border-brand-200/60 overflow-hidden">
      <div
        ref={containerRef}
        className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden select-none cursor-ew-resize touch-none"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={afterImg}
          alt={`After grooming - ${petName}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-brand-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide z-10">
          AFTER ✂️
        </div>

        {/* Before Image (Clipped Foreground) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImg}
            alt={`Before grooming - ${petName}`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            BEFORE 🐾
          </div>
        </div>

        {/* Divider Bar & Drag Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-md z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg border-2 border-white text-xs font-bold">
            ↔
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">{petName}</h4>
          <p className="text-xs text-brand-700 font-medium">{breed} • {service}</p>
        </div>
        <span className="text-[11px] bg-brand-100 text-brand-900 px-2.5 py-1 rounded-full font-semibold">
          Drag slider to compare ↔
        </span>
      </div>
    </div>
  );
}
