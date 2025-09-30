import { NextRequest, NextResponse } from "next/server";
import { DashboardService } from "@/shared/api/dashboard.service";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/dashboard/stock-plans/[id]
 * Endpoint para obtener un plan de acciones específico por ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          data: null,
          success: false,
          message: "Stock plan ID is required",
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    const stockPlanData = await DashboardService.getStockPlanById(id);

    const status = stockPlanData.success ? 200 : 404;

    return NextResponse.json(stockPlanData, {
      status,
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=60", // Cache por 5 minutos
      },
    });
  } catch (error) {
    console.error("Error fetching stock plan:", error);

    return NextResponse.json(
      {
        data: null,
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
