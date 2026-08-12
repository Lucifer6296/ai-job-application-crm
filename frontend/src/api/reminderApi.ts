// src/api/reminderApi.ts
import apiClient from './axios';
import type { Reminder, ReminderFormData } from '../types/reminder';

export const reminderApi = {
  createReminder: async (jobId: number, data: ReminderFormData): Promise<Reminder> => {
    const response = await apiClient.post<Reminder>(`/api/reminders/job/${jobId}`, data);
    return response.data;
  },

  getRemindersForJob: async (jobId: number): Promise<Reminder[]> => {
    const response = await apiClient.get<Reminder[]>(`/api/reminders/job/${jobId}`);
    return response.data;
  },

  getAllReminders: async (): Promise<Reminder[]> => {
    const response = await apiClient.get<Reminder[]>('/api/reminders');
    return response.data;
  },

  completeReminder: async (id: number): Promise<Reminder> => {
    const response = await apiClient.patch<Reminder>(`/api/reminders/${id}/complete`);
    return response.data;
  },

  deleteReminder: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/reminders/${id}`);
  },
};

