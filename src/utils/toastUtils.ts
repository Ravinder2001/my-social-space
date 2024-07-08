// toastUtils.ts
import { toast } from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "default";

const showToast = (message: string, type: ToastType = "default") => {
  const defaultOptions = {
    duration: 4000,
    position: "top-right" as const,
    style: {
      background: "#333",
      color: "#fff",
    },
  };

  switch (type) {
    case "success":
      toast.success(message, {
        ...defaultOptions,
        style: {
          ...defaultOptions.style,
          background: "green",
        },
      });
      break;
    case "error":
      toast.error(message, {
        ...defaultOptions,
        style: {
          ...defaultOptions.style,
          background: "red",
        },
      });
      break;
    case "loading":
      toast.loading(message, defaultOptions);
      break;
    default:
      toast.success(message, defaultOptions);
  }
};

export default showToast;
