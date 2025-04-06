import React from 'react';
import { ChartDataPoint } from './EnhancedChart';

interface DataPointDetailsProps {
  point: ChartDataPoint | null;
  position: { x: number; y: number };
  isVisible: boolean;
}

/**
 * DataPointDetails - Card showing detailed information about a data point
 * This component appears when hovering over a data point in the chart
 */
const DataPointDetails: React.FC<DataPointDetailsProps> = ({ point, position, isVisible }) => {
  if (!isVisible || !point) return null;

  return (
    <div 
      className="absolute bg-[#121212] rounded border border-[#242424] shadow-lg p-4 w-64 z-10 animate-fade-in"
      style={{ 
        left: `${position.x + 20}px`,
        top: `${position.y - 120}px`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium text-white">{point.month} Details</h3>
        <span className="text-2xl font-bold text-[#C8E972]">{point.formatted}</span>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm text-[#858882]">Comparison to Previous Month</h4>
          <p className="text-white">
            {point.month === "Jul" 
              ? "100% increase from June" 
              : point.month === "Aug" 
                ? "40% decrease from July peak" 
                : "Normal fluctuation in trend"
            }
          </p>
        </div>

        <div>
          <h4 className="text-sm text-[#858882]">Contributing Factors</h4>
          <ul className="text-white text-sm list-disc pl-4">
            <li>Charge station utilization: 78%</li>
            <li>Average session duration: 42 min</li>
            <li>Peak usage hours: 10am - 2pm</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm text-[#858882]">Recommended Actions</h4>
          <p className="text-white">
            {point.month === "Jul" 
              ? "Analyze peak performance factors to replicate success" 
              : "Review variable distribution to optimize performance"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataPointDetails; 