import React from 'react';

const HeroIllustration: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <style>
      {`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .center-circle { 
          fill: #2A2A72;
          transition: fill 0.3s;
        }
        .center-circle:hover {
          fill: #3F3D8C;
        }
        .resource {
          transition: transform 0.3s, fill 0.3s;
        }
        .resource:hover {
          transform: scale(1.1);
          fill: #4A90E2;
        }
        .pulse {
          animation: pulse 2s infinite;
        }
        .float {
          animation: float 3s infinite ease-in-out;
        }
        .rotate {
          animation: rotate 10s infinite linear;
          transform-origin: center;
        }
      `}
    </style>

    {/* Background Circles */}
    <circle cx="200" cy="200" r="180" fill="#1a1a2e" />
    <circle cx="200" cy="200" r="150" className="center-circle" />

    {/* Central Printer with Text */}
    <g className="pulse">
      <rect x="170" y="180" width="60" height="40" fill="#4A90E2" rx="5"/>
      <rect x="185" y="170" width="30" height="10" fill="#4A90E2"/>
      <rect x="180" y="190" width="40" height="5" fill="#ffffff"/>
      <text x="200" y="235" textAnchor="middle" fill="white" fontSize="12">Printing</text>
    </g>

    {/* Resource Icons */}
    <g className="float" style={{ animationDelay: '-1s' }}>
      {/* Library */}
      <path d="M100 150 h40 v60 h-40 v-60 m0 10 h40 m-40 10 h40 m-40 10 h40" 
            fill="#FF6B6B" stroke="white" strokeWidth="2" className="resource"/>
      <text x="120" y="235" textAnchor="middle" fill="white" fontSize="12">Library</text>
    </g>

    <g className="float" style={{ animationDelay: '-0.5s' }}>
      {/* Marketplace */}
      <path d="M280 150 
              M275 150 l30 0 l5 10 l-40 0 l5 -10
              M270 160 l40 0 l0 30 l-40 0 l0 -30" 
            fill="#4ECDC4" className="resource"/>
      <path d="M280 170 l20 0 M280 180 l20 0" stroke="white" strokeWidth="2"/>
      <text x="290" y="210" textAnchor="middle" fill="white" fontSize="12">Marketplace</text>
    </g>

    <g className="float" style={{ animationDelay: '-1.5s' }}>
      {/* Events */}
      <path d="M180 300 
              M170 290 l40 0 l0 30 l-40 0 l0 -30
              M170 300 l40 0
              M180 290 l0 -5 M200 290 l0 -5" 
            fill="#FFE66D" className="resource"/>
      <text x="190" y="340" textAnchor="middle" fill="white" fontSize="12">Events</text>
    </g>

    <g className="float" style={{ animationDelay: '-2s' }}>
      {/* Chat */}
      <path d="M180 80 q20 -20 40 0 v30 q-20 20 -40 0 z" 
            fill="#FF9F1C" className="resource"/>
      <text x="200" y="130" textAnchor="middle" fill="white" fontSize="12">Chat</text>
    </g>

    <g className="rotate">
      <circle cx="150" cy="150" r="3" fill="#4A90E2" />
      <circle cx="250" cy="250" r="3" fill="#4A90E2" />
      <circle cx="150" cy="250" r="3" fill="#4A90E2" />
      <circle cx="250" cy="150" r="3" fill="#4A90E2" />
    </g>
  </svg>
);

export default HeroIllustration;
