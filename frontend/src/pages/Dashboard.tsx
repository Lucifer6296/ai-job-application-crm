// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useJobs } from '../hooks/useJobs';
import { useReminders } from '../hooks/useReminders';
import StatCard from '../components/dashboard/StatCard';
import ApplicationChart from '../components/dashboard/ApplicationChart';
import RecentApplications from '../components/dashboard/RecentApplications';
import UpcomingReminders from '../components/dashboard/UpcomingReminders';
import { PageLoader } from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  Briefcase, FileCheck, Users, XCircle, Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { stats, loading: statsLoading, error: statsError, fetchStats } = useDashboard();
  const { jobs, loading: jobsLoading, fetchJobs } = useJobs();
  const { reminders, loading: remLoading, fetchAllReminders } = useReminders();

  useEffect(() => {
    fetchStats();
    fetchJobs();
    fetchAllReminders();
  }, []);

  const isLoading = statsLoading || jobsLoading || remLoading;

  if (isLoading && !stats) return <PageLoader />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Overview</h2>
          <p className="text-sm text-slate-400 mt-0.5">Track your job search progress at a glance</p>
        </div>
        <Link to="/applications" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Briefcase size={15} />
          View All
        </Link>
      </div>

      {statsError && <ErrorMessage message={statsError} onRetry={fetchStats} />}

      {/* Stat Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            label="Total"
            value={stats.total}
            icon={<Briefcase size={20} />}
            color="text-brand-600"
            bgColor="bg-brand-100"
          />
          <StatCard
            label="Applied"
            value={stats.applied}
            icon={<FileCheck size={20} />}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            label="Interview"
            value={stats.interview}
            icon={<Users size={20} />}
            color="text-amber-600"
            bgColor="bg-amber-100"
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            icon={<XCircle size={20} />}
            color="text-red-500"
            bgColor="bg-red-100"
          />
          <StatCard
            label="Selected"
            value={stats.selected}
            icon={<Trophy size={20} />}
            color="text-emerald-600"
            bgColor="bg-emerald-100"
          />
        </div>
      )}

      {/* Chart */}
      {stats && (
        <div className="card">
          <h3 className="text-base font-semibold text-slate-900 mb-5">Application Analytics</h3>
          <ApplicationChart stats={stats} />
        </div>
      )}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900">Recent Applications</h3>
            <Link to="/applications" className="text-xs text-brand-600 hover:text-brand-700 font-medium">
              View all →
            </Link>
          </div>
          {jobsLoading ? <PageLoader /> : <RecentApplications jobs={jobs} />}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900">Upcoming Reminders</h3>
            <Link to="/reminders" className="text-xs text-brand-600 hover:text-brand-700 font-medium">
              View all →
            </Link>
          </div>
          {remLoading ? <PageLoader /> : <UpcomingReminders reminders={reminders} />}
        </div>
      </div>
    </div>
  );
}
