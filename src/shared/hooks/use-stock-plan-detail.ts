"use client";

import { useState, useEffect } from "react";
import { StockPlanDetail, Contract } from "@/shared/types/stockPlan";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * API client for stock plan detail operations
 */
class StockPlanDetailApiClient {
  private static getBaseURL(): string {
    if (typeof window === "undefined") {
      return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    }
    return process.env.NEXT_PUBLIC_API_URL || "";
  }

  static async getStockPlanDetail(id: string): Promise<StockPlanDetail> {
    try {
      const baseURL = this.getBaseURL();
      const response = await fetch(
        `${baseURL}/api/backoffice/v1/companies/5c6c72b4-1aba-494f-8522-32366e3156cf/stock-plans/${id}/delivery-tracking?assignment_date=3&vesting_status=in_progress&order_by=employee_external_id&sort=asc`,
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
          throw new Error("Stock plan not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contracts: Contract[] = await response.json();

      // Transform the array response to match our StockPlanDetail interface
      const stockPlanDetail: StockPlanDetail = {
        stockPlanId: id,
        stockPlanName: contracts.length > 0 ? contracts[0].stockPlanName : "",
        externalId: "",
        title: contracts.length > 0 ? contracts[0].stockPlanName : "",
        totalNonVestedShares: 0,
        contracts: contracts,
        summary: {
          totalContracts: contracts.length,
          activeContracts: contracts.filter(
            (c) => c.vestingScheduleStatus === "in_progress",
          ).length,
          totalEmployees: new Set(contracts.map((c) => c.employeeId)).size,
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
        },
      };

      return stockPlanDetail;
    } catch (error) {
      console.error("Error fetching stock plan detail:", error);
      throw error;
    }
  }
}

/**
 * Custom hook for fetching stock plan detail data
 */
export function useStockPlanDetail(stockPlanId: string | null) {
  const [state, setState] = useState<UseApiState<StockPlanDetail>>({
    data: null,
    loading: Boolean(stockPlanId),
    error: null,
  });

  useEffect(() => {
    if (!stockPlanId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data =
          await StockPlanDetailApiClient.getStockPlanDetail(stockPlanId);
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : "An error occurred",
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [stockPlanId]);

  const refetch = async () => {
    if (!stockPlanId) return;

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data =
        await StockPlanDetailApiClient.getStockPlanDetail(stockPlanId);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return { ...state, refetch };
}

/**
 * Custom hook for filtering contracts within a stock plan
 */
export function useFilteredContracts(
  contracts: Contract[] | null,
  filters?: {
    contractType?: string;
    status?: string;
    employeeId?: string;
  },
) {
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);

  useEffect(() => {
    if (!contracts) {
      setFilteredContracts([]);
      return;
    }

    let filtered = [...contracts];

    if (filters?.contractType) {
      filtered = filtered.filter(
        (contract) => contract.contractType === filters.contractType,
      );
    }

    if (filters?.status) {
      filtered = filtered.filter(
        (contract) => contract.vestingScheduleStatus === filters.status,
      );
    }

    if (filters?.employeeId) {
      filtered = filtered.filter(
        (contract) =>
          contract.employeeId.includes(filters.employeeId!) ||
          contract.employeeExternalId.includes(filters.employeeId!) ||
          contract.employeeName
            .toLowerCase()
            .includes(filters.employeeId!.toLowerCase()),
      );
    }

    setFilteredContracts(filtered);
  }, [contracts, filters?.contractType, filters?.status, filters?.employeeId]);

  return filteredContracts;
}
