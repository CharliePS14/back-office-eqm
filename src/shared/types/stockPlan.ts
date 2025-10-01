export interface Contract {
  employee_id: string;
  employee_external_id: string;
  employee_last_name: string;
  employee_middle_name: string;
  employee_name: string;
  contract_name: string;
  contract_id: string;
  stock_plan_name: string;
  stock_plan_id: string;
  contract_external_id: string;
  contract_type: "peu" | "rsu";
  assignment_date: string;
  payment_frequency: "monthly" | "quarterly" | "yearly" | "triennial";
  vesting_schedule_status: "pending" | "in_progress" | "released" | "expired";
}

export interface StockPlanDetail {
  stock_plan_id: string;
  stock_plan_name: string;
  external_id: string;
  title: string;
  total_non_vestedshares: number;
  contracts: Contract[];
  summary: {
    total_contracts: number;
    active_contracts: number;
    total_employees: number;
    breakdown_by_type: {
      peu: number;
      rsu: number;
    };
    breakdown_by_status: {
      pending: number;
      in_progress: number;
      released: number;
      expired: number;
    };
  };
}

export interface StockPlanDetailResponse {
  data: StockPlanDetail;
  success: boolean;
  message?: string;
  timestamp: string;
}
