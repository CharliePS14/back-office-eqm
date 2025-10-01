"use client";

import { useEffect, useState } from "react";

interface NotificationProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function Notification({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  duration = 5000,
}: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 300);
  };

  if (!isVisible && !isExiting) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-green-50 border-green-200",
          icon: "✅",
          iconBg: "bg-green-100",
          title: "text-green-800",
          message: "text-green-700",
          button: "text-green-500 hover:text-green-600",
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200",
          icon: "❌",
          iconBg: "bg-red-100",
          title: "text-red-800",
          message: "text-red-700",
          button: "text-red-500 hover:text-red-600",
        };
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-200",
          icon: "⚠️",
          iconBg: "bg-yellow-100",
          title: "text-yellow-800",
          message: "text-yellow-700",
          button: "text-yellow-500 hover:text-yellow-600",
        };
      case "info":
        return {
          container: "bg-blue-50 border-blue-200",
          icon: "ℹ️",
          iconBg: "bg-blue-100",
          title: "text-blue-800",
          message: "text-blue-700",
          button: "text-blue-500 hover:text-blue-600",
        };
      default:
        return {
          container: "bg-gray-50 border-gray-200",
          icon: "ℹ️",
          iconBg: "bg-gray-100",
          title: "text-gray-800",
          message: "text-gray-700",
          button: "text-gray-500 hover:text-gray-600",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          max-w-sm w-full border rounded-lg shadow-lg p-4 transition-all duration-300 transform
          ${styles.container}
          ${isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}
        `}
      >
        <div className="flex items-start">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${styles.iconBg}`}
          >
            <span className="text-sm">{styles.icon}</span>
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
            <p className={`mt-1 text-sm ${styles.message}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${styles.button}`}
            >
              <span className="sr-only">Cerrar</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
