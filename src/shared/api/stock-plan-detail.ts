import {
  StockPlanDetail,
  Contract,
  StockPlanDetailResponse,
} from "@/shared/types/stockPlan";

// Mock data para simular contratos de un stock plan
const generateMockContracts = (
  stockPlanId: string,
  stockPlanName: string,
): Contract[] => {
  const mockContracts: Contract[] = [
    {
      employeeId: "9ada9395-7d90-498f-97ff-3c722062dacb",
      employeeExternalId: "E00021",
      employeeLastName: "FakePaterno",
      employeeMiddleName: "FakeMaterno",
      employeeName: "Tupac Alb",
      contractName: "Contrato tipo PEU 2025 - miles",
      contractId: "90fef074-9b33-4301-a73d-3183a8e510f0",
      stockPlanName: stockPlanName,
      stockPlanId: stockPlanId,
      contractExternalId: "C0020",
      contractType: "peu",
      assignmentDate: "2025-08-01T00:00:00",
      paymentFrequency: "yearly",
      vestingScheduleStatus: "in_progress",
    },
    {
      employeeId: "8bda8395-7d90-498f-97ff-3c722062dacb",
      employeeExternalId: "E00022",
      employeeLastName: "González",
      employeeMiddleName: "María",
      employeeName: "Ana González",
      contractName: "Contrato tipo RSU 2025 - ejecutivo",
      contractId: "91fef074-9b33-4301-a73d-3183a8e510f1",
      stockPlanName: stockPlanName,
      stockPlanId: stockPlanId,
      contractExternalId: "C0021",
      contractType: "rsu",
      assignmentDate: "2025-07-15T00:00:00",
      paymentFrequency: "quarterly",
      vestingScheduleStatus: "in_progress",
    },
    {
      employeeId: "7cda8395-7d90-498f-97ff-3c722062dacb",
      employeeExternalId: "E00023",
      employeeLastName: "Rodríguez",
      employeeMiddleName: "Carlos",
      employeeName: "Luis Rodríguez",
      contractName: "Contrato tipo PEU 2025 - senior",
      contractId: "92fef074-9b33-4301-a73d-3183a8e510f2",
      stockPlanName: stockPlanName,
      stockPlanId: stockPlanId,
      contractExternalId: "C0022",
      contractType: "peu",
      assignmentDate: "2025-06-01T00:00:00",
      paymentFrequency: "yearly",
      vestingScheduleStatus: "released",
    },
    {
      employeeId: "6dda8395-7d90-498f-97ff-3c722062dacb",
      employeeExternalId: "E00024",
      employeeLastName: "Martínez",
      employeeMiddleName: "Isabel",
      employeeName: "Carmen Martínez",
      contractName: "Contrato tipo RSU 2025 - manager",
      contractId: "93fef074-9b33-4301-a73d-3183a8e510f3",
      stockPlanName: stockPlanName,
      stockPlanId: stockPlanId,
      contractExternalId: "C0023",
      contractType: "rsu",
      assignmentDate: "2025-05-20T00:00:00",
      paymentFrequency: "yearly",
      vestingScheduleStatus: "pending",
    },
  ];

  return mockContracts;
};

/**
 * Service class for handling stock plan detail API calls
 */
