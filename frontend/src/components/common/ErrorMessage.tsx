// src/components/common/ErrorMessage.tsx
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500">
        <AlertCircle size={24} />
      </div>
      <p className="text-sm font-medium text-slate-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-brand-600 hover:text-brand-700 font-medium underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
