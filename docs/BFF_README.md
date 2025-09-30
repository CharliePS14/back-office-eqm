# BFF (Backend for Frontend) - Back Office EQM

Este proyecto implementa un BFF usando Next.js para servir datos del dashboard de administración.

## Arquitectura

```
Frontend (Next.js) → BFF API Routes → Backend Services (NestJS)
```

### Estructura del BFF

```
src/
├── app/api/
│   └── dashboard/
│       ├── summary/route.ts          # GET /api/dashboard/summary
│       ├── stock-plans/route.ts      # GET /api/dashboard/stock-plans
│       └── stock-plans/[id]/route.ts # GET /api/dashboard/stock-plans/:id
├── shared/
│   ├── api/
│   │   ├── dashboard.service.ts      # Servicio para llamadas al backend
│   │   └── dashboard-client.ts       # Cliente API para el frontend
│   ├── types/
│   │   └── dashboard.ts              # Tipos TypeScript
│   ├── hooks/
│   │   └── use-dashboard.ts          # Hooks React para consumir datos
│   └── ui/
│       ├── loading.tsx               # Componentes de loading
│       └── error-display.tsx         # Componentes de error
└── features/
    └── stockPlansList/
        └── ui/
            └── stock-plans-table.tsx # Tabla de planes de acciones
```

## API Endpoints

### Dashboard Summary
- **GET** `/api/dashboard/summary`
- Retorna el resumen completo del dashboard incluyendo:
  - Resumen de stock plans (activos/inactivos)
  - Total de acciones asignadas, liberadas y pendientes
  - Lista de planes de acciones

### Stock Plans
- **GET** `/api/dashboard/stock-plans`
- Parámetros de consulta opcionales:
  - `contractType`: 'rsu' | 'peu'
  - `status`: 'pending' | 'in_progress' | 'released' | 'expired'
  - `employeeId`: string
- Retorna lista filtrada de planes de acciones

### Stock Plan por ID
- **GET** `/api/dashboard/stock-plans/:id`
- Retorna un plan de acciones específico por ID

## Tipos de Datos

### DashboardSummary
```typescript
interface DashboardSummary {
  stockPlansResume: StockPlansResume;
  totalAssigned: StockAssignment;
  totalReleased: StockAssignment;
  totalPending: StockAssignment;
  stockPlans: StockPlan[];
}
```

### StockPlan
```typescript
interface StockPlan {
  employee_id: string;
  employee_external_id: string;
  employee_last_name: string;
  employee_middle_name: string;
  employee_name: string;
  contract_name: string;
  contract_id: string;
  stock_plan_name: string;
  stock_plan_id: string;
  contract_external_id: string;
  contract_type: 'rsu' | 'peu';
  assignment_date: string;
  payment_frequency: 'monthly' | 'quarterly' | 'yearly' | 'triennial';
  vesting_schedule_status: 'pending' | 'in_progress' | 'released' | 'expired';
}
```

## Uso en Componentes

### Server Components
```typescript
// Usar directamente el cliente API en Server Components
import { DashboardApiClient } from '@/shared/api/dashboard-client';

export default async function DashboardPage() {
  const data = await DashboardApiClient.getDashboardSummary();
  return <div>{/* render data */}</div>;
}
```

### Client Components
```typescript
// Usar hooks en Client Components
'use client';
import { useDashboardSummary } from '@/shared/hooks/use-dashboard';

export function DashboardStats() {
  const { data, loading, error } = useDashboardSummary();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* render data */}</div>;
}
```

## Configuración

### Variables de Entorno
```bash
# URL del BFF (para el frontend)
NEXT_PUBLIC_API_URL=http://localhost:3000

# URL del backend externo (para el BFF)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

## Desarrollo

### Ejecutar el servidor de desarrollo
```bash
pnpm dev
```

### Probar los endpoints
```bash
# Dashboard summary
curl http://localhost:3000/api/dashboard/summary

# Stock plans con filtros
curl "http://localhost:3000/api/dashboard/stock-plans?contractType=rsu&status=in_progress"

# Stock plan específico
curl http://localhost:3000/api/dashboard/stock-plans/34565434565456
```

## Características

### Caching
- **Server Components**: Usa `next.revalidate` para cache automático
- **API Routes**: Headers de cache con `Cache-Control`
- **Client Hooks**: Manejo de estado optimizado con React

### Error Handling
- Manejo consistente de errores en todos los endpoints
- UI de error personalizada con opción de reintentar
- Logging de errores en consola

### Loading States
- Componentes de loading skeleton personalizados
- Estados de carga en hooks para client components
- Suspense boundaries para server components

### Filtrado
- Filtros opcionales en endpoints de stock plans
- Soporte para múltiples criterios de filtrado
- URLs limpias con search parameters

## Próximos Pasos

1. **Conectar con backend real**: Reemplazar `DashboardService` con llamadas reales
2. **Autenticación**: Implementar middleware de autenticación
3. **Paginación**: Añadir soporte para paginación en listados
4. **Validación**: Implementar validación de datos con Zod
5. **Testing**: Añadir tests unitarios e integración
6. **Optimización**: Implementar React Query para mejor cache management