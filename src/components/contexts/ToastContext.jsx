import { createContext, useContext, useState } from "react";
import MySnackBar from "../MySnackBar";
export const ToastContext = createContext({});

export default function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  function showHideToast(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }
  return (
    <>
      <ToastContext.Provider value={{ showHideToast }}>
        <MySnackBar open={open} message={message} />
        {children}
      </ToastContext.Provider>
    </>
  );
}
// Custom hook
export const useToast = () => {
  return useContext(ToastContext);
};
