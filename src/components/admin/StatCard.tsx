import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  trendPositive?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendPositive = true,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>

        <div className="p-3 bg-[#F47920]/10 text-[#F47920] rounded-xl shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(description || trend) && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50 text-xs">
          {trend && (
            <span
              className={`font-semibold px-1.5 py-0.5 rounded-md ${
                trendPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {trend}
            </span>
          )}
          {description && <span className="text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  );
}
