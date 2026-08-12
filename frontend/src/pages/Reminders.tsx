// src/pages/Reminders.tsx
import { useEffect, useState } from 'react';
import { useReminders } from '../hooks/useReminders';
import { reminderApi } from '../api/reminderApi';
import { Reminder } from '../types/reminder';
import ReminderCard from '../components/reminders/ReminderCard';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import { PageLoader } from '../components/common/Spinner';
import { Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { isOverdue } from '../utils/date';

export default function Reminders() {
  const { reminders, loading, error, fetchAllReminders, deleteReminder } = useReminders();
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [localReminders, setLocalReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    fetchAllReminders();
  }, []);

  useEffect(() => {
    setLocalReminders(reminders);
  }, [reminders]);

  const handleComplete = async (id: number) => {
    setCompletingId(id);
    try {
      const updated = await reminderApi.completeReminder(id);
      setLocalReminders((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } finally {
      setCompletingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const success = await deleteReminder(id);
    if (success) {
      setLocalReminders((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const overdue = localReminders.filter((r) => !r.completed && isOverdue(r.reminderTime));
  const upcoming = localReminders.filter((r) => !r.completed && !isOverdue(r.reminderTime));
  const completed = localReminders.filter((r) => r.completed);

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAllReminders} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Reminders</h2>
        <p className="text-sm text-slate-400 mt-0.5">Stay on top of your follow-ups and interviews</p>
      </div>

      {localReminders.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No reminders yet"
            description="Add reminders from within a job application to set follow-up alerts."
            icon={<Bell size={28} />}
          />
        </div>
      ) : (
        <>
          {/* Overdue */}
          {overdue.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={16} className="text-red-500" />
                <h3 className="text-sm font-semibold text-red-600">Overdue ({overdue.length})</h3>
              </div>
              <div className="space-y-3">
                {overdue.map((r) => (
                  <ReminderCard
                    key={r.id}
                    reminder={r}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    completing={completingId === r.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-brand-600" />
                <h3 className="text-sm font-semibold text-slate-700">Upcoming ({upcoming.length})</h3>
              </div>
              <div className="space-y-3">
                {upcoming.map((r) => (
                  <ReminderCard
                    key={r.id}
                    reminder={r}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                    completing={completingId === r.id}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={16} className="text-emerald-500" />
                <h3 className="text-sm font-semibold text-slate-400">Completed ({completed.length})</h3>
              </div>
              <div className="space-y-3">
                {completed.map((r) => (
                  <ReminderCard
                    key={r.id}
                    reminder={r}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
