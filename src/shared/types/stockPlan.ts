export interface Contract {
  employeeId: string;
  employeeExternalId: string;
  employeeLastName: string;
  employeeMiddleName: string;
  employeeName: string;
  contractName: string;
  contractId: string;
  stockPlanName: string;
  stockPlanId: string;
  contractExternalId: string;
  contractType: "peu" | "rsu";
  assignmentDate: string;
  paymentFrequency: "monthly" | "quarterly" | "yearly" | "triennial";
  vestingScheduleStatus: "pending" | "in_progress" | "released" | "expired";
}

export interface StockPlanDetail {
  stockPlanId: string;
  stockPlanName: string;
  externalId: string;
  title: string;
  totalNonVestedShares: number;
  contracts: Contract[];
  summary: {
    totalContracts: number;
    activeContracts: number;
    totalEmployees: number;
    breakdownByType: {
      peu: number;
      rsu: number;
    };
    breakdownByStatus: {
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
