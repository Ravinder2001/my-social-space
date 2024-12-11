/* eslint-disable  @typescript-eslint/no-explicit-any */
import { toast } from "react-hot-toast";

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  promise: (promise: Promise<any>, messages: { loading: string; success: JSX.Element | string; error: JSX.Element | string }) =>
    toast.promise(promise, messages),
  multiline: (message: string, duration: number = 6000) => toast(message, { duration }),
  icon: (message: string, icon: string) => toast(message, { icon }),
  custom: (render: (t: any) => JSX.Element) => toast.custom(render),
};
