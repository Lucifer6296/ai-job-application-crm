// src/types/reminder.ts
export interface Reminder {
  id: number;
  title: string;
  reminderTime: string;
  completed: boolean;
  emailSent: boolean;
  job?: {
    id: number;
    company: string;
    position: string;
  };
}

export interface ReminderFormData {
  title: string;
  reminderTime: string;
}
