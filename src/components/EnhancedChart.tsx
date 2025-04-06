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
      
      // Show details card with slight delay for better UX
      setTimeout(() => {
        setShowDetailsCard(true);
      }, 100);
    }
  };
  
  // Handle mouse leave to hide details
  const handleMouseLeave = () => {
    // Add a delay before hiding the details to prevent flicker when moving between points
    setTimeout(() => {
      if (activePoint === null) {
        setShowDetailsCard(false);
      }
    }, 100);
  };

  // Handle click on data point for persistent details view
  const handlePointClick = (index: number) => {
    setActivePoint(index);
    setShowDetailsCard(true);
  };
  
  // Close details card
  const closeDetails = () => {
    setShowDetailsCard(false);
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
  }, [showDetailsCard]);
  
  return (
    <div className="bg-[#121212] rounded border border-[#242424] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Graphs</h2>
        <div className="relative">
          <select className="appearance-none bg-[#1A1A1A] text-white px-4 py-2 pr-8 rounded border border-[#242424] focus:outline-none">
            <option>{title}</option>
            <option>Revenue Growth</option>
            <option>Energy Consumption</option>
          </select>
          <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10H7Z" fill="white" />
          </svg>
        </div>
      </div>

      <div className="h-[300px] relative" ref={chartRef} onMouseLeave={handleMouseLeave}>
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-[#858882]">
          <span>$100K</span>
          <span>$80K</span>
          <span>$60K</span>
          <span>$40K</span>
          <span>$20K</span>
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
              <path d={pathCommand} stroke="#C8E972" strokeWidth="2" fill="none" />
              
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
                    className={activePoint === index ? "animate-pulse" : ""}
                    style={{
                      transition: "r 0.2s ease-in-out",
                      filter: activePoint === index ? "drop-shadow(0 0 3px rgba(200, 233, 114, 0.7))" : "none"
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
                    />
                  )}
                </g>
              ))}
              
              {/* Simple tooltip for active point */}
              {activePoint !== null && !showDetailsCard && (
                <foreignObject 
                  x={pointPositions[activePoint].x - 40} 
                  y={pointPositions[activePoint].y - 60} 
                  width="80" 
                  height="50"
                  style={{ overflow: "visible" }}
                >
                  <div className="bg-[#1A1A1A] text-white px-2 py-1 text-xs rounded border border-[#242424] shadow-lg">
                    <div className="font-bold">{chartData[activePoint].month}</div>
                    <div className="text-[#C8E972]">{chartData[activePoint].formatted}</div>
                  </div>
                </foreignObject>
              )}
            </svg>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute left-10 right-0 bottom-[-25px] flex justify-between text-xs text-[#858882]">
          {chartData.map((point, index) => (
            <div key={index} className="flex flex-col items-center">
              <span>{point.month}</span>
              {point.month === "May" && <span className="text-[10px]">Now</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed data point card */}
      {activePoint !== null && showDetailsCard && (
        <DataPointDetails 
          point={chartData[activePoint]} 
          position={detailsPosition}
          isVisible={showDetailsCard}
        />
      )}
    </div>
  );
};

export default EnhancedChart; 