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
  stockPlanId: string;
  externalId: string;
  type: ContractType;
  symbol: string;
  title: string;
  description: string;
  totalShares: number;
  totalVestedShares: number;
  totalNonVestedshares: number;
}

export interface DashboardSummary {
  stockPlans: StockPlan[];
  totalVestedShares: number;
  totalNonVestedShares: number;
  totalAssignedShares: number;
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
