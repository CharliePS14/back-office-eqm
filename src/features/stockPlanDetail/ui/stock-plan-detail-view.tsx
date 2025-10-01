"use client";

import { useState } from "react";
import {
  useStockPlanDetail,
  useFilteredContracts,
} from "@/shared/hooks/use-stock-plan-detail";
import { StockPlanDetailCard } from "./stock-plan-detail-card";
import { StockPlanDetailLoading } from "./stock-plan-detail-loading";
import { ErrorDisplay } from "@/shared/ui/error-display";
import type { Contract } from "@/shared/types/stockPlan";

interface StockPlanDetailViewProps {
  stockPlanId: string;
}

function ContractRow({ contract }: { contract: Contract }) {
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
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {contract.employeeName}
            </div>
            <div className="text-sm text-gray-500">
              {contract.employeeExternalId}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{contract.contractName}</div>
        <div className="text-sm text-gray-500">
          {contract.contractExternalId}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getContractTypeBadge(contract.contractType)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(contract.assignmentDate).toLocaleDateString("es-ES")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {contract.paymentFrequency}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(contract.vestingScheduleStatus)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900">
          Ver detalles
        </button>
      </td>
    </tr>
  );
}

function ContractsTable({ contracts }: { contracts: Contract[] }) {
  if (contracts.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Contratos</h3>
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
              No hay contratos
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No se encontraron contratos con los filtros aplicados.
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
          <h3 className="text-lg font-medium text-gray-900">Contratos</h3>
          <div className="text-sm text-gray-500">
            {contracts.length} contrato{contracts.length !== 1 ? "s" : ""}{" "}
            encontrado{contracts.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empleado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contrato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Asignación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frecuencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.map((contract) => (
              <ContractRow key={contract.contractId} contract={contract} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StockPlanDetailView({ stockPlanId }: StockPlanDetailViewProps) {
  const {
    data: stockPlan,
    loading,
    error,
    refetch,
  } = useStockPlanDetail(stockPlanId);
  const [filters, setFilters] = useState({
    contractType: "",
    status: "",
    employeeId: "",
  });

  const filteredContracts = useFilteredContracts(stockPlan?.contracts || null, {
    contractType: filters.contractType || undefined,
    status: filters.status || undefined,
    employeeId: filters.employeeId || undefined,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || "",
    }));
  };

  const clearFilters = () => {
    setFilters({
      contractType: "",
      status: "",
      employeeId: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value);

  if (loading) {
    return <StockPlanDetailLoading />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorDisplay
          title="Error al cargar el detalle del stock plan"
          message={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!stockPlan) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorDisplay
          title="Stock plan no encontrado"
          message="El stock plan solicitado no existe o no tienes permisos para verlo."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stock Plan Detail Card */}
      <StockPlanDetailCard stockPlan={stockPlan} />

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="contract-type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de Contrato
            </label>
            <select
              id="contract-type"
              value={filters.contractType}
              onChange={(e) =>
                handleFilterChange("contractType", e.target.value)
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Todos</option>
              <option value="rsu">RSU</option>
              <option value="peu">PEU</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Estado
            </label>
            <select
              id="status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En Progreso</option>
              <option value="released">Liberado</option>
              <option value="expired">Expirado</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="employee-search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Buscar Empleado
            </label>
            <input
              type="text"
              id="employee-search"
              value={filters.employeeId}
              onChange={(e) => handleFilterChange("employeeId", e.target.value)}
              placeholder="Nombre o ID..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      <ContractsTable contracts={filteredContracts} />
    </div>
  );
}
