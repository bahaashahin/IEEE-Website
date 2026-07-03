import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
      <div className="flex items-center gap-3 text-red-400">
        <AlertTriangle size={24} />
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-semibold transition"
        >
          <RefreshCcw size={16} /> Retry
        </button>
      )}
    </div>
  );
};
