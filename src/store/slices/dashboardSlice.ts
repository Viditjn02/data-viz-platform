import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Variable item interface
export interface VariableItem {
  id: string;
  name: string;
  description: string;
  active: boolean;
  category: string;
}

// Sample data for KPI cards
interface KpiCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

// Scenario interface
interface Scenario {
  id: string;
  name: string;
  description: string;
  metrics: {
    value: number;
    label: string;
  }[];
}

// Dashboard state interface
interface DashboardState {
  variables: VariableItem[];
  kpiCards: KpiCard[];
  scenarios: Scenario[];
  selectedScenario: string | null;
  loading: boolean;
  error: string | null;
}

// Generate sample variables data
const sampleVariables: VariableItem[] = [
  { id: 'v1', name: 'Charging Capacity', description: 'Maximum charging capacity in kW', active: true, category: 'Charging' },
  { id: 'v2', name: 'Fleet Size', description: 'Number of vehicles in operation', active: true, category: 'Fleet' },
  { id: 'v3', name: 'Peak Hours', description: 'Hours of peak demand', active: true, category: 'Demand' },
  { id: 'v4', name: 'Energy Cost', description: 'Cost per kWh', active: false, category: 'Cost' },
  { id: 'v5', name: 'Battery Capacity', description: 'Vehicle battery capacity in kWh', active: true, category: 'Fleet' },
  { id: 'v6', name: 'Charging Stations', description: 'Number of charging stations', active: true, category: 'Charging' },
  { id: 'v7', name: 'Usage Patterns', description: 'Daily usage patterns', active: false, category: 'Demand' },
  { id: 'v8', name: 'Maintenance Cost', description: 'Monthly maintenance cost', active: false, category: 'Cost' },
  { id: 'v9', name: 'Grid Capacity', description: 'Maximum grid capacity', active: true, category: 'Charging' },
  { id: 'v10', name: 'Route Optimization', description: 'Route optimization level', active: false, category: 'Efficiency' },
];

// Generate sample KPI data
const sampleKpiCards: KpiCard[] = [
  { id: 'kpi1', title: 'Avg. Charging Time', value: '45 min', change: 12, trend: 'down' },
  { id: 'kpi2', title: 'Energy Consumption', value: '245 kWh', change: 8, trend: 'up' },
  { id: 'kpi3', title: 'Peak Demand', value: '156 kW', change: 3, trend: 'up' },
  { id: 'kpi4', title: 'Daily Trips', value: '143', change: 5, trend: 'up' },
  { id: 'kpi5', title: 'Operational Cost', value: '$2,450', change: 7, trend: 'down' },
];

// Generate sample scenarios
const sampleScenarios: Scenario[] = [
  {
    id: 's1',
    name: 'Base Case',
    description: 'Current deployment without changes',
    metrics: [
      { value: 12, label: 'Stations' },
      { value: 45, label: 'Vehicles' },
      { value: 240, label: 'kWh/day' },
    ],
  },
  {
    id: 's2',
    name: 'Expanded Fleet',
    description: 'Deployment with 30% more vehicles',
    metrics: [
      { value: 18, label: 'Stations' },
      { value: 65, label: 'Vehicles' },
      { value: 350, label: 'kWh/day' },
    ],
  },
  {
    id: 's3',
    name: 'Optimized Charging',
    description: 'Smart charging with load balancing',
    metrics: [
      { value: 15, label: 'Stations' },
      { value: 45, label: 'Vehicles' },
      { value: 210, label: 'kWh/day' },
    ],
  },
];

// Initial state
const initialState: DashboardState = {
  variables: sampleVariables,
  kpiCards: sampleKpiCards,
  scenarios: sampleScenarios,
  selectedScenario: 's1',
  loading: false,
  error: null,
};

// Example async thunk for fetching dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just return the sample data after a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        variables: sampleVariables,
        kpiCards: sampleKpiCards,
        scenarios: sampleScenarios,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

// Create the slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setVariables: (state, action: PayloadAction<VariableItem[]>) => {
      state.variables = action.payload;
    },
    toggleVariableActive: (state, action: PayloadAction<string>) => {
      const variableId = action.payload;
      const variable = state.variables.find(v => v.id === variableId);
      if (variable) {
        variable.active = !variable.active;
      }
    },
    addVariable: (state, action: PayloadAction<VariableItem>) => {
      state.variables.push(action.payload);
    },
    selectScenario: (state, action: PayloadAction<string>) => {
      state.selectedScenario = action.payload;
    },
    addKpiCard: (state, action: PayloadAction<KpiCard>) => {
      state.kpiCards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.variables = action.payload.variables;
        state.kpiCards = action.payload.kpiCards;
        state.scenarios = action.payload.scenarios;
        state.loading = false;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setVariables,
  toggleVariableActive,
  addVariable,
  selectScenario,
  addKpiCard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer; 