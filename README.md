# Data Visualization Platform

A React-based dashboard for visualizing charging station data with interactive charts and variable selection.

## Features

- **Interactive Dashboard:** Chart visualization with data point hover interaction
- **Variable Editing:** Slide-over modal for adjusting data visualization parameters
- **Data Point Details:** Detailed context card appears when hovering over chart points
- **Authentication:** Firebase-style login/logout functionality
- **Responsive Design:** Works across desktop, tablet, and mobile devices

## Technology Stack

- **React 18+** with **TypeScript**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **Vite** for development and building

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm

### Installation

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

### Authentication

- For demo purposes, use the following credentials:
  - Email: `demo@example.com`
  - Password: `password`

## Project Structure

```
data-viz-platform/
├── src/
│   ├── auth/           # Authentication related components
│   ├── components/     # Reusable components
│   ├── screens/        # Main screen components
│   ├── theme/          # Colors and theming
│   ├── App.tsx         # Main app component with routing
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── index.html          # HTML template
```

## Key Interactions

1. **Dashboard Screen**
   - Main data visualization with chart and KPI cards
   - Variables panel with adjustable parameters

2. **Variable Editing Modal**
   - Appears when clicking "Edit Variables" button
   - Allows selecting/deselecting variables for visualization

3. **Data Point Hover Interaction**
   - When hovering over a data point in the chart, a detailed information card appears
   - Includes comparison data and recommended actions

## Technical Decisions

- Used React's Context API for authentication state management
- Created a component-based architecture for better maintainability
- Implemented detailed TypeScript interfaces for type safety
- Used SVG for chart visualization rather than a third-party library for better customization

## Known Limitations

- Uses mock data for visualization; would need to connect to a real API in production
- Authentication is simulated; real implementation would use Firebase or similar
- Responsive design could be improved for very small mobile screens

## Development Notes

- Time spent: 8-10 hours
- Focus areas:
  - Interactive component behavior
  - Clean, maintainable code
  - Pixel-perfect recreation of the design

## Future Improvements

- Add more chart types (bar chart, pie chart)
- Implement real-time data fetching
- Add data export functionality
- Improve accessibility
