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
      const response = await fetch(`${baseURL}/api/stock-plan/${id}/detail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 300, // Revalidar cada 5 minutos
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Stock plan not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch stock plan detail");
      }

      return result.data;
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
        (contract) => contract.contract_type === filters.contractType,
      );
    }

    if (filters?.status) {
      filtered = filtered.filter(
        (contract) => contract.vesting_schedule_status === filters.status,
      );
    }

    if (filters?.employeeId) {
      filtered = filtered.filter(
        (contract) =>
          contract.employee_id.includes(filters.employeeId!) ||
          contract.employee_external_id.includes(filters.employeeId!) ||
          contract.employee_name
            .toLowerCase()
            .includes(filters.employeeId!.toLowerCase()),
      );
    }

    setFilteredContracts(filtered);
  }, [contracts, filters?.contractType, filters?.status, filters?.employeeId]);

  return filteredContracts;
}
