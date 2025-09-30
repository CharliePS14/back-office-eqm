import { NextRequest, NextResponse } from "next/server";
import { DashboardService } from "@/shared/api/dashboard.service";

/**
 * GET /api/dashboard/stock-plans
 * Endpoint para obtener los planes de acciones con filtros opcionales
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      contractType: searchParams.get("contractType") || undefined,
      status: searchParams.get("status") || undefined,
      employeeId: searchParams.get("employeeId") || undefined,
    };

    // Remover filtros undefined
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    const stockPlansData = await DashboardService.getStockPlans(
      Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined,
    );

    return NextResponse.json(stockPlansData, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=30", // Cache por 1 minuto
      },
    });
  } catch (error) {
    console.error("Error fetching stock plans:", error);

    return NextResponse.json(
      {
        data: [],
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
