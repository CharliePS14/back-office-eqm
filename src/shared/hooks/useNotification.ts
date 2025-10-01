import { useState } from "react";

interface NotificationState {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  isVisible: boolean;
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationState>({
    type: "info",
    title: "",
    message: "",
    isVisible: false,
  });

  const showNotification = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message: string,
  ) => {
    setNotification({
      type,
      title,
      message,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const showSuccess = (title: string, message: string) => {
    showNotification("success", title, message);
  };

  const showError = (title: string, message: string) => {
    showNotification("error", title, message);
  };

  const showWarning = (title: string, message: string) => {
    showNotification("warning", title, message);
  };

  const showInfo = (title: string, message: string) => {
    showNotification("info", title, message);
  };

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}
