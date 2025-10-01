import {
  DashboardSummary,
  ApiResponse,
  StockPlan,
} from "@/shared/types/dashboard";

// Simulación de datos del backend
const mockDashboardData: DashboardSummary = {
  totalAssignedShares: 12345432345,
  totalNonVestedShares: 123456566,
  totalVestedShares: 2345556,
  stockPlans: [
    {
      stockPlanId: "5150dedb-e868-41ae-9172-0291703ddb8c",
      externalId: "SP0009",
      type: "peu",
      symbol: "WALMEX *",
      title: "Plan 2025 RSU",
      description: "Descripción para RSU",
      totalShares: 535,
      totalVestedShares: 0,
      totalNonVestedshares: 2635,
    },
    {
      stockPlanId: "87400338-172a-4437-9019-caf432f2c364",
      externalId: "SP0008",
      type: "peu",
      symbol: "WALMEX *",
      title: "DEV - Plan 2025 PEU",
      description: "PEU",
      totalShares: 3180,
      totalVestedShares: 0,
      totalNonVestedshares: 3180,
    },
    {
      stockPlanId: "85a62d05-66b7-4e6b-a405-b5e990c36c90",
      externalId: "SP0007",
      type: "peu",
      symbol: "WALMEX *",
      title: "Plan 2025 PEU",
      description: "PEU",
      totalShares: 100,
      totalVestedShares: 0,
      totalNonVestedshares: 100,
    },
    {
      stockPlanId: "781c9744-7aef-4285-b7ba-ef0cc9bbc394",
      externalId: "RSU2025TA",
      type: "rsu",
      symbol: "WALMEX *",
      title: "RSU 2025 Trianual",
      description: "RSU trianual 2025",
      totalShares: 7828401,
      totalVestedShares: 0,
      totalNonVestedshares: 7828401,
    },
    {
      stockPlanId: "cec42649-d64e-4635-90dd-d5438255bdd8",
      externalId: "RSU2024TA",
      type: "rsu",
      symbol: "WALMEX *",
      title: "RSU 2024 Trianual",
      description: "RSU trianual 2024",
      totalShares: 5445605,
      totalVestedShares: 2306635,
      totalNonVestedshares: 3138970,
    },
    {
      stockPlanId: "0e30505a-2271-41ae-b794-1048f9f6a363",
      externalId: "RSU2024A",
      type: "rsu",
      symbol: "WALMEX *",
      title: "RSU 2024 Trianual",
      description: "RSU anual 2024",
      totalShares: 303198,
      totalVestedShares: 161969,
      totalNonVestedshares: 141229,
    },
    {
      stockPlanId: "9d326b37-8689-47d0-acee-8d64e815341c",
      externalId: "PLN_TST-001",
      type: "rsu",
      symbol: "WALMEX *",
      title: "Plan TEST 2025 VARIADO",
      description: "PEU",
      totalShares: 180,
      totalVestedShares: 0,
      totalNonVestedshares: 105,
    },
    {
      stockPlanId: "9d326b37-8689-47d0-acee-8d64e815341c",
      externalId: "PLN_TST-001",
      type: "peu",
      symbol: "WALMEX *",
      title: "Plan TEST 2025 VARIADO",
      description: "PEU",
      totalShares: 70,
      totalVestedShares: 0,
      totalNonVestedshares: 35,
    },
    {
      stockPlanId: "1eed1c88-0612-4dc8-b56d-c71018cb84a4",
      externalId: "PLAN-PERFTEST300-2025-RSU",
      type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERFTEST300 2025",
      description: "RSU",
      totalShares: 15279,
      totalVestedShares: 0,
      totalNonVestedshares: 14762,
    },
    {
      stockPlanId: "baa3323d-567c-4035-bf05-0b97571e5a1b",
      externalId: "PLAN-PERFTEST300-2025-PEU",
      type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERFTEST300 2025",
      description: "PEU",
      totalShares: 16956,
      totalVestedShares: 0,
      totalNonVestedshares: 16467,
    },
    {
      stockPlanId: "02b290bb-222c-4c7c-bb25-63d41634b6e3",
      externalId: "PLAN-PERFM10001-2025-RSU",
      type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERFM10001 2025",
      description: "RSU",
      totalShares: 51712,
      totalVestedShares: 0,
      totalNonVestedshares: 49994,
    },
    {
      stockPlanId: "429895fe-4cd2-4495-8420-2b3cb4935a9b",
      externalId: "PLAN-PERFM10001-2025-PEU",
      type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERFM10001 2025",
      description: "PEU",
      totalShares: 50822,
      totalVestedShares: 0,
      totalNonVestedshares: 49400,
    },
    {
      stockPlanId: "05e39d8f-be7f-47cc-9d2b-0c1181fff421",
      externalId: "PLAN-PERF300-2025-RSU",
      type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERF300 2025",
      description: "RSU",
      totalShares: 17023,
      totalVestedShares: 0,
      totalNonVestedshares: 16618,
    },
    {
      stockPlanId: "3631e867-9e20-47df-800c-f758b7c866cb",
      externalId: "PLAN-PERF300-2025-PEU",
      type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERF300 2025",
      description: "PEU",
      totalShares: 14015,
      totalVestedShares: 0,
      totalNonVestedshares: 13615,
    },
    {
      stockPlanId: "a2bd49a6-d559-4a3e-9c01-8b4997b0e428",
      externalId: "PLAN-PERF10-2025-RSU",
      type: "rsu",
      symbol: "WALMEX *",
      title: "Bono PERF10 2025",
      description: "RSU",
      totalShares: 663,
      totalVestedShares: 0,
      totalNonVestedshares: 624,
    },
    {
      stockPlanId: "147a31c6-2153-4095-b69c-228bb4a69e9c",
      externalId: "PLAN-PERF10-2025-PEU",
      type: "peu",
      symbol: "WALMEX *",
      title: "Bono PERF10 2025",
      description: "PEU",
      totalShares: 290,
      totalVestedShares: 0,
      totalNonVestedshares: 281,
    },
    {
      stockPlanId: "93aa838e-cf66-4489-96ce-1dc7941ca4dd",
      externalId: "PLAN-2025-RSU",
      type: "rsu",
      symbol: "WALMEX *",
      title: "Bono 2025",
      description: "RSU",
      totalShares: 6558,
      totalVestedShares: 0,
      totalNonVestedshares: 6363,
    },
    {
      stockPlanId: "6e37157b-bdfb-40e1-96c2-393d936bd042",
      externalId: "PLAN-2025-PEU",
      type: "peu",
      symbol: "WALMEX *",
      title: "Bono 2025",
      description: "PEU",
      totalShares: 4693,
      totalVestedShares: 0,
      totalNonVestedshares: 4486,
    },
    {
      stockPlanId: "6fc88e74-ff46-4f8c-b0d0-aeea3e3025b9",
      externalId: "PEU2025TA",
      type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2025 Trianual",
      description: "PEU trianual  2025",
      totalShares: 9563952,
      totalVestedShares: 0,
      totalNonVestedshares: 9563952,
    },
    {
      stockPlanId: "0cefd3c3-d74f-4b0b-9b2b-d35c42039dcd",
      externalId: "PEU2024TA",
      type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2024 Trianual",
      description: "PEU trianual  2024",
      totalShares: 2639965,
      totalVestedShares: 0,
      totalNonVestedshares: 2639965,
    },
    {
      stockPlanId: "aae5df1d-1613-4f13-bf21-4f76e4aed8b9",
      externalId: "PEU2023TA",
      type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2023 Trianual",
      description: "PEU trianual  2023",
      totalShares: 1351851,
      totalVestedShares: 0,
      totalNonVestedshares: 1351851,
    },
    {
      stockPlanId: "bbdbc22d-4545-4b1a-9eec-092305f55254",
      externalId: "PEU2023A",
      type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2024 Anual",
      description: "PEU anual  2024",
      totalShares: 33610,
      totalVestedShares: 33610,
      totalNonVestedshares: 12563,
    },
    {
      stockPlanId: "855c68f3-d5f8-427f-912a-1dbf243452cb",
      externalId: "PEU2022TA",
      type: "peu",
      symbol: "WALMEX *",
      title: "PEU 2022 Trianual",
      description: "PEU trianual  2022",
      totalShares: 1400603,
      totalVestedShares: 1387957,
      totalNonVestedshares: 12646,
    },
    {
      stockPlanId: "7e76eda1-0fe9-4b03-b2df-e9f8cb096c1e",
      externalId: "2025PEUME",
      type: "peu",
      symbol: "WALMEX *",
      title: "Plan 2025 PEU Mensual",
      description: "PEU Mensual 2025",
      totalShares: 1200,
      totalVestedShares: 0,
      totalNonVestedshares: 1200,
    },
    {
      stockPlanId: "bb5afa1b-c9b8-4eda-a98e-551a71341988",
      externalId: "2024PEU",
      type: "peu",
      symbol: "WALMEX *",
      title: "2024PEU",
      description: "PEU",
      totalShares: 4091,
      totalVestedShares: 3227,
      totalNonVestedshares: 3127,
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
          (plan) => plan.type === filters.contractType,
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
        (p) => p.stockPlanId === id,
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
