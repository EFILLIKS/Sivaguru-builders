import React from "react";
import { FolderOpen, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading content..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 min-h-[250px]">
      <Loader2 className="w-8 h-8 text-[#F47920] animate-spin mb-3" />
      <p className="text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export function EmptyState({
  title = "No items found",
  description = "There are currently no items to display.",
  actionText,
  onAction,
  icon: Icon = FolderOpen,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 text-center min-h-[300px]">
      <div className="p-4 bg-gray-50 text-gray-400 rounded-full mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mt-1 mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} className="px-5 py-2.5 bg-[#F47920] text-white text-xs uppercase font-semibold rounded-xl">
          {actionText}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-red-50/50 rounded-2xl border border-red-100 text-center min-h-[250px]">
      <div className="p-3 bg-red-100 text-red-600 rounded-full mb-3">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-red-900">{title}</h3>
      <p className="text-xs text-red-600 max-w-sm mt-1 mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-xl transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
