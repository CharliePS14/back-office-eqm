import { NextRequest, NextResponse } from "next/server";
import { DashboardService } from "@/shared/api/dashboard.service";

/**
 * GET /api/dashboard/summary
 * Endpoint para obtener el resumen del dashboard
 */
export async function GET() {
  try {
    const dashboardData = await DashboardService.getDashboardSummary();

    return NextResponse.json(dashboardData, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=60", // Cache por 5 minutos
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);

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
