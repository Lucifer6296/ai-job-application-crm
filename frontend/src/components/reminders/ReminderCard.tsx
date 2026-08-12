import { Reminder } from '../../types/reminder';
import { formatDateTime, isOverdue } from '../../utils/date';
import { Bell, CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react';
import Button from '../common/Button';

interface ReminderCardProps {
  reminder: Reminder;
  onComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
  completing?: boolean;
}

export default function ReminderCard({ reminder, onComplete, onDelete, completing }: ReminderCardProps) {
  const overdue = !reminder.completed && isOverdue(reminder.reminderTime);

  let borderClass = 'border-slate-100';
  let bgClass = 'bg-white';
  let iconEl = <Bell size={16} className="text-brand-500" />;

  if (reminder.completed) {
    borderClass = 'border-emerald-100';
    bgClass = 'bg-emerald-50/50';
    iconEl = <CheckCircle size={16} className="text-emerald-500" />;
  } else if (overdue) {
    borderClass = 'border-red-200';
    bgClass = 'bg-red-50';
    iconEl = <AlertCircle size={16} className="text-red-500" />;
  }

  return (
    <div className={`rounded-2xl border ${borderClass} ${bgClass} p-4 transition-all duration-200`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{iconEl}</div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${reminder.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
            {reminder.title}
          </p>
          {reminder.job && (
            <p className="text-xs text-slate-400 truncate mt-0.5">
              {reminder.job.company} — {reminder.job.position}
            </p>
          )}
          <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${
            overdue ? 'text-red-500' : reminder.completed ? 'text-emerald-500' : 'text-slate-400'
          }`}>
            <Clock size={11} />
            <span>
              {reminder.completed ? 'Completed' : overdue ? '⚠ Overdue — ' : ''}
              {formatDateTime(reminder.reminderTime)}
            </span>
          </div>
          {reminder.emailSent && (
            <span className="inline-flex items-center gap-1 mt-1.5 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              📧 Email sent
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!reminder.completed && onComplete && (
            <Button
              variant="secondary"
              size="sm"
              loading={completing}
              onClick={() => onComplete(reminder.id)}
              id={`reminder-complete-${reminder.id}`}
            >
              <CheckCircle size={13} />
              Done
            </Button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(reminder.id)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              title="Delete reminder"
              id={`reminder-delete-${reminder.id}`}
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

