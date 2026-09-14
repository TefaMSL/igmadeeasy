import React from 'react';

export const MascotSvg = ({
  className = 'w-9 h-9',
  lookOffset = { x: 0, y: 0 },
  isBlinking = false,
  mood = 'happy',
}) => {
  // Clamped pupil offsets
  const px = Math.max(-3, Math.min(3, lookOffset.x || 0));
  const py = Math.max(-2.5, Math.min(2.5, lookOffset.y || 0));

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="IG Made Easy Mascot"
    >
      <defs>
        <radialGradient id="mascotGrad" cx="36%" cy="32%" r="66%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="35%" stopColor="#FB923C" />
          <stop offset="72%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </radialGradient>
        <radialGradient id="mascotBlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="50" cy="93" rx="34" ry="6" fill="rgba(15,23,42,0.18)" />

      {/* Main Face Circle */}
      <circle cx="50" cy="48" r="42" fill="url(#mascotGrad)" />

      {/* Cute Head Highlights */}
      <ellipse cx="36" cy="25" rx="14" ry="7" transform="rotate(-32 36 25)" fill="#FFFFFF" opacity="0.85" />
      <ellipse cx="32" cy="22" rx="6" ry="3" transform="rotate(-32 32 22)" fill="#FFFFFF" opacity="0.95" />

      {/* Blushing Cheeks */}
      <circle cx="26" cy="56" r="6" fill="url(#mascotBlush)" />
      <circle cx="74" cy="56" r="6" fill="url(#mascotBlush)" />

      {/* Left Eye */}
      {isBlinking ? (
        <path d="M30 46 C33 49 41 49 44 46" stroke="#241004" strokeWidth="2.6" strokeLinecap="round" />
      ) : (
        <g className="mascot-left-eye transition-transform duration-100">
          <ellipse cx="37" cy="45" rx="8" ry="9" fill="#FFFFFF" />
          <ellipse cx={37 + px} cy={45 + py} rx="6.2" ry="7.2" fill="#241004" />
          <circle cx={35 + px * 0.7} cy={42 + py * 0.7} r="2.6" fill="#FFFFFF" />
          <circle cx={39.5 + px * 0.7} cy={47.5 + py * 0.7} r="1.3" fill="#FFFFFF" />
        </g>
      )}

      {/* Right Eye */}
      {isBlinking ? (
        <path d="M56 46 C59 49 67 49 70 46" stroke="#241004" strokeWidth="2.6" strokeLinecap="round" />
      ) : (
        <g className="mascot-right-eye transition-transform duration-100">
          <ellipse cx="63" cy="45" rx="8" ry="9" fill="#FFFFFF" />
          <ellipse cx={63 + px} cy={45 + py} rx="6.2" ry="7.2" fill="#241004" />
          <circle cx={61 + px * 0.7} cy={42 + py * 0.7} r="2.6" fill="#FFFFFF" />
          <circle cx={65.5 + px * 0.7} cy={47.5 + py * 0.7} r="1.3" fill="#FFFFFF" />
        </g>
      )}

      {/* Mouth based on mood */}
      {mood === 'thinking' ? (
        <path d="M44 58 Q50 55 56 58" stroke="#431407" strokeWidth="3" strokeLinecap="round" />
      ) : mood === 'talking' ? (
        <ellipse cx="50" cy="58" rx="4.5" ry="3.5" fill="#431407" />
      ) : (
        <path
          d="M43 56C45 62 55 62 57 56"
          stroke="#431407"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};

export default MascotSvg;
