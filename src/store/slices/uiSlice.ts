import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  activeTab: string;
  searchQuery: string;
  showNotifications: boolean;
  notificationCount: number;
  showBestScenario: boolean;
  isEditModalOpen: boolean;
  showLogoutPopup: boolean;
}

const initialState: UiState = {
  activeTab: 'Charging Stations',
  searchQuery: '',
  showNotifications: false,
  notificationCount: 3,
  showBestScenario: true,
  isEditModalOpen: false,
  showLogoutPopup: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
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
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
    toggleLogoutPopup: (state) => {
      state.showLogoutPopup = !state.showLogoutPopup;
    },
    clearNotifications: (state) => {
      state.notificationCount = 0;
    },
  },
});

export const {
  setActiveTab,
  setSearchQuery,
  toggleNotifications,
  setNotificationCount,
  toggleBestScenario,
  openEditModal,
  closeEditModal,
  toggleLogoutPopup,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer; 