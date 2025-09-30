"use client";

import { useState } from "react";
import { StockPlansTable } from "./stockPlansTable";

export function StockPlansWithFilters() {
  const [filters, setFilters] = useState({
    contractType: "",
    status: "",
    employeeId: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
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

  return (
    <div className="space-y-6">
      {/* Filtros */}
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
              htmlFor="employee-id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ID Empleado
            </label>
            <input
              type="text"
              id="employee-id"
              value={filters.employeeId}
              onChange={(e) => handleFilterChange("employeeId", e.target.value)}
              placeholder="Buscar por ID..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <StockPlansTable
        filters={Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value),
        )}
      />
    </div>
  );
}
