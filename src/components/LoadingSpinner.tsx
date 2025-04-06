import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullscreen?: boolean;
  text?: string;
}

/**
 * LoadingSpinner - A reusable spinner component for loading states
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#C8E972',
  fullscreen = false,
  text
}) => {
  // Size mapping
  const sizeMap = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeMap[size]} rounded-full border-t-transparent animate-spin`}
        style={{ 
          borderColor: `${color}33`, 
          borderTopColor: color
        }}
      ></div>
      {text && <p className="mt-2 text-sm text-[#858882]">{text}</p>}
    </div>
  );
  
  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-[#0E0D0D] bg-opacity-80 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner; 