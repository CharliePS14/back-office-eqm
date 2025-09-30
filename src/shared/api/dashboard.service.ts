import {
  DashboardSummary,
  ApiResponse,
  StockPlan,
} from "@/shared/types/dashboard";

// Simulación de datos del backend
const mockDashboardData: DashboardSummary = {
  stockPlansResume: {
    totalStockPlans: 11,
    activeStockPlans: 10,
    inactiveStockPlans: 1,
  },
  totalAssigned: {
    total: 100,
    breakdown: { PEU: 20, RSU: 80 },
  },
  totalReleased: {
    total: 5000,
    breakdown: { PEU: 1220, RSU: 3000 },
  },
  totalPending: {
    total: 300,
    breakdown: { PEU: 120, RSU: 180 },
  },
  stockPlans: [
    {
      stock_plan_id: "5150dedb-e868-41ae-9172-0291703ddb8c",
      external_id: "SP0009",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Plan 2025 RSU",
      description: "Descripción para RSU",
      total_shares: 535,
      total_vested_shares: 0,
      total_non_vestedshares: 2635,
    },
    {
      stock_plan_id: "87400338-172a-4437-9019-caf432f2c364",
      external_id: "SP0008",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "DEV - Plan 2025 PEU",
      description: "PEU",
      total_shares: 3180,
      total_vested_shares: 0,
      total_non_vestedshares: 3180,
    },
    {
      stock_plan_id: "85a62d05-66b7-4e6b-a405-b5e990c36c90",
      external_id: "SP0007",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Plan 2025 PEU",
      description: "PEU",
      total_shares: 100,
      total_vested_shares: 0,
      total_non_vestedshares: 100,
    },
    {
      stock_plan_id: "781c9744-7aef-4285-b7ba-ef0cc9bbc394",
      external_id: "RSU2025TA",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "RSU 2025 Trianual",
      description: "RSU trianual 2025",
      total_shares: 7828401,
      total_vested_shares: 0,
      total_non_vestedshares: 7828401,
    },
    {
      stock_plan_id: "cec42649-d64e-4635-90dd-d5438255bdd8",
      external_id: "RSU2024TA",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "RSU 2024 Trianual",
      description: "RSU trianual 2024",
      total_shares: 5445605,
      total_vested_shares: 2306635,
      total_non_vestedshares: 3138970,
    },
    {
      stock_plan_id: "0e30505a-2271-41ae-b794-1048f9f6a363",
      external_id: "RSU2024A",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "RSU 2024 Trianual",
      description: "RSU anual 2024",
      total_shares: 303198,
      total_vested_shares: 161969,
      total_non_vestedshares: 141229,
    },
    {
      stock_plan_id: "9d326b37-8689-47d0-acee-8d64e815341c",
      external_id: "PLN_TST-001",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "Plan TEST 2025 VARIADO",
      description: "PEU",
      total_shares: 180,
      total_vested_shares: 0,
      total_non_vestedshares: 105,
    },
    {
      stock_plan_id: "9d326b37-8689-47d0-acee-8d64e815341c",
      external_id: "PLN_TST-001",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Plan TEST 2025 VARIADO",
      description: "PEU",
      total_shares: 70,
      total_vested_shares: 0,
      total_non_vestedshares: 35,
    },
    {
      stock_plan_id: "1eed1c88-0612-4dc8-b56d-c71018cb84a4",
      external_id: "PLAN-PERFTEST300-2025-RSU",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERFTEST300 2025",
      description: "RSU",
      total_shares: 15279,
      total_vested_shares: 0,
      total_non_vestedshares: 14762,
    },
    {
      stock_plan_id: "baa3323d-567c-4035-bf05-0b97571e5a1b",
      external_id: "PLAN-PERFTEST300-2025-PEU",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERFTEST300 2025",
      description: "PEU",
      total_shares: 16956,
      total_vested_shares: 0,
      total_non_vestedshares: 16467,
    },
    {
      stock_plan_id: "02b290bb-222c-4c7c-bb25-63d41634b6e3",
      external_id: "PLAN-PERFM10001-2025-RSU",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERFM10001 2025",
      description: "RSU",
      total_shares: 51712,
      total_vested_shares: 0,
      total_non_vestedshares: 49994,
    },
    {
      stock_plan_id: "429895fe-4cd2-4495-8420-2b3cb4935a9b",
      external_id: "PLAN-PERFM10001-2025-PEU",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERFM10001 2025",
      description: "PEU",
      total_shares: 50822,
      total_vested_shares: 0,
      total_non_vestedshares: 49400,
    },
    {
      stock_plan_id: "05e39d8f-be7f-47cc-9d2b-0c1181fff421",
      external_id: "PLAN-PERF300-2025-RSU",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERF300 2025",
      description: "RSU",
      total_shares: 17023,
      total_vested_shares: 0,
      total_non_vestedshares: 16618,
    },
    {
      stock_plan_id: "3631e867-9e20-47df-800c-f758b7c866cb",
      external_id: "PLAN-PERF300-2025-PEU",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERF300 2025",
      description: "PEU",
      total_shares: 14015,
      total_vested_shares: 0,
      total_non_vestedshares: 13615,
    },
    {
      stock_plan_id: "a2bd49a6-d559-4a3e-9c01-8b4997b0e428",
      external_id: "PLAN-PERF10-2025-RSU",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERF10 2025",
      description: "RSU",
      total_shares: 663,
      total_vested_shares: 0,
      total_non_vestedshares: 624,
    },
    {
      stock_plan_id: "147a31c6-2153-4095-b69c-228bb4a69e9c",
      external_id: "PLAN-PERF10-2025-PEU",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERF10 2025",
      description: "PEU",
      total_shares: 290,
      total_vested_shares: 0,
      total_non_vestedshares: 281,
    },
    {
      stock_plan_id: "93aa838e-cf66-4489-96ce-1dc7941ca4dd",
      external_id: "PLAN-2025-RSU",
      contract_type: "rsu",
      symbol: "WALMEX *",
      title: "Bono 2025",
      description: "RSU",
      total_shares: 6558,
      total_vested_shares: 0,
      total_non_vestedshares: 6363,
    },
    {
      stock_plan_id: "6e37157b-bdfb-40e1-96c2-393d936bd042",
      external_id: "PLAN-2025-PEU",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Bono 2025",
      description: "PEU",
      total_shares: 4693,
      total_vested_shares: 0,
      total_non_vestedshares: 4486,
    },
    {
      stock_plan_id: "6fc88e74-ff46-4f8c-b0d0-aeea3e3025b9",
      external_id: "PEU2025TA",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2025 Trianual",
      description: "PEU trianual  2025",
      total_shares: 9563952,
      total_vested_shares: 0,
      total_non_vestedshares: 9563952,
    },
    {
      stock_plan_id: "0cefd3c3-d74f-4b0b-9b2b-d35c42039dcd",
      external_id: "PEU2024TA",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2024 Trianual",
      description: "PEU trianual  2024",
      total_shares: 2639965,
      total_vested_shares: 0,
      total_non_vestedshares: 2639965,
    },
    {
      stock_plan_id: "aae5df1d-1613-4f13-bf21-4f76e4aed8b9",
      external_id: "PEU2023TA",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2023 Trianual",
      description: "PEU trianual  2023",
      total_shares: 1351851,
      total_vested_shares: 0,
      total_non_vestedshares: 1351851,
    },
    {
      stock_plan_id: "bbdbc22d-4545-4b1a-9eec-092305f55254",
      external_id: "PEU2023A",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2024 Anual",
      description: "PEU anual  2024",
      total_shares: 33610,
      total_vested_shares: 33610,
      total_non_vestedshares: 12563,
    },
    {
      stock_plan_id: "855c68f3-d5f8-427f-912a-1dbf243452cb",
      external_id: "PEU2022TA",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2022 Trianual",
      description: "PEU trianual  2022",
      total_shares: 1400603,
      total_vested_shares: 1387957,
      total_non_vestedshares: 12646,
    },
    {
      stock_plan_id: "7e76eda1-0fe9-4b03-b2df-e9f8cb096c1e",
      external_id: "2025PEUME",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "Plan 2025 PEU Mensual",
      description: "PEU Mensual 2025",
      total_shares: 1200,
      total_vested_shares: 0,
      total_non_vestedshares: 1200,
    },
    {
      stock_plan_id: "bb5afa1b-c9b8-4eda-a98e-551a71341988",
      external_id: "2024PEU",
      contract_type: "peu",
      symbol: "WALMEX *",
      title: "2024PEU",
      description: "PEU",
      total_shares: 4091,
      total_vested_shares: 3227,
      total_non_vestedshares: 3127,
    },
  ],
};

