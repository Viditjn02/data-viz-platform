import React from "react";
import { colors } from "../theme/colors";

interface StatCardProps {
  title: string;
  description: string;
  value: string;
}

const StatCard = ({ title, description, value }: StatCardProps) => (
  <div className="flex-1 min-w-[48%] bg-gray-800 rounded border border-gray-700 p-6">
    <div className="flex items-center gap-2 mb-2">
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </div>
    <p className="text-xs text-gray-400 mb-8">{description}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

export const DashboardStats = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Key Performance Indicators</h2>
      <div className="flex flex-wrap gap-4">
        <StatCard
          title="Infrastructure Units"
          description="This describes variable two and what the shown data means."
          value="€421.07"
        />
        <StatCard
          title="Charging Growth"
          description="This describes variable two and what the shown data means."
          value="33.07"
        />
        <StatCard
          title="Localization change"
          description="This describes variable two and what the shown data means."
          value="21.9%"
        />
        <StatCard
          title="Fleet growth"
          description="This describes variable two and what the shown data means."
          value="7.03%"
        />
      </div>
    </div>
  );
};
