import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { colors } from "../theme/colors";
import EnhancedChart from "../components/EnhancedChart";
import VariablesPanel from "../components/VariablesPanel";

const LightningIcon = () => (
  <svg width={24} height={24} viewBox="0 0 30 30" fill="none">
    <path
      d="M13.75 18.75H7.5L16.25 1.25V11.25H22.5L13.75 28.75V18.75Z"
      fill="white"
    />
  </svg>
);

const HomeIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="white" />
  </svg>
);

const NotificationIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5 19V5H19V19H5Z" fill="white" />
    <path d="M7 7H9V9H7V7Z" fill="white" />
    <path d="M7 11H9V13H7V11Z" fill="white" />
    <path d="M7 15H9V17H7V15Z" fill="white" />
    <path d="M11 7H17V9H11V7Z" fill="white" />
    <path d="M11 11H17V13H11V11Z" fill="white" />
    <path d="M11 15H17V17H11V15Z" fill="white" />
  </svg>
);

const SettingsIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.91 7.63 6.29L5.24 5.33C5.02 5.26 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.74 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="white" />
  </svg>
);

const UserIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white" />
  </svg>
);

const InfoIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="#858882" />
  </svg>
);

const HistoryIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="white" />
  </svg>
);

const MoreVertIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="white" />
  </svg>
);

const UpIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" fill="#C8E972" />
  </svg>
);

const DownIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#C8E972" />
  </svg>
);

const ShareIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="white" />
  </svg>
);

const PlusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" />
  </svg>
);

// New icons for Edit Variables modal
const SearchIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#858882" />
  </svg>
);

const CloseIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="white" />
  </svg>
);

const AutofillIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="white" />
  </svg>
);

const RerunIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="#C8E972" />
  </svg>
);

const InfoCircleIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 17H13V11H11V17ZM11 9H13V7H11V9Z" fill="white" opacity="0.5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#C8E972" />
  </svg>
);

// Types for the Edit Variables Modal props
interface VariableItem {
  id: string;
  name: string;
  description: string;
  active: boolean;
  category: string;
}

interface EditVariablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  variables: VariableItem[];
  setVariables: React.Dispatch<React.SetStateAction<VariableItem[]>>;
}

