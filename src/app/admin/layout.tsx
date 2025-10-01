"use client";

import { useState } from "react";
import { cn } from "../../shared/lib/utils";
import { ModalNewClient, useModalNewClient } from "@/widgets/modalNewClient";
import { Notification } from "@/shared/ui/notification";
import { useNotification } from "@/shared/hooks/useNotification";

// Layout específico para la sección de admin
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const { notification, hideNotification, showSuccess, showError } =
    useNotification();

  const { isOpen, openModal, closeModal, handleSubmit } = useModalNewClient({
    onSuccess: (message) => showSuccess("Empresa creada exitosamente", message),
    onError: (message) => showError("Error al crear la empresa", message),
  });

  const clients = [
    {
      id: "1",
      name: "Walmart",
      email: "contacto@walmart.com",
      image: "/walmart.png",
    },
    {
      id: "2",
      name: "Grupo Mexico",
      email: "info@empresab.com",
      image: "/gm.png",
    },
    {
      id: "3",
      name: "AeroMexico",
      email: "ventas@empresac.com",
      image: "/aero.jpeg",
    },
  ];

  const toggleOption = (clientId: string) => {
    setActiveClient((prev) => (prev === clientId ? null : clientId));
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Back Office EQM</h2>
          <p className="text-sm text-gray-600">Panel de Control</p>
        </div>

        <nav className="mt-6">
          <div className="px-6 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Principal
            </h3>
          </div>

          <ul className="mt-2 space-y-1">
            {clients.map((client) => (
              <li key={client.id}>
                <button
                  onClick={() => toggleOption(client.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-6 py-2 text-sm font-medium text-blue-700 border-r-2 border-blue-700 hover:bg-blue-100 transition-colors",
                    activeClient === client.id && "bg-blue-50",
                  )}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      {client.image && (
                        <img
                          src={client.image}
                          alt={`${client.name} Logo`}
                          className="w-4 h-4"
                        />
                      )}
                    </span>
                    {client.name}
                  </div>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={openModal}
                className="flex justify-center items-center px-6 py-2 h-6 mx-6 my-3 w-auto border border-dashed border-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <span className="text-gray-500 text-xl">+</span>
              </button>
            </li>
          </ul>

          <div className="px-6 py-2 mt-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Configuración
            </h3>
          </div>

          <ul className="mt-2 space-y-1">
            <li>
              <a
                href="/admin/settings"
                className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <span className="mr-3">⚙️</span>
                Configuración
              </a>
            </li>
            <li>
              <a
                href="/admin/reports"
                className="flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <span className="mr-3">📈</span>
                Reportes
              </a>
            </li>
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Modal New Client */}
      <ModalNewClient
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      {/* Notification */}
      <Notification
        type={notification.type}
        title={notification.title}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
}
