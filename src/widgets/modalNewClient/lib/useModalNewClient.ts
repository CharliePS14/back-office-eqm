import { useState } from "react";
import { NewClientData } from "../types";

interface UseModalNewClientProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function useModalNewClient({
  onSuccess,
  onError,
}: UseModalNewClientProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (data: NewClientData) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to create new client
      console.log("Creating new client:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      closeModal();

      onSuccess?.(
        `La empresa "${data.name}" ha sido registrada correctamente.`,
      );

      // TODO: Refresh client list
    } catch (error) {
      console.error("Error creating client:", error);
      onError?.(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al crear la empresa.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    isLoading,
    openModal,
    closeModal,
    handleSubmit,
  };
}
