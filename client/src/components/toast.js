import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = (msg) => {
  toast.success(msg, {
    position: "top-right",
    theme: "dark",
  });
};
export const error = (msg) => {
  toast.error(msg, {
    position: "top-right",
    theme: "dark",
  });
};
