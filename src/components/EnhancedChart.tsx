import React, { useState, useRef, useEffect } from 'react';
import DataPointDetails from './DataPointDetails';

// Chart data structure
export interface ChartDataPoint {
  month: string;
  value: number;
  formatted: string;
  highlight?: boolean;
}

interface EnhancedChartProps {
  data?: ChartDataPoint[];
  title?: string;
  height?: number;
}

/**
 * EnhancedChart - Interactive chart component with hover effects and data point details
 */
const EnhancedChart: React.FC<EnhancedChartProps> = ({ 
  data = [], 
  title = "Unsatisfied Demand %",
  height = 300 
}) => {
  // Default data if none provided
  const chartData = data.length > 0 ? data : [
    { month: "Apr", value: 40000, formatted: "$40K" },
    { month: "May", value: 20000, formatted: "$20K" },
    { month: "Jun", value: 50000, formatted: "$50K" },
    { month: "Jul", value: 100000, formatted: "$100K", highlight: true },
    { month: "Aug", value: 60000, formatted: "$60K" },
    { month: "Sep", value: 30000, formatted: "$30K" },
    { month: "Oct", value: 70000, formatted: "$70K" },
  ];

  const [activePoint, setActivePoint] = useState<number | null>(3); // Default to Jul (index 3)
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const [detailsPosition, setDetailsPosition] = useState({ x: 0, y: 0 });
  const chartRef = useRef<HTMLDivElement>(null);
  const [isPersistent, setIsPersistent] = useState(false);
  const [showInsightDetails, setShowInsightDetails] = useState(false);
  
  // Convert data values to SVG coordinates
  const maxValue = Math.max(...chartData.map(d => d.value));
  const width = 700;
  
  // Calculate point positions for the SVG path
  const pointPositions = chartData.map((point, index) => {
    const x = (index / (chartData.length - 1)) * width;
    const y = height - (point.value / maxValue) * height;
    return { x, y, ...point };
  });
  
  // Create the SVG path command
  const pathCommand = pointPositions.map((point, index) => 
    index === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`
  ).join(' ');
  
  // Handle hover on data point
  const handlePointHover = (index: number) => {
    setActivePoint(index);
    
    // Update details card position
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      setDetailsPosition({
        x: rect.left + pointPositions[index].x,
        y: rect.top + pointPositions[index].y
      });
      
      // Only show details if not in persistent mode
      if (!isPersistent) {
        // Show details card with slight delay for better UX
        setTimeout(() => {
          setShowDetailsCard(true);
        }, 100);
      }
    }
  };
  
  // Handle mouse leave to hide details
  const handleMouseLeave = () => {
    // Only hide details if not in persistent mode
    if (!isPersistent) {
      // Hide details card when mouse leaves the chart area
      setTimeout(() => {
        setShowDetailsCard(false);
      }, 200);
    }
  };

  // Handle click on data point for persistent details view
  const handlePointClick = (index: number) => {
    setActivePoint(index);
    setShowDetailsCard(true);
    // Set a flag to make the details persist until explicitly closed
    setIsPersistent(true);
  };
  
  // Close details card
  const closeDetails = () => {
    setShowDetailsCard(false);
    setIsPersistent(false);
  };
  
  // Listen for clicks outside to close details
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (chartRef.current && !chartRef.current.contains(e.target as Node)) {
        closeDetails();
      }
    };
    
    if (showDetailsCard) {
      document.addEventListener('click', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showDetailsCard, isPersistent]);
  
  // Toggle insights details
  const toggleInsightDetails = () => {
    setShowInsightDetails(!showInsightDetails);
  };
  
  return (
    <div 
      ref={chartRef} 
      className="bg-[#121212] p-6 rounded border border-[#242424] h-full transition-standard animate-fade-in-up"
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Unsatisfied Demand %</h2>
        <div className="flex gap-2">
          <button className="bg-[#1A1A1A] px-3 py-1 rounded text-sm transition-standard hover-lift btn-glow">
            30 Days
          </button>
          <button className="bg-[#1A1A1A] px-3 py-1 rounded text-sm transition-standard hover-lift btn-glow">
            All Time
          </button>
        </div>
      </div>
      
      <div className="h-72 flex relative mb-4">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-xs text-[#858882] pr-2">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        
        <div className="absolute left-10 right-0 top-0 bottom-0 border-l border-[#242424]">
          <div className="w-full h-full relative">
            {/* Chart grid lines */}
            <div className="absolute w-full border-t border-[#242424]" style={{top: "0%"}}></div>
            <div className="absolute w-full border-t border-[#242424]" style={{top: "25%"}}></div>
            <div className="absolute w-full border-t border-[#242424]" style={{top: "50%"}}></div>
            <div className="absolute w-full border-t border-[#242424]" style={{top: "75%"}}></div>
            <div className="absolute w-full border-t border-[#242424]" style={{top: "100%"}}></div>
            
            {/* Vertical month separators */}
            <div className="absolute h-full flex justify-between w-full">
              {chartData.map((_, index) => (
                <div key={index} className="h-full border-l border-[#242424]"></div>
              ))}
            </div>
            
            {/* Line chart - using SVG for the actual line */}
            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
              <path 
                d={pathCommand} 
                stroke="#C8E972" 
                strokeWidth="2" 
                fill="none" 
                className="transition-standard"
                style={{
                  strokeDasharray: "1000",
                  strokeDashoffset: "1000",
                  animation: "dash 1.5s ease-in-out forwards"
                }}
              />
              
              {/* Data points with hover effects */}
              {pointPositions.map((point, index) => (
                <g key={index}>
                  {/* Invisible larger hit area for better hover target */}
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="15" 
                    fill="transparent" 
                    cursor="pointer"
                    onMouseEnter={() => handlePointHover(index)}
                    onClick={() => handlePointClick(index)}
                  />
                  
                  {/* Visible point circle */}
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r={activePoint === index ? "6" : "4"} 
                    fill="#C8E972" 
                    className={activePoint === index ? "animate-pulse-soft" : ""}
                    style={{
                      transition: "r 0.2s ease-in-out, filter 0.2s ease-in-out",
                      filter: activePoint === index ? "drop-shadow(0 0 3px rgba(200, 233, 114, 0.7))" : "none",
                      opacity: 0,
                      animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s forwards`
                    }}
                  />
                  
                  {/* Vertical reference line for active point */}
                  {activePoint === index && (
                    <line 
                      x1={point.x} 
                      y1={point.y} 
                      x2={point.x} 
                      y2={height} 
                      stroke="#C8E972" 
                      strokeWidth="1" 
                      strokeDasharray="4" 
                      className="animate-fade-in"
                    />
                  )}
                </g>
              ))}
              
              {/* Simple tooltip for active point */}
              {activePoint !== null && (
                <g className="animate-fade-in">
                  <rect
                    x={pointPositions[activePoint].x - 25}
                    y={pointPositions[activePoint].y - 25}
                    width="50"
                    height="20"
                    rx="4"
                    fill="#242424"
                    className="animate-fade-in-up"
                  />
                  <text
                    x={pointPositions[activePoint].x}
                    y={pointPositions[activePoint].y - 12}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    className="animate-fade-in"
                  >
                    {chartData[activePoint].formatted}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between px-10 text-xs text-[#858882]">
        {chartData.map((item, index) => (
          <span key={index}>{item.month}</span>
        ))}
      </div>
      
      {/* Information display below chart */}
      <div className="mt-6 bg-[#1A1A1A] p-4 rounded border border-[#242424] transition-standard hover-glow cursor-pointer" onClick={toggleInsightDetails}>
        <div className="flex items-start gap-2">
          <div className="p-1 rounded-full bg-[#C8E972] mt-1"></div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white mb-1">Key Insights</h3>
              <div className="text-xs text-[#858882]">Click to {showInsightDetails ? 'collapse' : 'expand'}</div>
            </div>
            <p className="text-[#858882] text-sm">
              The unsatisfied demand decreased significantly in October, suggesting that recent infrastructure improvements are yielding positive results. Consider maintaining the current strategy.
            </p>
            
            {showInsightDetails && (
              <div className="mt-4 pt-4 border-t border-[#242424] animate-fade-in">
                <h4 className="text-sm font-medium text-white mb-2">Detailed Analysis</h4>
                <ul className="space-y-2 text-[#858882] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8E972]">•</span>
                    <span>Infrastructure efficiency increased by 24% between September and October.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8E972]">•</span>
                    <span>Average charging times decreased from 42 to 36 minutes per session.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C8E972]">•</span>
                    <span>Utilization rates are more balanced across all stations, indicating better distribution.</span>
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-[#242424]">
                  <h4 className="text-sm font-medium text-white mb-2">Recommendations</h4>
                  <p className="text-[#858882] text-sm">
                    Continue with current infrastructure deployment while monitoring November performance. Consider expanding the most efficient station configurations to other locations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Data point details card */}
      <DataPointDetails 
        point={activePoint !== null ? chartData[activePoint] : null} 
        position={detailsPosition}
        isVisible={showDetailsCard && activePoint !== null}
      />
    </div>
  );
};

export default EnhancedChart; 