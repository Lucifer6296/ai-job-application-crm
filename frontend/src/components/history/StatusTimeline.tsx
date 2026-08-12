// src/components/history/StatusTimeline.tsx
import { JobStatusHistory } from '../../types/job';
import { formatDateTime } from '../../utils/date';
import { STATUS_DOT_COLORS } from '../../utils/constants';
import EmptyState from '../common/EmptyState';
import { GitBranch } from 'lucide-react';

interface StatusTimelineProps {
  history: JobStatusHistory[];
}

export default function StatusTimeline({ history }: StatusTimelineProps) {
  if (history.length === 0) {
    return (
      <EmptyState
        title="No history yet"
        description="Status changes will appear here as you update the application."
        icon={<GitBranch size={24} />}
      />
    );
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-100" />
      <div className="space-y-6">
        {history.map((item, index) => {
          const dotColor = STATUS_DOT_COLORS[item.status] || 'bg-brand-500';
          const isLast = index === history.length - 1;
          return (
            <div key={item.id} className="relative flex items-start gap-4">
              {/* Dot */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full ${dotColor} flex items-center justify-center shadow-md shrink-0`}
              >
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              {/* Content */}
              <div className={`flex-1 pb-2 ${isLast ? '' : ''}`}>
                <div className="bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm">
                  <p className="font-semibold text-slate-900 text-sm">{item.status}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatDateTime(item.changedAt)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
