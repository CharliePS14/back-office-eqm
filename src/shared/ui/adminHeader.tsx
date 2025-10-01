"use client";

import { ModalNewClient, useModalNewClient } from "@/widgets/modalNewClient";
import { Notification } from "./notification";
import { useNotification } from "@/shared/hooks/useNotification";

export function AdminHeader() {
  const { notification, hideNotification, showSuccess, showError } =
    useNotification();

  const { isOpen, openModal, closeModal, handleSubmit } = useModalNewClient({
    onSuccess: (message) => showSuccess("Empresa creada exitosamente", message),
    onError: (message) => showError("Error al crear la empresa", message),
  });

  return (
    <>
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
              <button
                onClick={openModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Nuevo Cliente
              </button>
            </div>
          </div>
        </div>
      </header>

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
    </>
  );
}
