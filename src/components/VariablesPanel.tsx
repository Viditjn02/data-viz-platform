import React, { useState } from 'react';

interface VariableItem {
  id: string;
  name: string;
  description: string;
  active: boolean;
  category: string;
}

interface VariablesPanelProps {
  onEditVariables: () => void;
  activeVariables?: VariableItem[]; // Added prop to receive active variables from parent
}

/**
 * VariablesPanel - Component that displays a list of active variables
 * with a button to open the edit modal for full variable management
 */
const VariablesPanel: React.FC<VariablesPanelProps> = ({ 
  onEditVariables,
  activeVariables = [
    { id: '1', name: 'CO2 Distribution', description: 'Carbon dioxide distribution across charging stations', active: true, category: 'Environmental' },
    { id: '2', name: 'Fleet Sizing', description: 'Number of vehicles in the fleet', active: true, category: 'Operations' },
    { id: '3', name: 'Border Rate', description: 'Rate at which vehicles cross defined zones', active: true, category: 'Operations' },
  ]
}) => {
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);

  // Group variables by category - only show active variables
  const groupedVariables = activeVariables
    .filter(v => v.active)
    .reduce((acc, variable) => {
      if (!acc[variable.category]) {
        acc[variable.category] = [];
      }
      acc[variable.category].push(variable);
      return acc;
    }, {} as Record<string, VariableItem[]>);

  // Handle variable hover to show contextual information
  const handleVariableHover = (id: string | null) => {
    setHoveredVariable(id);
  };

  return (
    <div className="bg-[#121212] rounded border border-[#242424] p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Variables Panel</h2>
        <button 
          onClick={onEditVariables}
          className="bg-[#1A1A1A] px-3 py-1 rounded text-white hover:bg-[#242424] transition-colors"
        >
          Edit Variables
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedVariables).map(([category, items]) => (
          <div key={category} className="border-t border-[#242424] pt-3 first:border-t-0 first:pt-0">
            <h3 className="text-sm text-[#858882] mb-2">{category}</h3>
            <div className="space-y-2">
              {items.map(variable => (
                <div 
                  key={variable.id}
                  className="relative"
                  onMouseEnter={() => handleVariableHover(variable.id)}
                  onMouseLeave={() => handleVariableHover(null)}
                >
                  <div 
                    className="flex items-center justify-between p-2 rounded bg-[#0E0D0D] border border-[#C8E972] text-[#C8E972]"
                  >
                    <span>{variable.name}</span>
                    <span>✓</span>
                  </div>

                  {/* Hover tooltip with contextual information */}
                  {hoveredVariable === variable.id && (
                    <div className="absolute z-10 left-full ml-2 top-0 w-64 bg-[#1A1A1A] p-3 rounded border border-[#242424] shadow-lg animate-fade-in">
                      <h4 className="font-medium text-white mb-1">{variable.name}</h4>
                      <p className="text-xs text-[#858882] mb-2">{variable.description}</p>
                      <div className="text-xs text-white">
                        <p>Status: <span className="text-[#C8E972]">Active</span></p>
                        <p className="mt-1">Click "Edit Variables" to modify</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariablesPanel; 