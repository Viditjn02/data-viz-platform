import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for notifications
export type NotificationSeverity = 'error' | 'warning' | 'info' | 'success';

export interface Notification {
  id: string;
  message: string;
  severity: NotificationSeverity;
  duration?: number;
}

// Define the UI state structure
export interface UiState {
  // Loading states for different operations
  loadingStates: {
    [key: string]: boolean;
  };
  // Error notifications
  notifications: Notification[];
  // UI control states
  showUserMenu: boolean;
  showNotifications: boolean;
  notificationCount: number;
  showBestScenario: boolean;
  activeTab: string;
  searchQuery: string;
  isEditModalOpen: boolean;
}

// Initial state
const initialState: UiState = {
  loadingStates: {},
  notifications: [],
  showUserMenu: false,
  showNotifications: false,
  notificationCount: 3,
  showBestScenario: false,
  activeTab: 'Charging Stations',
  searchQuery: '',
  isEditModalOpen: false,
};

// Create the UI slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Loading state management
    setLoading: (state, action: PayloadAction<{ key: string; isLoading: boolean }>) => {
      const { key, isLoading } = action.payload;
      state.loadingStates[key] = isLoading;
    },
    
    // Notification management
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        id,
        ...action.payload,
      });
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // UI control actions
    toggleUserMenu: (state) => {
      state.showUserMenu = !state.showUserMenu;
    },
    
    setUserMenu: (state, action: PayloadAction<boolean>) => {
      state.showUserMenu = action.payload;
    },
    
    toggleNotifications: (state) => {
      state.showNotifications = !state.showNotifications;
    },
    
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount = action.payload;
    },
    
    toggleBestScenario: (state) => {
      state.showBestScenario = !state.showBestScenario;
    },
    
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    setEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload;
    },
  },
});

// Export actions
export const {
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleUserMenu,
  setUserMenu,
  toggleNotifications,
  setNotificationCount,
  toggleBestScenario,
  setActiveTab,
  setSearchQuery,
  setEditModalOpen,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer; 