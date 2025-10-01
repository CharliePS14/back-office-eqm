# Stock Plan Detail Feature

Este feature implementa la vista detallada de un stock plan específico, mostrando un listado de contratos asociados con funcionalidad de filtrado.

## Estructura

```
src/features/stockPlanDetail/
├── ui/
│   ├── stock-plan-detail-view.tsx     # Componente principal con filtros
│   ├── stock-plan-detail-card.tsx     # Card con resumen del stock plan
│   └── stock-plan-detail-loading.tsx  # Componente de loading
├── index.ts                           # Exportaciones del feature
```

## API Endpoints

### Stock Plan Detail
- **GET** `/api/stock-plan/[id]/detail`
- Retorna información detallada del stock plan:
  - Información básica del plan
  - Lista de contratos asociados
  - Resumen estadístico (totales por tipo y estado)

## Tipos de Datos

### StockPlanDetail
```typescript
interface StockPlanDetail {
  stock_plan_id: string;
  stock_plan_name: string;
  external_id: string;
  title: string;
  total_non_vestedshares: number;
  contracts: Contract[];
  summary: {
    total_contracts: number;
    active_contracts: number;
    total_employees: number;
    breakdown_by_type: { peu: number; rsu: number; };
    breakdown_by_status: { pending: number; in_progress: number; released: number; expired: number; };
  };
}
```

### Contract
```typescript
interface Contract {
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
  contract_type: 'peu' | 'rsu';
  assignment_date: string;
  payment_frequency: 'monthly' | 'quarterly' | 'yearly' | 'triennial';
  vesting_schedule_status: 'pending' | 'in_progress' | 'released' | 'expired';
}
```

## Componentes

### StockPlanDetailView
Componente principal que integra:
- Card de resumen del stock plan
- Filtros para contratos
- Tabla de contratos

**Props:**
```typescript
interface StockPlanDetailViewProps {
  stockPlanId: string;
}
```

### StockPlanDetailCard
Muestra información del stock plan y estadísticas:
- Título y IDs del plan
- Métricas principales (acciones, contratos, empleados)
- Breakdown por tipo de contrato y estado

### Filtros Disponibles
- **Tipo de Contrato**: RSU, PEU
- **Estado**: Pendiente, En Progreso, Liberado, Expirado
- **Empleado**: Búsqueda por nombre o ID

## Navegación

### Desde Stock Plans List
La tabla de stock plans tiene click handlers que navegan a:
```
/admin/stock-plan/[ID]
```

### Breadcrumb
La página de detalle incluye navegación de vuelta al dashboard principal.

## Hooks Personalizados

### useStockPlanDetail
```typescript
const { data, loading, error, refetch } = useStockPlanDetail(stockPlanId);
```

### useFilteredContracts
```typescript
const filteredContracts = useFilteredContracts(contracts, {
  contractType: 'rsu',
  status: 'in_progress',
  employeeId: 'E00021'
});
```

## Estados de UI

### Loading State
- Skeleton components para card de resumen
- Loading placeholders para filtros
- Table loading con múltiples rows

### Error State
- Error display con opción de retry
- Manejo de stock plan no encontrado
- Errors de conexión de red

### Empty State
- Mensaje cuando no hay contratos
- UI específica para filtros sin resultados

## Uso

### Server Component (página)
```typescript
import { StockPlanDetailView } from '@/features/stockPlanDetail';

export default async function StockPlanDetailPage({ params }) {
  const { ID } = await params;
  return <StockPlanDetailView stockPlanId={ID} />;
}
```

### Navegación desde lista
```typescript
const router = useRouter();
const handleRowClick = () => {
  router.push(`/admin/stock-plan/${plan.stock_plan_id}`);
};
```

## Mock Data

El servicio incluye datos mock para desarrollo:
- 4 contratos de ejemplo por stock plan
- Diferentes tipos de contrato (RSU/PEU)
- Varios estados de vesting
- Datos realistas de empleados

## Rutas

- **Página Principal**: `/admin/stock-plan/[ID]`
- **API Endpoint**: `/api/stock-plan/[id]/detail`

## Características

### Interactividad
- ✅ Click en fila para ver detalle
- ✅ Filtrado en tiempo real
- ✅ Limpieza de filtros
- ✅ Breadcrumb navigation

### Performance
- ✅ Caching con Next.js revalidate
- ✅ Filtrado client-side optimizado
- ✅ Loading states granulares

### UX/UI
- ✅ Cards estadísticos informativos
- ✅ Badges de estado y tipo
- ✅ Tabla responsive
- ✅ Estados vacíos informativos

## Próximos Pasos

1. **Detalles de Contrato**: Página individual para cada contrato
2. **Acciones Masivas**: Selección múltiple de contratos
3. **Exportación**: Funcionalidad de export to CSV/Excel
4. **Histórico**: Vista de cambios en el stock plan
5. **Notificaciones**: Alertas por cambios de estado