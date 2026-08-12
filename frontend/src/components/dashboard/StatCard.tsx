// src/components/dashboard/StatCard.tsx
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  color: string;
  bgColor: string;
}

export default function StatCard({ label, value, icon, color, bgColor }: StatCardProps) {
  return (
    <div className="stat-card flex items-center gap-4">
      <div className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center ${color} shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</p>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
      </div>
    </div>
  );
}