/**
 * Service class for handling dashboard-related API calls
 */
export class DashboardService {
  private static baseURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  /**
   * Fetch dashboard summary data
   */
  static async getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 500));

      // En producción, esto sería una llamada real al backend:
      // const response = await fetch(`${this.baseURL}/api/dashboard/summary`);
      // if (!response.ok) throw new Error('Failed to fetch dashboard data');
      // return response.json();

      return {
        data: mockDashboardData,
        success: true,
        message: "Dashboard data retrieved successfully",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch dashboard summary: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Fetch stock plans with optional filtering
   */
  static async getStockPlans(filters?: {
    contractType?: string;
    status?: string;
    employeeId?: string;
  }): Promise<ApiResponse<StockPlan[]>> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filteredPlans = mockDashboardData.stockPlans;

      if (filters?.contractType) {
        filteredPlans = filteredPlans.filter(
          (plan) => plan.contract_type === filters.contractType,
        );
      }

      return {
        data: filteredPlans,
        success: true,
        message: "Stock plans retrieved successfully",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch stock plans: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get stock plan by ID
   */
  static async getStockPlanById(
    id: string,
  ): Promise<ApiResponse<StockPlan | null>> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const plan = mockDashboardData.stockPlans.find(
        (p) => p.stock_plan_id === id,
      );

      return {
        data: plan || null,
        success: !!plan,
        message: plan ? "Stock plan found" : "Stock plan not found",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch stock plan: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
