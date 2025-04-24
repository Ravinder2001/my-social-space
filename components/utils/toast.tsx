"use client";

import toast, { Toaster as ReactHotToaster } from "react-hot-toast";

// Define toast types for autocompletion
type ToastType = "success" | "error" | "info" | "loading";

// Define toast positions for autocompletion
type ToastPosition = "top-right" | "top-center" | "bottom-right" | "bottom-center";

// Common CSS styles for all toasts
const baseToastStyle: React.CSSProperties = {
  fontSize: "16px",
  borderRadius: "8px",
  padding: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  color: "#FFFFFF",
  maxWidth: "400px",
};

// Define toast variants for reusability
export const showToast = ({
  message,
  type = "success",
  duration = 4000,
  position = "top-right",
}: {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}) => {
  switch (type) {
    case "success":
      toast.success(message, {
        duration,
        position,
        style: {
          ...baseToastStyle,
          background: "#10B981",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#10B981",
        },
      });
      break;
    case "error":
      toast.error(message, {
        duration,
        position,
        style: {
          ...baseToastStyle,
          background: "#EF4444",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#EF4444",
        },
      });
      break;
    case "info":
      toast(message, {
        duration,
        position,
        style: {
          ...baseToastStyle,
          background: "#3B82F6",
        },
        icon: "ℹ️",
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#3B82F6",
        },
      });
      break;
    case "loading":
      toast.loading(message, {
        duration,
        position,
        style: {
          ...baseToastStyle,
          background: "#6B7280",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#6B7280",
        },
      });
      break;
    default:
      toast(message, {
        duration,
        position,
        style: baseToastStyle,
      });
  }
};

// Export the Toaster component to be used in the app's layout
export const Toaster = () => (
  <ReactHotToaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: baseToastStyle,
    }}
    containerStyle={{
      zIndex: 9999,
    }}
  />
);