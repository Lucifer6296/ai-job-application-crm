// src/components/jobs/JobTable.tsx
import { Job } from '../../types/job';
import JobStatusBadge from './JobStatusBadge';
import { formatDate } from '../../utils/date';
import { Eye, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JobTableProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export default function JobTable({ jobs, onEdit, onDelete }: JobTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="w-full" id="job-table">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Location</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Applied</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-slate-50 transition-colors group"
            >
              <td className="py-3.5 px-4">
                <span className="font-medium text-slate-900 text-sm">{job.company}</span>
              </td>
              <td className="py-3.5 px-4">
                <span className="text-sm text-slate-600">{job.position}</span>
              </td>
              <td className="py-3.5 px-4 hidden md:table-cell">
                <span className="text-sm text-slate-500">{job.location}</span>
              </td>
              <td className="py-3.5 px-4">
                <JobStatusBadge status={job.status} />
              </td>
              <td className="py-3.5 px-4 hidden md:table-cell">
                <span className="text-sm text-slate-400">{formatDate(job.appliedDate)}</span>
              </td>
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate(`/applications/${job.id}`)}
                    className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                    title="View details"
                    id={`job-view-${job.id}`}
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => onEdit(job)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit"
                    id={`job-edit-${job.id}`}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(job)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                    id={`job-delete-${job.id}`}
                  >
                    <Trash2 size={15} />
                  </button>
                  {job.jobLink && (
                    <a
                      href={job.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Open job link"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
