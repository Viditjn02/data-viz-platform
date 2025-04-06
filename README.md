# Data Visualization Platform

A modern, interactive dashboard for visualizing charging station data with detailed charts, variable selection, and various UI enhancements for clean energy and transportation insights.

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Component System](#component-system)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Error Handling & Loading States](#error-handling--loading-states)
- [Animation System](#animation-system)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

## 🔍 Overview

This platform provides interactive data visualization tools for analyzing charging station performance, fleet management, and energy consumption patterns. The dashboard presents complex data in an intuitive interface with dynamic charts, KPI cards, and adjustable variables.

## ✨ Features

- **Interactive Dashboard**: Chart visualization with animated transitions and data point interactions
- **Custom Variables Panel**: Configure which data points are displayed through an interactive selection interface
- **Responsive UI**: Adapts to desktop, tablet, and mobile devices with consistent UX
- **Advanced Interactions**:
  - Detailed tooltips on chart hover with contextual information
  - KPI cards with trend indicators and clickable data points
  - Notification system with different severity levels
  - Smooth animations throughout the interface
- **Authentication**: Secure login system with protected routes
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Loading States**: Visual feedback during data operations

## 🏗️ Architecture

This application follows a modern React architecture with these key decisions:

- **Component Composition**: Modular component system with clear separation of concerns
- **Redux State Management**: Centralized state using Redux Toolkit with slices for different domains
- **CSS**: Tailwind CSS for styling with custom animation utilities
- **Routing**: React Router v7 for navigation with route protection
- **Error Management**: Global error boundary with component-level error handling
- **Notification System**: Toast-style notifications with severity levels and animations
- **Type Safety**: Comprehensive TypeScript typing throughout the application

## 📁 Project Structure

```
data-viz-platform/
├── src/
│   ├── auth/               # Authentication components and context
│   │   └── AuthProvider.tsx
│   ├── components/         # Reusable UI components
│   │   ├── EnhancedChart.tsx     # Interactive chart with animations
│   │   ├── ErrorBoundary.tsx     # Global error catching
│   │   ├── ErrorMessage.tsx      # Toast notifications
│   │   ├── LoadingSpinner.tsx    # Loading indicators
│   │   ├── DataPointDetails.tsx  # Chart tooltip components
│   │   └── VariablesPanel.tsx    # Variable selection UI
│   ├── hooks/              # Custom React hooks
│   │   ├── useLoadingState.ts    # Loading state management
│   │   └── useNotification.ts    # Notification management
│   ├── screens/            # Page components
│   │   ├── HomeScreen.tsx        # Main dashboard
│   │   └── LoginScreen.tsx       # Authentication screen
│   ├── store/              # Redux state management
│   │   ├── index.ts              # Store configuration
│   │   └── slices/               # Redux slices
│   │       ├── authSlice.ts      # Authentication state
│   │       ├── dashboardSlice.ts # Dashboard and chart data
│   │       └── uiSlice.ts        # UI state (modals, notifications)
│   ├── theme/              # Styling constants and theme configuration
│   ├── App.tsx             # Main application component with routing
│   ├── firebase.ts         # Firebase configuration
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
└── index.html              # HTML template
```

## 🚀 Setup and Installation

### Prerequisites

- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/data-viz-platform.git
cd data-viz-platform
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Access the application at `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Technologies Used

- **React 19**: Framework for UI components
- **TypeScript 5.7**: Type-safe JavaScript development
- **Redux Toolkit**: State management 
- **React Router 7**: Routing and navigation
- **Firebase**: Authentication services
- **Tailwind CSS 4**: Utility-first CSS framework
- **Vite 6**: Fast build tool and development server

## 🧩 Component System

### Key Components

- **EnhancedChart**: Interactive SVG-based chart with data point interactions, tooltips, and animations
- **VariablesPanel**: Selection interface for data variables with grouping and search
- **ErrorBoundary**: Catches JavaScript errors and displays fallback UI
- **ErrorMessage**: Toast notification system with multiple severity levels
- **LoadingSpinner**: Loading indicator with customizable size and text

### Modal System

The platform uses a modal system for various interactions:

- **EditVariablesModal**: Comprehensive interface for managing data variables
- **Confirmation Dialogs**: Used for destructive actions like logout

## 🔄 State Management

The application uses Redux Toolkit for state management, divided into logical slices:

### Redux Slices

- **authSlice**: Manages user authentication state
- **dashboardSlice**: Handles dashboard data, charts, KPIs, and variables
- **uiSlice**: Controls UI state like modals, notifications, and loading states

### Custom Hooks

- **useLoadingState**: Manages loading indicators for async operations
- **useNotification**: Provides methods for showing different types of notifications

## 🔒 Authentication

The platform uses Firebase for authentication with these features:

- **Protected Routes**: Prevents unauthorized access to dashboard
- **Persistent Sessions**: Maintains login state across page refreshes
- **Login/Logout Flow**: Clean authentication interface

### Demo Credentials

For testing purposes, use:
- Email: `demo@example.com`
- Password: `password`

## ⚠️ Error Handling & Loading States

### Error Handling Strategy

1. **Global Error Boundary**: Catches unhandled errors at the application level
2. **Component-Level Handling**: Try/catch blocks for async operations
3. **Toast Notifications**: User-friendly error messages with severity levels

### Loading State Management

- **Global Loading Indicator**: For application-wide operations
- **Component-Specific Loaders**: For localized loading states
- **Loading Overlay**: For blocking operations

## 🎭 Animation System

The platform includes a comprehensive animation system for smooth interactions:

- **Page Transitions**: Fade effects when navigating between routes
- **Chart Animations**: Animated data lines and points with staggered reveals
- **Notification Animations**: Slide and fade animations for toast messages
- **Hover Effects**: Subtle scaling and glow effects on interactive elements

Custom animations are defined in `index.css` with utility classes for consistent application.

## ⚠️ Known Limitations

- Uses mock data for visualization; requires real API integration for production
- Authentication is implemented with basic Firebase; may need enhanced security for production
- Notifications automatically dismiss themselves, which might not be ideal for critical errors
- Limited chart types (currently only line charts)

## 🚀 Future Improvements

- **Additional Chart Types**: Bar charts, pie charts, heat maps, etc.
- **Data Export**: CSV/Excel export functionality for reports
- **Real-time Updates**: WebSocket integration for live data updates
- **Enhanced Filtering**: More advanced filtering options for data visualization
- **Customizable Dashboard**: Drag-and-drop arrangement of dashboard components
- **Multi-language Support**: Internationalization infrastructure
- **Dark/Light Theme Toggle**: Theme switching capability
- **Accessibility Improvements**: Enhanced keyboard navigation and ARIA support
- **Offline Support**: Service worker integration for offline capabilities

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
