// src/hooks/useReminders.ts
import { useState, useCallback } from 'react';
import { reminderApi } from '../api/reminderApi';
import { Reminder, ReminderFormData } from '../types/reminder';
import toast from 'react-hot-toast';

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllReminders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reminderApi.getAllReminders();
      setReminders(data);
    } catch {
      setError('Failed to load reminders.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createReminder = async (jobId: number, data: ReminderFormData): Promise<boolean> => {
    try {
      const newReminder = await reminderApi.createReminder(jobId, data);
      setReminders((prev) => [newReminder, ...prev]);
      toast.success('Reminder created!');
      return true;
    } catch {
      toast.error('Failed to create reminder.');
      return false;
    }
  };

  const completeReminder = async (id: number): Promise<boolean> => {
    try {
      const updated = await reminderApi.completeReminder(id);
      setReminders((prev) => prev.map((r) => (r.id === id ? updated : r)));
      toast.success('Reminder marked as complete!');
      return true;
    } catch {
      toast.error('Failed to complete reminder.');
      return false;
    }
  };

  const deleteReminder = async (id: number): Promise<boolean> => {
    try {
      await reminderApi.deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
      toast.success('Reminder deleted.');
      return true;
    } catch {
      toast.error('Failed to delete reminder.');
      return false;
    }
  };

  return { reminders, loading, error, fetchAllReminders, createReminder, completeReminder, deleteReminder };
}

