"use client";

import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="w-full max-w-[410px] rounded-xl border border-white/10 bg-gray-50/5 overflow-hidden">
      <svg
        width="410"
        height="280"
        viewBox="0 0 410 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="410" height="280" fill="#1a1c1f" />
        
        {/* Skeleton pour l'avatar */}
        <circle
          cx="40"
          cy="40"
          r="25"
          fill="#2a2c2f"
          className="animate-pulse"
        >
          <animate
            attributeName="fill-opacity"
            values="0.3;0.6;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Skeleton pour le nom */}
        <rect
          x="80"
          y="25"
          width="150"
          height="16"
          rx="4"
          fill="#2a2c2f"
          className="animate-pulse"
        >
          <animate
            attributeName="fill-opacity"
            values="0.3;0.6;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        
        {/* Skeleton pour le statut */}
        <rect
          x="80"
          y="45"
          width="100"
          height="12"
          rx="4"
          fill="#2a2c2f"
          className="animate-pulse"
        >
          <animate
            attributeName="fill-opacity"
            values="0.3;0.6;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
        
        {/* Skeleton pour les badges */}
        <g>
          {[...Array(5)].map((_, i) => (
            <rect
              key={i}
              x={85 + i * 25}
              y="65"
              width="20"
              height="20"
              rx="4"
              fill="#2a2c2f"
              className="animate-pulse"
            >
              <animate
                attributeName="fill-opacity"
                values="0.3;0.6;0.3"
                dur="1.5s"
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </g>
        
        {/* Skeleton pour l'activité */}
        <rect
          x="30"
          y="120"
          width="350"
          height="80"
          rx="8"
          fill="#2a2c2f"
          className="animate-pulse"
        >
          <animate
            attributeName="fill-opacity"
            values="0.3;0.6;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
};

