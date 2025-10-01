import { NextRequest, NextResponse } from "next/server";
import { StockPlanDetailService } from "@/shared/api/stock-plan-detail";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/stock-plan/[id]/detail
 * Endpoint para obtener el detalle completo de un stock plan con sus contratos
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

    const stockPlanDetail = await StockPlanDetailService.getStockPlanDetail(id);

    const status = stockPlanDetail.success ? 200 : 404;

    return NextResponse.json(stockPlanDetail, {
      status,
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=60", // Cache por 5 minutos
      },
    });
  } catch (error) {
    console.error("Error fetching stock plan detail:", error);

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
