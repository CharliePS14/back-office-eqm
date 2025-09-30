import { Suspense } from 'react';

const mockNotifications = [
  { id: '3', title: 'Error al fimar el contrato ', message: 'El usuario ID: 134244 Jose Juan tuvo un error al firmar su contrato', type: 'error', priority: 'urgent', isRead: true, createdAt: '2025-09-30T09:30:00Z' },
];

// Componente de estadísticas rápidas
function StatsCards() {
  const stats = [
    { title: 'Acciones Asignadas', value: '100', change: '20 PEU | 80 RSU', changeType: 'neutral', icon: '📦' },
    { title: 'Acciones Liberadas', value: '5000', change: '1220 PEU | 3000 RSU', changeType: 'positive', icon: '🔔' },
    { title: 'Acciones Pendientes', value: '300', change: '120 PEU | 180 RSU', changeType: 'negative', icon: '🔔' },
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
             10 Activos
            </span>
            <span className={`text-sm font-medium text-red-600`}>
             1 Inactivo
            </span>
            <span className="text-sm text-gray-500 ml-2">desde ayer</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' :
              stat.changeType === 'negative' ? 'text-red-600' :
              stat.changeType === 'warning' ? 'text-yellow-600' :
              'text-gray-600'
            }`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
    </div>
    
  );
}

// Componente de notificaciones recientes
function RecentNotifications() {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Notificaciones Recientes</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <div key={notification.id} className={`p-4 rounded-lg border-l-4 ${
              notification.priority === 'urgent' ? 'border-red-500 bg-red-50' :
              notification.priority === 'high' ? 'border-yellow-500 bg-yellow-50' :
              notification.priority === 'medium' ? 'border-blue-500 bg-blue-50' :
              'border-gray-500 bg-gray-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.createdAt).toLocaleString('es-ES')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    notification.type === 'error' ? 'bg-red-100 text-red-800' :
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    notification.type === 'success' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {notification.type}
                  </span>
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
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
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg mb-8"></div>}>
          <StatsCards />
        </Suspense>

        {/* Bottom Section - Notificaciones */}
        <div className="mt-8">
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>}>
            <RecentNotifications />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
