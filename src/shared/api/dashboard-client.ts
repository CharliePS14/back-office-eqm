import {
  DashboardSummary,
  ApiResponse,
  StockPlan,
} from "@/shared/types/dashboard";

/**
 * API client for dashboard-related operations
 */
export class DashboardApiClient {
  private static getBaseURL(): string {
    // En server-side (build time), usar URL interna
    console.log(process.env.NEXT_PUBLIC_API_URL);

    if (typeof window === "undefined") {
      return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    }
    // En client-side, usar URL relativa o configurada
    return process.env.NEXT_PUBLIC_API_URL || "";
  }

  /**
   * Fetch dashboard summary data from the BFF
   */
  static async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const baseURL = this.getBaseURL();
      const response = await fetch(
        `${baseURL}/api/backoffice/v1/companies/5c6c72b4-1aba-494f-8522-32366e3156cf/stock-plans/balance`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-functions-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
          next: {
            revalidate: 300, // Revalidar cada 5 minutos
          },
        },
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: DashboardSummary = await response.json();

      return result;
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      throw error;
    }
  }

  /**
   * Fetch stock plans with optional filters
   */
  static async getStockPlans(filters?: {
    contractType?: string;
    status?: string;
    employeeId?: string;
  }): Promise<StockPlan[]> {
    try {
      const searchParams = new URLSearchParams();

      if (filters?.contractType) {
        searchParams.append("contractType", filters.contractType);
      }
      if (filters?.status) {
        searchParams.append("status", filters.status);
      }
      if (filters?.employeeId) {
        searchParams.append("employeeId", filters.employeeId);
      }

      const queryString = searchParams.toString();
      const baseURL = this.getBaseURL();
      const url = `${baseURL}/api/backoffice/v1/companies/5c6c72b4-1aba-494f-8522-32366e3156cf/stock-plans/balance${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-functions-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        next: {
          revalidate: 60, // Revalidar cada minuto
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: DashboardSummary = await response.json();

      return result.stockPlans;
    } catch (error) {
      console.error("Error fetching stock plans:", error);
      throw error;
    }
  }

  /**
   * Fetch a specific stock plan by ID
   */
  static async getStockPlanById(id: string): Promise<StockPlan | null> {
    try {
      const baseURL = this.getBaseURL();
      const response = await fetch(
        `${baseURL}/api/dashboard/stock-plans/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-functions-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
          next: {
            revalidate: 300, // Revalidar cada 5 minutos
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<StockPlan | null> = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch stock plan");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching stock plan:", error);
      throw error;
    }
  }

  /**
   * Utility method for handling API errors consistently
   */
  private static handleApiError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}
