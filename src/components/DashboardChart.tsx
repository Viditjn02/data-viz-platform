import React from "react";
import { colors, chartColors } from "../theme/colors";

export const DashboardChart = () => {
  const data = [20, 45, 28, 80, 99, 43, 50];
  const labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  // Find max value for scaling
  const maxValue = Math.max(...data);

  return (
    <div className="flex-1 bg-gray-800 rounded border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Graphs</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">Unsatisfied Demand %</span>
        </div>
      </div>
      
      <div className="border border-gray-700 rounded bg-gray-800 p-4">
        {/* Simple chart representation */}
        <div className="h-56 flex items-end justify-between gap-2">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-8 bg-blue-500 rounded-t"
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  backgroundColor: chartColors.line || '#3b82f6'
                }}
              />
              <span className="text-xs text-gray-400 mt-2">{labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
