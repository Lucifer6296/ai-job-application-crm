// src/components/jobs/JobForm.tsx
import { useState } from 'react';
import { Job, JobFormData, JobStatus } from '../../types/job';
import { JOB_STATUSES } from '../../utils/constants';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Building2, MapPin, Link, Briefcase } from 'lucide-react';

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: JobFormData) => Promise<boolean>;
  onCancel: () => void;
}

interface FormErrors {
  company?: string;
  position?: string;
  location?: string;
  status?: string;
}

export default function JobForm({ initialData, onSubmit, onCancel }: JobFormProps) {
  const [form, setForm] = useState<JobFormData>({
    company: initialData?.company ?? '',
    position: initialData?.position ?? '',
    status: (initialData?.status as JobStatus) ?? 'Applied',
    location: initialData?.location ?? '',
    jobLink: initialData?.jobLink ?? '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.company.trim()) errs.company = 'Company is required';
    if (!form.position.trim()) errs.position = 'Position is required';
    if (!form.location.trim()) errs.location = 'Location is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field: keyof JobFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const success = await onSubmit(form);
    setLoading(false);
    if (success) onCancel();
  };

  const statusOptions = JOB_STATUSES.map((s) => ({ value: s, label: s }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="job-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Company"
          value={form.company}
          onChange={(e) => handleChange('company', e.target.value)}
          error={errors.company}
          placeholder="e.g. Google"
          icon={<Building2 size={16} />}
          id="job-form-company"
        />
        <Input
          label="Position"
          value={form.position}
          onChange={(e) => handleChange('position', e.target.value)}
          error={errors.position}
          placeholder="e.g. Software Engineer"
          icon={<Briefcase size={16} />}
          id="job-form-position"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          value={form.location}
          onChange={(e) => handleChange('location', e.target.value)}
          error={errors.location}
          placeholder="e.g. Bangalore"
          icon={<MapPin size={16} />}
          id="job-form-location"
        />
        <Select
          label="Status"
          value={form.status}
          onChange={(e) => handleChange('status', e.target.value as JobStatus)}
          options={statusOptions}
          id="job-form-status"
        />
      </div>
      <Input
        label="Job Link (optional)"
        value={form.jobLink ?? ''}
        onChange={(e) => handleChange('jobLink', e.target.value)}
        placeholder="https://..."
        icon={<Link size={16} />}
        id="job-form-joblink"
      />
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" loading={loading} id="job-form-submit">
          {initialData ? 'Update Application' : 'Add Application'}
        </Button>
      </div>
    </form>
  );
}
