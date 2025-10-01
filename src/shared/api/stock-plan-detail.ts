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
      employee_id: "9ada9395-7d90-498f-97ff-3c722062dacb",
      employee_external_id: "E00021",
      employee_last_name: "FakePaterno",
      employee_middle_name: "FakeMaterno",
      employee_name: "Tupac Alb",
      contract_name: "Contrato tipo PEU 2025 - miles",
      contract_id: "90fef074-9b33-4301-a73d-3183a8e510f0",
      stock_plan_name: stockPlanName,
      stock_plan_id: stockPlanId,
      contract_external_id: "C0020",
      contract_type: "peu",
      assignment_date: "2025-08-01T00:00:00",
      payment_frequency: "yearly",
      vesting_schedule_status: "in_progress",
    },
    {
      employee_id: "8bda8395-7d90-498f-97ff-3c722062dacb",
      employee_external_id: "E00022",
      employee_last_name: "González",
      employee_middle_name: "María",
      employee_name: "Ana González",
      contract_name: "Contrato tipo RSU 2025 - ejecutivo",
      contract_id: "91fef074-9b33-4301-a73d-3183a8e510f1",
      stock_plan_name: stockPlanName,
      stock_plan_id: stockPlanId,
      contract_external_id: "C0021",
      contract_type: "rsu",
      assignment_date: "2025-07-15T00:00:00",
      payment_frequency: "quarterly",
      vesting_schedule_status: "in_progress",
    },
    {
      employee_id: "7cda8395-7d90-498f-97ff-3c722062dacb",
      employee_external_id: "E00023",
      employee_last_name: "Rodríguez",
      employee_middle_name: "Carlos",
      employee_name: "Luis Rodríguez",
      contract_name: "Contrato tipo PEU 2025 - senior",
      contract_id: "92fef074-9b33-4301-a73d-3183a8e510f2",
      stock_plan_name: stockPlanName,
      stock_plan_id: stockPlanId,
      contract_external_id: "C0022",
      contract_type: "peu",
      assignment_date: "2025-06-01T00:00:00",
      payment_frequency: "yearly",
      vesting_schedule_status: "released",
    },
    {
      employee_id: "6dda8395-7d90-498f-97ff-3c722062dacb",
      employee_external_id: "E00024",
      employee_last_name: "Martínez",
      employee_middle_name: "Isabel",
      employee_name: "Carmen Martínez",
      contract_name: "Contrato tipo RSU 2025 - manager",
      contract_id: "93fef074-9b33-4301-a73d-3183a8e510f3",
      stock_plan_name: stockPlanName,
      stock_plan_id: stockPlanId,
      contract_external_id: "C0023",
      contract_type: "rsu",
      assignment_date: "2025-05-20T00:00:00",
      payment_frequency: "yearly",
      vesting_schedule_status: "pending",
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
          external_id: "SP001",
          title: "Plan de Acciones 2025 - Ejecutivos",
          total_non_vestedshares: 15000,
        },
        "87400338-172a-4437-9019-caf432f2c364": {
          external_id: "SP002",
          title: "Plan de Acciones 2025 - Managers",
          total_non_vestedshares: 8500,
        },
        "85a62d05-66b7-4e6b-a405-b5e990c36c90": {
          external_id: "SP003",
          title: "Plan de Acciones 2025 - Seniors",
          total_non_vestedshares: 12000,
        },
        "781c9744-7aef-4285-b7ba-ef0cc9bbc394": {
          external_id: "SP004",
          title: "Plan de Acciones 2025 - Junior",
          total_non_vestedshares: 7500,
        },
        "cec42649-d64e-4635-90dd-d5438255bdd8": {
          external_id: "SP005",
          title: "Plan de Acciones 2025 - Lead",
          total_non_vestedshares: 9000,
        },
        // Mantener los IDs antiguos para compatibilidad
        "34565434565456": {
          external_id: "SP001",
          title: "Plan de Acciones 2025 - Ejecutivos",
          total_non_vestedshares: 15000,
        },
        "1234567654567": {
          external_id: "SP002",
          title: "Plan de Acciones 2025 - Managers",
          total_non_vestedshares: 8500,
        },
        ullamco: {
          external_id: "SP003",
          title: "Plan de Acciones 2025 - Seniors",
          total_non_vestedshares: 12000,
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
        total_contracts: contracts.length,
        active_contracts: contracts.filter(
          (c) => c.vesting_schedule_status === "in_progress",
        ).length,
        total_employees: contracts.length, // En este caso 1 contrato = 1 empleado
        breakdown_by_type: {
          peu: contracts.filter((c) => c.contract_type === "peu").length,
          rsu: contracts.filter((c) => c.contract_type === "rsu").length,
        },
        breakdown_by_status: {
          pending: contracts.filter(
            (c) => c.vesting_schedule_status === "pending",
          ).length,
          in_progress: contracts.filter(
            (c) => c.vesting_schedule_status === "in_progress",
          ).length,
          released: contracts.filter(
            (c) => c.vesting_schedule_status === "released",
          ).length,
          expired: contracts.filter(
            (c) => c.vesting_schedule_status === "expired",
          ).length,
        },
      };

      const stockPlanDetail: StockPlanDetail = {
        stock_plan_id: stockPlanId,
        stock_plan_name: planInfo.title,
        external_id: planInfo.external_id,
        title: planInfo.title,
        total_non_vestedshares: planInfo.total_non_vestedshares,
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
          (contract) => contract.contract_type === filters.contractType,
        );
      }

      if (filters?.status) {
        filteredContracts = filteredContracts.filter(
          (contract) => contract.vesting_schedule_status === filters.status,
        );
      }

      if (filters?.employeeId) {
        filteredContracts = filteredContracts.filter(
          (contract) =>
            contract.employee_id.includes(filters.employeeId!) ||
            contract.employee_external_id.includes(filters.employeeId!),
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