// Edit Variables Modal Component
const EditVariablesModal: React.FC<EditVariablesModalProps> = ({ isOpen, onClose, variables, setVariables }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariableId, setSelectedVariableId] = useState<string | null>(null);
  
  // Get selected variable details
  const selectedVariable = selectedVariableId 
    ? variables.find(v => v.id === selectedVariableId) 
    : null;
  
  // Filter variables based on search query
  const filteredVariables = variables.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group variables by category
  const groupedVariables = filteredVariables.reduce<Record<string, VariableItem[]>>((acc, variable) => {
    if (!acc[variable.category]) {
      acc[variable.category] = [];
    }
    acc[variable.category].push(variable);
    return acc;
  }, {});
  
  // Toggle variable active state
  const toggleVariable = (id: string) => {
    setVariables(variables.map(variable => 
      variable.id === id 
        ? { ...variable, active: !variable.active } 
        : variable
    ));
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className={`relative w-screen max-w-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col bg-[#0E0D0D] shadow-xl overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#242424]">
              <h2 className="text-2xl font-semibold text-white">Edit Variables</h2>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-[#242424]">
                <CloseIcon />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Search and Actions */}
              <div className="flex gap-4 flex-wrap">
                <div className="relative flex-grow">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchIcon />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search variables..." 
                    className="bg-[#1A1A1A] text-white pl-10 pr-4 py-2 rounded w-full border border-[#242424] focus:outline-none" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="px-4 py-2 bg-[#1A1A1A] rounded border border-[#242424] text-[#C8E972]"
                  onClick={() => setVariables(variables.map(v => ({ ...v, active: true })))}
                >
                  Select All
                </button>
                <button 
                  className="px-4 py-2 bg-[#1A1A1A] rounded border border-[#242424] text-white"
                  onClick={() => setVariables(variables.map(v => ({ ...v, active: false })))}
                >
                  Clear All
                </button>
              </div>

              {/* Variables Selection */}
              <div className="bg-[#121212] rounded border border-[#242424] p-6 overflow-y-auto">
                {Object.entries(groupedVariables).map(([category, items]) => (
                  <div key={category} className="mb-8 last:mb-0">
                    <h3 className="text-lg font-medium text-white mb-4">{category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {items.map(variable => (
                        <button 
                          key={variable.id}
                          className={`px-4 py-2 rounded border flex items-center gap-2 transition-colors ${
                            variable.active 
                              ? 'bg-[#121212] border-[#C8E972] text-[#C8E972]' 
                              : 'bg-[#1A1A1A] border-[#242424] text-white hover:bg-[#242424]'
                          }`}
                          onClick={() => toggleVariable(variable.id)}
                          onMouseEnter={() => setSelectedVariableId(variable.id)}
                        >
                          <span>{variable.name}</span>
                          <span className="text-[#858882]">⋮</span>
                          <span>{variable.active ? '✓' : '+'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {Object.keys(groupedVariables).length === 0 && (
                  <div className="text-center py-8 text-[#858882]">
                    No variables match your search. Try a different query.
                  </div>
                )}
              </div>

              {/* Selected Variable Details */}
              {selectedVariable && (
                <div className="bg-[#121212] rounded border border-[#242424] p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-xl font-medium text-white">{selectedVariable.name}</h3>
                    <InfoCircleIcon />
                  </div>
                  <p className="text-[#858882]">
                    {selectedVariable.description}
                  </p>
                  <div className="mt-4 flex">
                    <button 
                      className={`px-4 py-2 rounded border mr-4 ${
                        selectedVariable.active 
                          ? 'bg-[#121212] border-[#C8E972] text-[#C8E972]' 
                          : 'bg-[#1A1A1A] border-[#242424] text-white'
                      }`}
                      onClick={() => toggleVariable(selectedVariable.id)}
                    >
                      {selectedVariable.active ? 'Active' : 'Inactive'}
                    </button>
                    <div className="text-[#858882] flex items-center">
                      Click to {selectedVariable.active ? 'disable' : 'enable'} this variable
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Charging Stations');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showBestScenario, setShowBestScenario] = useState(true);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { user, logout } = useAuth();
  
  // Define variables state at the parent level to share between components
  const [variables, setVariables] = useState<VariableItem[]>([
    { id: '1', name: 'CO2 Distribution', description: 'Carbon dioxide distribution across charging stations', active: true, category: 'Environmental' },
    { id: '2', name: 'Fleet Sizing', description: 'Number of vehicles in the fleet', active: true, category: 'Operations' },
    { id: '3', name: 'Border Rate', description: 'Rate at which vehicles cross defined zones', active: true, category: 'Operations' },
    { id: '4', name: 'Request Rate', description: 'Frequency of charging requests', active: false, category: 'User Demand' },
    { id: '5', name: 'Battery Efficiency', description: 'Efficiency of the battery charging cycle', active: false, category: 'Environmental' },
    { id: '6', name: 'Utilization Rate', description: 'Rate of station utilization throughout the day', active: false, category: 'Operations' },
    { id: '7', name: 'Peak Hours', description: 'Hours with highest demand for charging', active: false, category: 'User Demand' },
    { id: '8', name: 'Energy Source Mix', description: 'Composition of energy sources used for charging', active: false, category: 'Environmental' },
  ]);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Toggle logout popup
  const toggleLogoutPopup = () => {
    setShowLogoutPopup(!showLogoutPopup);
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    setShowLogoutPopup(false);
  };

  // Handle main navigation tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Toggle notifications panel
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Clear notification count when opening
    if (!showNotifications) {
      setNotificationCount(0);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Toggle best scenario section visibility
  const toggleBestScenario = () => {
    setShowBestScenario(!showBestScenario);
  };

  // Handle sharing dashboard
  const handleShare = () => {
    alert("Sharing options would open here. Would you like to share via email, link, or export as PDF?");
  };

  // Handle KPI variables button
  const handleAddKpiVariable = () => {
    alert("This would open a modal to add a new KPI variable to the dashboard");
  };

  // Handle projects navigation
  const navigateToProjects = () => {
    alert("This would navigate to the Projects page");
  };

  // Handle settings
  const openSettings = () => {
    alert("This would open the Settings page");
  };

  // Handle best scenario option menu
  const openScenarioMenu = (scenario: string) => {
    alert(`Options for scenario "${scenario}": View details, Export, Save as favorite`);
  };

  return (
    <div className="flex h-screen bg-[#0E0D0D] text-white">
      {/* Sidebar */}
      <div className="w-16 bg-[#121212] flex flex-col items-center py-4 space-y-8">
        <button className="p-2 hover:bg-[#1A1A1A] rounded transition-colors" title="Menu">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="white" />
          </svg>
        </button>
        <button 
          className={`p-2 ${activeTab === 'Charging Stations' ? 'bg-[#242424]' : 'hover:bg-[#1A1A1A]'} rounded transition-colors`} 
          title="Dashboard"
        >
          <HomeIcon />
        </button>
        <button 
          className="p-2 hover:bg-[#1A1A1A] rounded transition-colors relative" 
          title="Notifications"
          onClick={handleToggleNotifications}
        >
          <NotificationIcon />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
        <button 
          className="p-2 hover:bg-[#1A1A1A] rounded transition-colors" 
          title="Projects"
          onClick={navigateToProjects}
        >
          <ProjectsIcon />
        </button>
        <button 
          className="p-2 hover:bg-[#1A1A1A] rounded transition-colors" 
          title="Settings"
          onClick={openSettings}
        >
          <SettingsIcon />
        </button>
        <div className="flex-grow"></div>
        <button 
          className="p-2 hover:bg-[#1A1A1A] rounded transition-colors relative" 
          onClick={toggleLogoutPopup} 
          title="User profile"
        >
          <UserIcon />
          {showLogoutPopup && (
            <div className="absolute bottom-12 left-0 w-32 bg-[#121212] border border-[#242424] rounded shadow-lg z-10">
              <div className="p-3 border-b border-[#242424]">
                <p className="text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-[#858882]">{user?.email || ''}</p>
              </div>
              <button 
                className="w-full text-left p-3 hover:bg-[#1A1A1A] transition-colors text-red-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="flex items-center px-4 py-2 border-b border-[#1A1A1A]">
          <button 
            className={`px-4 py-2 ${activeTab === 'Charging Stations' ? 'bg-[#1A1A1A]' : ''} rounded mr-2 transition-colors`}
            onClick={() => handleTabChange('Charging Stations')}
          >
            Charging Stations
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'Fleet Sizing' ? 'bg-[#1A1A1A]' : ''} rounded mr-2 transition-colors`}
            onClick={() => handleTabChange('Fleet Sizing')}
          >
            Fleet Sizing
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'Parking' ? 'bg-[#1A1A1A]' : ''} rounded transition-colors`}
            onClick={() => handleTabChange('Parking')}
          >
            Parking
          </button>
          <div className="flex-grow"></div>
          <div className="flex items-center gap-2">
            {user && <span className="text-sm text-[#858882]">{user.name}</span>}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" width={16} height={16} viewBox="0 0 24 24" fill="none">
                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#858882" />
              </svg>
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-[#1A1A1A] text-white pl-10 pr-4 py-2 rounded w-64 focus:outline-none" 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {/* Header with Title and Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
            <LightningIcon />
              <h1 className="text-3xl font-bold">{activeTab}</h1>
            </div>
            <div className="flex gap-2">
              <button 
                className="p-2 bg-[#1A1A1A] rounded flex items-center hover:bg-[#242424] transition-colors"
                title="History"
              >
                <HistoryIcon />
              </button>
              <button 
                className="px-4 py-2 bg-[#1A1A1A] rounded hover:bg-[#242424] transition-colors"
                onClick={openEditModal}
                title="Edit Variables"
              >
                Edit Variables
              </button>
              <button 
                className="p-2 bg-[#1A1A1A] rounded hover:bg-[#242424] transition-colors"
                onClick={handleShare}
                title="Share"
              >
                <ShareIcon />
              </button>
            </div>
          </div>

          {/* Best Scenario Results Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-semibold text-[#C8E972]">✧</span>
              <h2 className="text-2xl font-semibold text-[#C8E972]">Best Scenario Results</h2>
              <div className="flex-grow"></div>
              <button 
                className="p-1 rounded-full hover:bg-[#242424] transition-colors"
                onClick={toggleBestScenario}
                title={showBestScenario ? "Hide scenarios" : "Show scenarios"}
              >
                {showBestScenario ? <UpIcon /> : <DownIcon />}
              </button>
            </div>

            {showBestScenario && (
              <div className="space-y-4">
                <div className="p-4 rounded bg-[#121212] border border-[#242424] flex justify-between items-center">
                  <p className="text-[#C8E972]">
                    The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.
                  </p>
                  <button 
                    className="hover:bg-[#242424] rounded p-1 transition-colors"
                    onClick={() => openScenarioMenu('Profit-based scenario')}
                  >
                    <MoreVertIcon />
                  </button>
                </div>
                <div className="p-4 rounded bg-[#121212] border border-[#242424] flex justify-between items-center">
                  <p className="text-[#C8E972]">
                    The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.
                  </p>
                  <button 
                    className="hover:bg-[#242424] rounded p-1 transition-colors"
                    onClick={() => openScenarioMenu('Demand-based scenario')}
                  >
                    <MoreVertIcon />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section - Takes up 2/3 of the space */}
            <div className="lg:col-span-2">
              <EnhancedChart />
            </div>

            {/* KPI Section - Takes up 1/3 of the space */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Variables Panel - Removed */}
                
                {/* KPI Cards */}
                <div className="bg-[#121212] p-4 rounded border border-[#242424] h-[calc(100%-1rem)]">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-semibold">Key Performance Indicators</h2>
                    <button 
                      className="bg-[#1A1A1A] p-1 rounded flex items-center gap-1 hover:bg-[#242424] transition-colors"
                      onClick={handleAddKpiVariable}
                      title="Add KPI variable"
                    >
                      <span className="text-sm">Variables</span>
                      <PlusIcon />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* KPI Card 1 */}
                    <div className="bg-[#1A1A1A] p-3 rounded border border-[#242424]">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">Infrastructure Units</h3>
                        <button className="hover:opacity-75 transition-opacity" title="More information">
                          <InfoIcon />
                        </button>
                      </div>
                      <p className="text-xs text-[#858882] mb-3">This describes variable two and what the shown data means.</p>
                      <p className="text-3xl font-bold">€421.07</p>
                    </div>
                    
                    {/* KPI Card 2 */}
                    <div className="bg-[#1A1A1A] p-3 rounded border border-[#242424]">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">Charging Growth</h3>
                        <button className="hover:opacity-75 transition-opacity" title="More information">
                          <InfoIcon />
                        </button>
                      </div>
                      <p className="text-xs text-[#858882] mb-3">This describes variable two and what the shown data means.</p>
                      <p className="text-3xl font-bold">33.07</p>
                    </div>
                    
                    {/* KPI Card 3 */}
                    <div className="bg-[#1A1A1A] p-3 rounded border border-[#242424]">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">Localization change</h3>
                        <button className="hover:opacity-75 transition-opacity" title="More information">
                          <InfoIcon />
                        </button>
                      </div>
                      <p className="text-xs text-[#858882] mb-3">This describes variable two and what the shown data means.</p>
                      <p className="text-3xl font-bold">21.9%</p>
                    </div>
                    
                    {/* KPI Card 4 */}
                    <div className="bg-[#1A1A1A] p-3 rounded border border-[#242424]">
                      <div className="flex justify-between mb-1">
                        <h3 className="font-medium">Fleet growth</h3>
                        <button className="hover:opacity-75 transition-opacity" title="More information">
                          <InfoIcon />
                        </button>
                      </div>
                      <p className="text-xs text-[#858882] mb-3">This describes variable two and what the shown data means.</p>
                      <p className="text-3xl font-bold">7.03%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 top-16 w-80 bg-[#121212] border border-[#242424] rounded shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Notifications</h3>
            <button 
              className="text-xs text-[#C8E972] hover:underline"
              onClick={() => setShowNotifications(false)}
            >
              Close
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-2 border-b border-[#242424]">
              <p className="text-sm">New scenario calculation completed</p>
              <p className="text-xs text-[#858882]">2 minutes ago</p>
            </div>
            <div className="p-2 border-b border-[#242424]">
              <p className="text-sm">System update available</p>
              <p className="text-xs text-[#858882]">1 hour ago</p>
            </div>
            <div className="p-2">
              <p className="text-sm">Monthly report is ready</p>
              <p className="text-xs text-[#858882]">Yesterday</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Variables Modal */}
      <EditVariablesModal 
        isOpen={isEditModalOpen} 
        onClose={closeEditModal} 
        variables={variables}
        setVariables={setVariables}
      />
    </div>
  );
};

export default HomeScreen;
