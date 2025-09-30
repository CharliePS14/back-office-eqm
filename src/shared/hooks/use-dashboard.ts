"use client";

import { useState, useEffect } from "react";
import { DashboardSummary, StockPlan } from "@/shared/types/dashboard";
import { DashboardApiClient } from "@/shared/api/dashboard-client";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching dashboard summary data
 */
export function useDashboardSummary() {
  const [state, setState] = useState<UseApiState<DashboardSummary>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await DashboardApiClient.getDashboardSummary();

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
  }, []);

  const refetch = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await DashboardApiClient.getDashboardSummary();
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
 * Custom hook for fetching stock plans with optional filters
 */
export function useStockPlans(filters?: {
  contractType?: string;
  status?: string;
  employeeId?: string;
}) {
  const [state, setState] = useState<UseApiState<StockPlan[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await DashboardApiClient.getStockPlans(filters);

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
  }, [filters?.contractType, filters?.status, filters?.employeeId]);

  const refetch = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await DashboardApiClient.getStockPlans(filters);
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
 * Custom hook for fetching a specific stock plan by ID
 */
export function useStockPlan(id: string | null) {
  const [state, setState] = useState<UseApiState<StockPlan>>({
    data: null,
    loading: Boolean(id),
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const data = await DashboardApiClient.getStockPlanById(id);

        if (isMounted) {
          setState({
            data,
            loading: false,
            error: data ? null : "Stock plan not found",
          });
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
  }, [id]);

  const refetch = async () => {
    if (!id) return;

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await DashboardApiClient.getStockPlanById(id);
      setState({
        data,
        loading: false,
        error: data ? null : "Stock plan not found",
      });
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
