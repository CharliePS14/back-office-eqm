"use client";

import { useStockPlans } from "@/shared/hooks/use-dashboard";
import { LoadingCard } from "@/shared/ui/loading";
import { ErrorDisplay } from "@/shared/ui/error-display";
import type { StockPlan } from "@/shared/types/dashboard";

interface StockPlansTableProps {
  filters?: {
    contractType?: string;
    status?: string;
    employeeId?: string;
  };
}

function StockPlanRow({ plan }: { plan: StockPlan }) {
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      released: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || "bg-gray-100 text-gray-800"}`}
      >
        {status.replace("_", " ")}
      </span>
    );
  };

  const getContractTypeBadge = (type: string) => {
    const typeClasses = {
      rsu: "bg-purple-100 text-purple-800",
      peu: "bg-indigo-100 text-indigo-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeClasses[type as keyof typeof typeClasses] || "bg-gray-100 text-gray-800"}`}
      >
        {type.toUpperCase()}
      </span>
    );
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {plan.external_id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {plan.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {plan.total_non_vestedshares}
      </td>
    </tr>
  );
}

export function StockPlansTable({ filters }: StockPlansTableProps) {
  const { data: stockPlans, loading, error, refetch } = useStockPlans(filters);

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Stock Plans</h3>
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <LoadingCard key={index} className="h-16" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Stock Plans</h3>
        </div>
        <div className="p-6">
          <ErrorDisplay
            title="Error al cargar los planes de acciones"
            message={error}
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  if (!stockPlans || stockPlans.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Stock Plans</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No hay planes de acciones
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No se encontraron planes de acciones con los filtros aplicados.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Stock Plans</h3>
          <div className="text-sm text-gray-500">
            {stockPlans.length} plan{stockPlans.length !== 1 ? "es" : ""}{" "}
            encontrado{stockPlans.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Plan ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre del Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones por liberar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stockPlans.map((plan) => (
              <StockPlanRow key={plan.stock_plan_id} plan={plan} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
