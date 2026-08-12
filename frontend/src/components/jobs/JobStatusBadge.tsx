// src/components/jobs/JobStatusBadge.tsx
import { STATUS_COLORS } from '../../utils/constants';

interface JobStatusBadgeProps {
  status: string;
}

export default function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const colorClass = STATUS_COLORS[status] || 'badge-applied';
  return <span className={colorClass}>{status}</span>;
}
