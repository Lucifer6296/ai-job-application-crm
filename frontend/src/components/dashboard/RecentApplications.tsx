// src/components/dashboard/RecentApplications.tsx
import { Job } from '../../types/job';
import JobStatusBadge from '../jobs/JobStatusBadge';
import { formatDate } from '../../utils/date';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../common/EmptyState';
import { Briefcase } from 'lucide-react';

interface RecentApplicationsProps {
  jobs: Job[];
}

export default function RecentApplications({ jobs }: RecentApplicationsProps) {
  const navigate = useNavigate();
  const recent = jobs.slice(0, 5);

  if (recent.length === 0) {
    return (
      <EmptyState
        title="No applications yet"
        description="Start tracking your job applications."
        icon={<Briefcase size={24} />}
      />
    );
  }

  return (
    <div className="space-y-2">
      {recent.map((job) => (
        <button
          key={job.id}
          onClick={() => navigate(`/applications/${job.id}`)}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
          id={`recent-app-${job.id}`}
        >
          <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 font-bold text-sm shrink-0">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{job.company}</p>
            <p className="text-xs text-slate-400 truncate">{job.position}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <JobStatusBadge status={job.status} />
            {job.appliedDate && (
              <span className="text-xs text-slate-300">{formatDate(job.appliedDate)}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
