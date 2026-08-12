// src/components/jobs/JobCard.tsx
import { Job } from '../../types/job';
import JobStatusBadge from './JobStatusBadge';
import { formatDate } from '../../utils/date';
import { MapPin, Calendar, Eye, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  const navigate = useNavigate();

  return (
    <div className="card hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{job.company}</h3>
          <p className="text-sm text-slate-500 truncate">{job.position}</p>
        </div>
        <JobStatusBadge status={job.status} />
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <MapPin size={12} />
          <span>{job.location}</span>
        </div>
        {job.appliedDate && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar size={12} />
            <span>Applied {formatDate(job.appliedDate)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <button
          onClick={() => navigate(`/applications/${job.id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
          id={`job-card-view-${job.id}`}
        >
          <Eye size={13} /> View
        </button>
        <button
          onClick={() => onEdit(job)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          id={`job-card-edit-${job.id}`}
        >
          <Pencil size={13} /> Edit
        </button>
        <button
          onClick={() => onDelete(job)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          id={`job-card-delete-${job.id}`}
        >
          <Trash2 size={13} /> Delete
        </button>
        {job.jobLink && (
          <a
            href={job.jobLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <ExternalLink size={13} /> Link
          </a>
        )}
      </div>
    </div>
  );
}
