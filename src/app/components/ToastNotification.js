import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastNotification(message) {
  toast.success(message, {
    theme: "light",
  });
}
