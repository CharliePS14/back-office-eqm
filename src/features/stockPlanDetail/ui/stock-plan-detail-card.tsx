"use client";

import type { StockPlanDetail } from "@/shared/types/stockPlan";

interface StockPlanDetailCardProps {
  stockPlan: StockPlanDetail;
}

export function StockPlanDetailCard({ stockPlan }: StockPlanDetailCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {stockPlan.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>ID: {stockPlan.externalId}</span>
            <span>•</span>
            <span>Plan ID: {stockPlan.stockPlanId}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-900">
                {stockPlan.totalNonVestedShares.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">Acciones por Liberar</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-900">
                {stockPlan.summary.totalContracts}
              </div>
              <div className="text-sm text-green-700">Total Contratos</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-900">
                {stockPlan.summary.activeContracts}
              </div>
              <div className="text-sm text-purple-700">Contratos Activos</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-900">
                {stockPlan.summary.totalEmployees}
              </div>
              <div className="text-sm text-orange-700">Empleados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Por Tipo de Contrato
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">PEU</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {stockPlan.summary.breakdownByType.peu}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">RSU</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {stockPlan.summary.breakdownByType.rsu}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Por Estado</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pendiente</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {stockPlan.summary.breakdownByStatus.pending}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">En Progreso</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {stockPlan.summary.breakdownByStatus.in_progress}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Liberado</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {stockPlan.summary.breakdownByStatus.released}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expirado</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {stockPlan.summary.breakdownByStatus.expired}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
