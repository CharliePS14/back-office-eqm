// API exports
export { DashboardApiClient } from "./api/dashboard-client";
export { DashboardService } from "./api/dashboard.service";

// Types exports
export type {
  DashboardSummary,
  StockPlan,
  StockPlansResume,
  StockAssignment,
  StockBreakdown,
  ContractType,
  PaymentFrequency,
  VestingScheduleStatus,
  ApiResponse,
  PaginatedResponse,
} from "./types/dashboard";

// Hooks exports
export {
  useDashboardSummary,
  useStockPlans,
  useStockPlan,
} from "./hooks/use-dashboard";

// UI exports
export { LoadingCard, LoadingStats } from "./ui/loading";
export { ErrorDisplay } from "./ui/error-display";
