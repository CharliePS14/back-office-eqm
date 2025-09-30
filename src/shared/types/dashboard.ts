export interface StockPlansResume {
  totalStockPlans: number;
  activeStockPlans: number;
  inactiveStockPlans: number;
}

export interface StockBreakdown {
  PEU: number;
  RSU: number;
}

export interface StockAssignment {
  total: number;
  breakdown: StockBreakdown;
}

export type ContractType = "rsu" | "peu";
export type PaymentFrequency = "monthly" | "quarterly" | "yearly" | "triennial";
export type VestingScheduleStatus =
  | "pending"
  | "in_progress"
  | "released"
  | "expired";

export interface StockPlan {
  title: string;
  stock_plan_id: string;
  external_id: string;
  contract_type: ContractType;
  symbol: string;
  description: string;
  total_shares: number;
  total_vested_shares: number;
  total_non_vestedshares: number;
}

export interface DashboardSummary {
  stockPlansResume: StockPlansResume;
  totalAssigned: StockAssignment;
  totalReleased: StockAssignment;
  totalPending: StockAssignment;
  stockPlans: StockPlan[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
