// src/components/dashboard/UpcomingReminders.tsx
import { Reminder } from '../../types/reminder';
import { formatDateTime, isOverdue } from '../../utils/date';
import EmptyState from '../common/EmptyState';
import { Bell, AlertCircle } from 'lucide-react';

interface UpcomingRemindersProps {
  reminders: Reminder[];
}

export default function UpcomingReminders({ reminders }: UpcomingRemindersProps) {
  const upcoming = reminders
    .filter((r) => !r.completed)
    .slice(0, 5);

  if (upcoming.length === 0) {
    return (
      <EmptyState
        title="No upcoming reminders"
        description="Set reminders for follow-ups and interviews."
        icon={<Bell size={24} />}
      />
    );
  }

  return (
    <div className="space-y-2">
      {upcoming.map((reminder) => {
        const overdue = isOverdue(reminder.reminderTime);
        return (
          <div
            key={reminder.id}
            className={`flex items-start gap-3 p-3 rounded-xl border ${
              overdue ? 'border-red-200 bg-red-50' : 'border-slate-100 bg-slate-50'
            }`}
          >
            <div className={`mt-0.5 shrink-0 ${overdue ? 'text-red-500' : 'text-brand-500'}`}>
              {overdue ? <AlertCircle size={16} /> : <Bell size={16} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{reminder.title}</p>
              {reminder.job && (
                <p className="text-xs text-slate-400 truncate">
                  {reminder.job.company} — {reminder.job.position}
                </p>
              )}
              <p className={`text-xs font-medium mt-0.5 ${overdue ? 'text-red-500' : 'text-slate-400'}`}>
                {overdue ? '⚠ Overdue — ' : ''}{formatDateTime(reminder.reminderTime)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
