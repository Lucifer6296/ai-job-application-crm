// src/pages/JobDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobApi } from '../api/jobApi';
import { reminderApi } from '../api/reminderApi';
import { Job } from '../types/job';
import { JobStatusHistory } from '../types/job';
import { Reminder, ReminderFormData } from '../types/reminder';
import JobStatusBadge from '../components/jobs/JobStatusBadge';
import StatusTimeline from '../components/history/StatusTimeline';
import ResumeUpload from '../components/resume/ResumeUpload';
import ResumeCard from '../components/resume/ResumeCard';
import ReminderCard from '../components/reminders/ReminderCard';
import ReminderForm from '../components/reminders/ReminderForm';
import Modal from '../components/common/Modal';
import { PageLoader } from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';
import {
  ArrowLeft, MapPin, Calendar, Link2, Building2, Plus, Bell, FileText, GitBranch,
} from 'lucide-react';
import { formatDate } from '../utils/date';
import toast from 'react-hot-toast';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const jobId = Number(id);

  const [job, setJob] = useState<Job | null>(null);
  const [history, setHistory] = useState<JobStatusHistory[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [completingId, setCompletingId] = useState<number | null>(null);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [jobData, histData, remData] = await Promise.all([
        jobApi.getJob(jobId),
        jobApi.getHistory(jobId),
        reminderApi.getRemindersForJob(jobId),
      ]);
      setJob(jobData);
      setHistory(histData);
      setReminders(remData);
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status;
      if (status === 404) setError('Application not found.');
      else if (status === 403) setError('You do not have access to this application.');
      else setError('Failed to load application details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isNaN(jobId)) loadAll();
  }, [jobId]);

  const handleCreateReminder = async (data: ReminderFormData): Promise<boolean> => {
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

  const handleCompleteReminder = async (remId: number) => {
    setCompletingId(remId);
    try {
      const updated = await reminderApi.completeReminder(remId);
      setReminders((prev) => prev.map((r) => (r.id === remId ? updated : r)));
      toast.success('Reminder marked complete!');
    } catch {
      toast.error('Failed to complete reminder.');
    } finally {
      setCompletingId(null);
    }
  };

  if (loading) return <PageLoader />;
  if (error || !job) return <ErrorMessage message={error || 'Not found'} onRetry={loadAll} />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/applications')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
        id="job-details-back-btn"
      >
        <ArrowLeft size={16} /> Back to Applications
      </button>

      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-700 font-bold text-xl shrink-0">
              {job.company.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{job.company}</h2>
              <p className="text-slate-500 font-medium">{job.position}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={13} /> {job.location}
                </span>
                {job.appliedDate && (
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={13} /> Applied {formatDate(job.appliedDate)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <JobStatusBadge status={job.status} />
            {job.jobLink && (
              <a
                href={job.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                <Link2 size={14} /> Open listing
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Timeline */}
        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <GitBranch size={16} className="text-brand-600" />
            <h3 className="text-base font-semibold text-slate-900">Status History</h3>
          </div>
          <StatusTimeline history={history} />
        </div>

        {/* Resume */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-brand-600" />
            <h3 className="text-base font-semibold text-slate-900">Resume</h3>
          </div>
          <div className="space-y-3">
            {job.resumeFileName && (
              <ResumeCard jobId={job.id} fileName={job.resumeFileName} />
            )}
            <ResumeUpload
              jobId={job.id}
              hasResume={!!job.resumeFileName}
              onSuccess={loadAll}
            />
          </div>
        </div>
      </div>

      {/* Reminders */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-brand-600" />
            <h3 className="text-base font-semibold text-slate-900">Reminders</h3>
            {reminders.length > 0 && (
              <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                {reminders.length}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => setShowReminderForm(true)}
            icon={<Plus size={14} />}
            id="add-reminder-btn"
          >
            Add Reminder
          </Button>
        </div>

        {reminders.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-sm">
            No reminders yet. Add one to stay on top of your application.
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((r) => (
              <ReminderCard
                key={r.id}
                reminder={r}
                onComplete={handleCompleteReminder}
                completing={completingId === r.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reminder Form Modal */}
      <Modal
        isOpen={showReminderForm}
        onClose={() => setShowReminderForm(false)}
        title="Create Reminder"
        size="sm"
      >
        <ReminderForm
          onSubmit={handleCreateReminder}
          onCancel={() => setShowReminderForm(false)}
        />
      </Modal>
    </div>
  );
}
