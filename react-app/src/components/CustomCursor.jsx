import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isVisible = false;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      currentX = e.clientX;
      currentY = e.clientY;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (!isVisible) {
        cursor.classList.add('active');
        isVisible = true;
      }
    };

    const handleMouseDown = () => {
      cursor.classList.add('clicking');
    };

    const handleMouseUp = () => {
      cursor.classList.remove('clicking');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('active');
      isVisible = false;
    };

    const handleMouseEnter = () => {
      cursor.classList.add('active');
      isVisible = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Optimized Element Delegation for Hover States
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest('a, button, .btn, select, [role="button"], .lang-btn, .theme-btn')) {
        cursor.className = 'active hover-btn';
      } else if (target.closest('input, textarea')) {
        cursor.className = 'active hover-text';
      } else if (target.closest('.book-stage, .hero-3d-canvas, [aria-label*="Book"]')) {
        cursor.className = 'active hover-book';
      } else if (target.closest('.glass-panel, .bento-card, .age-card, .problem-card, .test-card')) {
        cursor.className = 'active hover-card';
      } else {
        cursor.className = 'active';
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      className="will-change-transform"
      aria-hidden="true"
    >
      <div className="cursor-ring" />
      <span className="cursor-book">📖</span>
      <div className="cursor-text-beam" />
    </div>
  );
};

export default CustomCursor;
