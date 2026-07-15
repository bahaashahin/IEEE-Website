import { useEffect } from "react";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";

interface ToastNotificationProps {
  message: string | null;
  type?: "error" | "success";
  onClose: () => void;
  duration?: number;
}

export const ToastNotification = ({
  message,
  type = "error",
  onClose,
  duration = 5000,
}: ToastNotificationProps) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999999] animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md max-w-sm ${
          type === "error"
            ? "bg-red-500/10 border-red-500/20 text-red-200"
            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
        }`}
      >
        {type === "error" ? (
          <FiAlertCircle className="text-red-400 shrink-0" size={18} />
        ) : (
          <FiCheckCircle className="text-emerald-400 shrink-0" size={18} />
        )}
        <p className="text-xs font-semibold leading-relaxed pr-2">{message}</p>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg transition shrink-0 ${
            type === "error"
              ? "hover:bg-red-500/20 text-red-400 hover:text-white"
              : "hover:bg-emerald-500/20 text-emerald-400 hover:text-white"
          }`}
          aria-label="Dismiss message"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};
