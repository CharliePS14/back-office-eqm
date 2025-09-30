import { Suspense } from "react";
import { DashboardApiClient } from "@/shared/api/dashboard-client";
import { LoadingStats } from "@/shared/ui/loading";
import { ErrorDisplay } from "@/shared/ui/error-display";
import { StockPlansWithFilters } from "@/features/stockPlansList/ui/stockPlansWithFilters";

// Server Component - Obtiene datos del BFF
async function StatsCards() {
  try {
    const dashboardData = await DashboardApiClient.getDashboardSummary();

    const stats = [
      {
        title: "Acciones Asignadas",
        value: dashboardData.totalAssigned.total.toString(),
        change: `${dashboardData.totalAssigned.breakdown.PEU} PEU | ${dashboardData.totalAssigned.breakdown.RSU} RSU`,
        changeType: "neutral",
        icon: "📦",
      },
      {
        title: "Acciones Liberadas",
        value: dashboardData.totalReleased.total.toString(),
        change: `${dashboardData.totalReleased.breakdown.PEU} PEU | ${dashboardData.totalReleased.breakdown.RSU} RSU`,
        changeType: "positive",
        icon: "🔔",
      },
      {
        title: "Acciones Pendientes",
        value: dashboardData.totalPending.total.toString(),
        change: `${dashboardData.totalPending.breakdown.PEU} PEU | ${dashboardData.totalPending.breakdown.RSU} RSU`,
        changeType: "negative",
        icon: "🔔",
      },
    ];

    return (
      <div>
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 max-w-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stock Plans</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm font-medium text-green-600">
              {dashboardData.stockPlansResume.activeStockPlans} Activos
            </span>
            <span className="text-sm font-medium text-red-600">
              {dashboardData.stockPlansResume.inactiveStockPlans} Inactivos
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="text-2xl">{stat.icon}</div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : stat.changeType === "warning"
                          ? "text-yellow-600"
                          : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard data:", error);

    // Fallback UI en caso de error
    return (
      <ErrorDisplay
        title="Error al cargar el dashboard"
        message={
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado al cargar los datos."
        }
        className="mb-8"
      />
    );
  }
}

// Componente principal de la página de admin
export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-sm text-gray-600">Gestiona clientes</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Nuevo Cliente
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <Suspense fallback={<LoadingStats count={3} />}>
          <StatsCards />
        </Suspense>

        {/* Bottom Section - Table StockPlans */}
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            }
          >
            <StockPlansWithFilters />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
