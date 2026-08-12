// src/components/reminders/ReminderForm.tsx
import { useState } from 'react';
import { ReminderFormData } from '../../types/reminder';
import Input from '../common/Input';
import Button from '../common/Button';
import { Bell, Calendar } from 'lucide-react';

interface ReminderFormProps {
  onSubmit: (data: ReminderFormData) => Promise<boolean>;
  onCancel: () => void;
}

export default function ReminderForm({ onSubmit, onCancel }: ReminderFormProps) {
  const [form, setForm] = useState<ReminderFormData>({ title: '', reminderTime: '' });
  const [errors, setErrors] = useState<Partial<ReminderFormData>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Partial<ReminderFormData> = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.reminderTime) errs.reminderTime = 'Date and time are required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Convert datetime-local value to ISO format expected by backend
    const data: ReminderFormData = {
      title: form.title.trim(),
      reminderTime: new Date(form.reminderTime).toISOString().slice(0, 19),
    };
    const success = await onSubmit(data);
    setLoading(false);
    if (success) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="reminder-form">
      <Input
        label="Reminder Title"
        value={form.title}
        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        error={errors.title}
        placeholder="e.g. Follow up with HR"
        icon={<Bell size={16} />}
        id="reminder-title"
      />
      <Input
        label="Date & Time"
        type="datetime-local"
        value={form.reminderTime}
        onChange={(e) => setForm((prev) => ({ ...prev, reminderTime: e.target.value }))}
        error={errors.reminderTime}
        icon={<Calendar size={16} />}
        id="reminder-datetime"
      />
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" loading={loading} id="reminder-form-submit">
          Create Reminder
        </Button>
      </div>
    </form>
  );
}
