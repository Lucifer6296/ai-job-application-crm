// src/utils/constants.ts
export const JOB_STATUSES = ['Applied', 'Interview', 'Rejected', 'Selected'] as const;

export const STATUS_COLORS: Record<string, string> = {
  Applied: 'badge-applied',
  Interview: 'badge-interview',
  Rejected: 'badge-rejected',
  Selected: 'badge-selected',
};

export const STATUS_DOT_COLORS: Record<string, string> = {
  Applied: 'bg-blue-500',
  Interview: 'bg-amber-500',
  Rejected: 'bg-red-500',
  Selected: 'bg-emerald-500',
};

export const STATUS_BG_COLORS: Record<string, string> = {
  Applied: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  Interview: 'from-amber-50 to-amber-100 border-amber-200 text-amber-700',
  Rejected: 'from-red-50 to-red-100 border-red-200 text-red-700',
  Selected: 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700',
};

export const CHART_COLORS: Record<string, string> = {
  Applied: '#3b82f6',
  Interview: '#f59e0b',
  Rejected: '#ef4444',
  Selected: '#10b981',
};
