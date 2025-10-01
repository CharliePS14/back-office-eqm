import { Suspense } from "react";
import Link from "next/link";
import { StockPlanDetailView } from "@/features/stockPlanDetail/ui/stock-plan-detail-view";
import { StockPlanDetailLoading } from "@/features/stockPlanDetail/ui/stock-plan-detail-loading";

interface StockPlanDetailPageProps {
  params: Promise<{
    ID: string;
  }>;
}

export default async function StockPlanDetailPage({
  params,
}: StockPlanDetailPageProps) {
  const { ID: stockPlanId } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Volver al Dashboard
              </Link>
              <div className="text-gray-300">•</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Detalle del Stock Plan
                </h1>
                <p className="text-sm text-gray-600">ID: {stockPlanId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                Exportar
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Nuevo Contrato
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<StockPlanDetailLoading />}>
          <StockPlanDetailView stockPlanId={stockPlanId} />
        </Suspense>
      </main>
    </div>
  );
}
