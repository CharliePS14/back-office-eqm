import { Suspense } from "react";

const resumeGeneralDetail = {
  stockPlansResume: {
    totalStockPlans: 11,
    activeStockPlans: 10,
    inactiveStockPlans: 1,
  },
  totalAssigned: {
    total: 100,
    breakdown: { PEU: 20, RSU: 80 },
  },
  totalReleased: {
    total: 5000,
    breakdown: { PEU: 1220, RSU: 3000 },
  },
  totalPending: {
    total: 300,
    breakdown: { PEU: 120, RSU: 180 },
  },
  stockPlans: [
    {
      employee_id: "12345563",
      employee_external_id: "34556",
      employee_last_name: "Yost",
      employee_middle_name: "August",
      employee_name: "Dr. Angela Wyman",
      contract_name: "Daniel Collins",
      contract_id: "12345676543234567",
      stock_plan_name: "Sherri Moore",
      stock_plan_id: "34565434565456",
      contract_external_id: "pariatur mollit occaecat minim",
      contract_type: "rsu",
      assignment_date: "2025-04-26",
      payment_frequency: "yearly",
      vesting_schedule_status: "released",
    },
    {
      employee_id: "1234543234",
      employee_external_id: "344",
      employee_last_name: "Grimes",
      employee_middle_name: "Hayden",
      employee_name: "Pamela Leannon",
      contract_name: "Miss Peggy Kessler",
      contract_id: "234565434566567",
      stock_plan_name: "Sabrina Huel",
      stock_plan_id: "1234567654567",
      contract_external_id: "cupidatat deserunt ullamco",
      contract_type: "peu",
      assignment_date: "2025-09-11",
      payment_frequency: "triennial",
      vesting_schedule_status: "in_progress",
    },
    {
      employee_id: "45678987678787",
      employee_external_id: "234445",
      employee_last_name: "Dietrich-McLaughlin",
      employee_middle_name: "Angel",
      employee_name: "Audrey Berge",
      contract_name: "Andy Ebert",
      contract_id: "66556677",
      stock_plan_name: "Mindy Dietrich",
      stock_plan_id: "ullamco",
      contract_external_id: "245678888",
      contract_type: "peu",
      assignment_date: "2024-10-15",
      payment_frequency: "yearly",
      vesting_schedule_status: "in_progress",
    },
  ],
};

// Componente de estadísticas rápidas
function StatsCards() {
  const stats = [
    {
      title: "Acciones Asignadas",
      value: resumeGeneralDetail.totalAssigned.total.toString(),
      change: `${resumeGeneralDetail.totalAssigned.breakdown.PEU} PEU | ${resumeGeneralDetail.totalAssigned.breakdown.RSU} RSU`,
      changeType: "neutral",
      icon: "📦",
    },
    {
      title: "Acciones Liberadas",
      value: resumeGeneralDetail.totalReleased.total.toString(),
      change: `${resumeGeneralDetail.totalReleased.breakdown.PEU} PEU | ${resumeGeneralDetail.totalReleased.breakdown.RSU} RSU`,
      changeType: "positive",
      icon: "🔔",
    },
    {
      title: "Acciones Pendientes",
      value: resumeGeneralDetail.totalPending.total.toString(),
      change: `${resumeGeneralDetail.totalPending.breakdown.PEU} PEU | ${resumeGeneralDetail.totalPending.breakdown.RSU} RSU`,
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
        <div className="mt-4 flex items-center">
          <span className={`text-sm font-medium text-green-600`}>
            {resumeGeneralDetail.stockPlansResume.activeStockPlans} Activos
          </span>
          <span className={`text-sm font-medium text-red-600`}>
            {resumeGeneralDetail.stockPlansResume.inactiveStockPlans} Inactivos
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
        <Suspense
          fallback={
            <div className="animate-pulse bg-gray-200 h-32 rounded-lg mb-8"></div>
          }
        >
          <StatsCards />
        </Suspense>

        {/* Bottom Section - Table StockPlans */}
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            }
          >
            {/* TODO - Feature Table StockPlans */}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