export class StockPlanDetailService {
  /**
   * Fetch detailed information of a specific stock plan including contracts
   */
  static async getStockPlanDetail(
    stockPlanId: string,
  ): Promise<StockPlanDetailResponse> {
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Datos mock basados en el ID del stock plan
      const mockStockPlans = {
        "5150dedb-e868-41ae-9172-0291703ddb8c": {
          externalId: "SP001",
          title: "Plan de Acciones 2025 - Ejecutivos",
          totalNonVestedShares: 15000,
        },
        "87400338-172a-4437-9019-caf432f2c364": {
          externalId: "SP002",
          title: "Plan de Acciones 2025 - Managers",
          totalNonVestedShares: 8500,
        },
        "85a62d05-66b7-4e6b-a405-b5e990c36c90": {
          externalId: "SP003",
          title: "Plan de Acciones 2025 - Seniors",
          totalNonVestedShares: 12000,
        },
        "781c9744-7aef-4285-b7ba-ef0cc9bbc394": {
          externalId: "SP004",
          title: "Plan de Acciones 2025 - Junior",
          totalNonVestedShares: 7500,
        },
        "cec42649-d64e-4635-90dd-d5438255bdd8": {
          externalId: "SP005",
          title: "Plan de Acciones 2025 - Lead",
          totalNonVestedShares: 9000,
        },
        // Mantener los IDs antiguos para compatibilidad
        "34565434565456": {
          externalId: "SP001",
          title: "Plan de Acciones 2025 - Ejecutivos",
          totalNonVestedShares: 15000,
        },
        "1234567654567": {
          externalId: "SP002",
          title: "Plan de Acciones 2025 - Managers",
          totalNonVestedShares: 8500,
        },
        ullamco: {
          externalId: "SP003",
          title: "Plan de Acciones 2025 - Seniors",
          totalNonVestedShares: 12000,
        },
      };

      const planInfo =
        mockStockPlans[stockPlanId as keyof typeof mockStockPlans];

      if (!planInfo) {
        return {
          data: {} as StockPlanDetail,
          success: false,
          message: "Stock plan not found",
          timestamp: new Date().toISOString(),
        };
      }

      const contracts = generateMockContracts(stockPlanId, planInfo.title);

      // Calcular resumen
      const summary = {
        totalContracts: contracts.length,
        activeContracts: contracts.filter(
          (c) => c.vestingScheduleStatus === "in_progress",
        ).length,
        totalEmployees: contracts.length, // En este caso 1 contrato = 1 empleado
        breakdownByType: {
          peu: contracts.filter((c) => c.contractType === "peu").length,
          rsu: contracts.filter((c) => c.contractType === "rsu").length,
        },
        breakdownByStatus: {
          pending: contracts.filter(
            (c) => c.vestingScheduleStatus === "pending",
          ).length,
          in_progress: contracts.filter(
            (c) => c.vestingScheduleStatus === "in_progress",
          ).length,
          released: contracts.filter(
            (c) => c.vestingScheduleStatus === "released",
          ).length,
          expired: contracts.filter(
            (c) => c.vestingScheduleStatus === "expired",
          ).length,
        },
      };

      const stockPlanDetail: StockPlanDetail = {
        stockPlanId: stockPlanId,
        stockPlanName: planInfo.title,
        externalId: planInfo.externalId,
        title: planInfo.title,
        totalNonVestedShares: planInfo.totalNonVestedShares,
        contracts,
        summary,
      };

      return {
        data: stockPlanDetail,
        success: true,
        message: "Stock plan detail retrieved successfully",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch stock plan detail: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Get contracts with optional filtering
   */
  static async getStockPlanContracts(
    stockPlanId: string,
    filters?: {
      contractType?: string;
      status?: string;
      employeeId?: string;
    },
  ): Promise<{ contracts: Contract[]; total: number }> {
    try {
      const detailResponse = await this.getStockPlanDetail(stockPlanId);

      if (!detailResponse.success) {
        throw new Error("Stock plan not found");
      }

      let filteredContracts = detailResponse.data.contracts;

      if (filters?.contractType) {
        filteredContracts = filteredContracts.filter(
          (contract) => contract.contractType === filters.contractType,
        );
      }

      if (filters?.status) {
        filteredContracts = filteredContracts.filter(
          (contract) => contract.vestingScheduleStatus === filters.status,
        );
      }

      if (filters?.employeeId) {
        filteredContracts = filteredContracts.filter(
          (contract) =>
            contract.employeeId.includes(filters.employeeId!) ||
            contract.employeeExternalId.includes(filters.employeeId!),
        );
      }

      return {
        contracts: filteredContracts,
        total: filteredContracts.length,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch contracts: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
