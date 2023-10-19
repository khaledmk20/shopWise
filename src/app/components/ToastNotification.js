import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastNotification(message) {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
