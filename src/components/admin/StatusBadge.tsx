import React from "react";

type StatusType = "Published" | "Draft" | "New" | "Contacted" | "Closed" | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  let badgeStyles = "bg-gray-100 text-gray-700 border-gray-200";

  switch (status) {
    case "Published":
      badgeStyles = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    case "Draft":
      badgeStyles = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "New":
      badgeStyles = "bg-[#F47920]/10 text-[#F47920] border-[#F47920]/30 font-medium";
      break;
    case "Contacted":
      badgeStyles = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case "Closed":
      badgeStyles = "bg-gray-100 text-gray-600 border-gray-200";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${badgeStyles} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {status}
    </span>
  );
}
