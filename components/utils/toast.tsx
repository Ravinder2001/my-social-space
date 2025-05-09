"use client";
import React from "react";
import toast, { Toaster as ReactHotToaster } from "react-hot-toast";

// Define toast types for autocompletion
type ToastType = "success" | "error" | "info" | "loading" | "notification";

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

interface ShowToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  name?: string; // only for "notification"
  picture?: string; // only for "notification"
}

// Define toast variants for reusability
export const showToast = ({
  message,
  type = "success",
  duration = 4000,
  position = "top-right",
  name,
  picture,
}: ShowToastProps) => {
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
    case "notification":
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img className="h-10 w-10 rounded-full" src={picture} alt="" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{name}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
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
