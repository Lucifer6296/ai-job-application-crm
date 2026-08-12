// src/components/dashboard/ApplicationChart.tsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import { DashboardStats } from '../../types/dashboard';
import { CHART_COLORS } from '../../utils/constants';
import EmptyState from '../common/EmptyState';
import { BarChart2 } from 'lucide-react';

interface ApplicationChartProps {
  stats: DashboardStats;
}

export default function ApplicationChart({ stats }: ApplicationChartProps) {
  const data = [
    { name: 'Applied', value: stats.applied },
    { name: 'Interview', value: stats.interview },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Selected', value: stats.selected },
  ].filter((d) => d.value > 0);

  if (data.length === 0 || stats.total === 0) {
    return (
      <EmptyState
        title="No chart data yet"
        description="Add applications to see your progress visualized."
        icon={<BarChart2 size={28} />}
      />
    );
  }

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-lg px-3 py-2">
          <p className="text-xs font-semibold text-slate-900">{payload[0].name}</p>
          <p className="text-lg font-bold text-brand-600">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-3">Applications by Status</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barCategoryGap="35%">
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={CHART_COLORS[entry.name] || '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-3">Distribution</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={CHART_COLORS[entry.name] || '#6366f1'} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
