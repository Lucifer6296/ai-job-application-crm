// src/pages/Applications.tsx
import { useEffect, useState, useCallback } from 'react';
import { useJobs } from '../hooks/useJobs';
import { jobApi } from '../api/jobApi';
import { Job, JobFormData } from '../types/job';
import JobTable from '../components/jobs/JobTable';
import JobCard from '../components/jobs/JobCard';
import JobForm from '../components/jobs/JobForm';
import JobFilters from '../components/jobs/JobFilters';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import ErrorMessage from '../components/common/ErrorMessage';
import { PageLoader } from '../components/common/Spinner';
import Button from '../components/common/Button';
import { Plus, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

export default function Applications() {
  const { jobs, loading, error, fetchJobs, createJob, updateJob, deleteJob } = useJobs();

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Filter/search/sort state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('id,desc');
  const [searching, setSearching] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pagedJobs, setPagedJobs] = useState<Job[] | null>(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const loadPage = useCallback(async (pageNum: number, sort: string) => {
    setPageLoading(true);
    try {
      const result = await jobApi.getJobsPage(pageNum, PAGE_SIZE, sort);
      setPagedJobs(result.content);
      setTotalPages(result.totalPages);
      setPage(result.number);
    } catch {
      toast.error('Failed to load page.');
    } finally {
      setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(0, sortOrder);
  }, [sortOrder]);

  const handleSearch = async () => {
    if (!search.trim()) {
      // Reset to paged view
      setPagedJobs(null);
      loadPage(0, sortOrder);
      return;
    }
    setSearching(true);
    try {
      const results = await jobApi.searchJobs(search.trim());
      setPagedJobs(results);
      setTotalPages(1);
    } catch {
      toast.error('Search failed.');
    } finally {
      setSearching(false);
    }
  };

  // Compute display list (apply status filter client-side)
  const displayJobs = (pagedJobs ?? jobs).filter((j) =>
    statusFilter ? j.status === statusFilter : true
  );

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteJob(deleteTarget.id);
    setDeleteTarget(null);
    setDeleting(false);
    loadPage(page, sortOrder);
  };

  const handleFormSubmit = async (data: JobFormData): Promise<boolean> => {
    let success: boolean;
    if (editingJob) {
      success = await updateJob(editingJob.id, data);
    } else {
      success = await createJob(data);
    }
    if (success) {
      loadPage(0, sortOrder);
      fetchJobs();
    }
    return success;
  };

  const handleModalClose = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  if (loading && jobs.length === 0) return <PageLoader />;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Applications</h2>
          <p className="text-sm text-slate-400">
            {jobs.length > 0 ? `${jobs.length} total application${jobs.length !== 1 ? 's' : ''}` : 'Start tracking your applications'}
          </p>
        </div>
        <Button
          onClick={() => { setEditingJob(null); setShowForm(true); }}
          icon={<Plus size={16} />}
          id="add-application-btn"
        >
          Add Application
        </Button>
      </div>

      {/* Filters */}
      <div className="card !p-4">
        <JobFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onSearch={handleSearch}
          searching={searching}
        />
      </div>

      {/* Error */}
      {error && <ErrorMessage message={error} onRetry={fetchJobs} />}

      {/* Table (Desktop) / Cards (Mobile) */}
      {displayJobs.length === 0 && !loading && !pageLoading ? (
        <div className="card">
          <EmptyState
            title="You're all caught up!"
            description="Add your first application to start tracking your job search."
            icon={<Briefcase size={28} />}
            action={
              <Button onClick={() => { setEditingJob(null); setShowForm(true); }} icon={<Plus size={15} />} id="empty-add-btn">
                Add Application
              </Button>
            }
          />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="card !p-0 hidden md:block overflow-hidden">
            {pageLoading ? (
              <div className="p-8">
                <PageLoader />
              </div>
            ) : (
              <JobTable jobs={displayJobs} onEdit={handleEdit} onDelete={setDeleteTarget} />
            )}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {pageLoading ? (
              <PageLoader />
            ) : (
              displayJobs.map((job) => (
                <JobCard key={job.id} job={job} onEdit={handleEdit} onDelete={setDeleteTarget} />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && !search && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => loadPage(page - 1, sortOrder)}
                disabled={page === 0 || pageLoading}
                className="btn-secondary disabled:opacity-40 text-xs px-3 py-1.5"
                id="pagination-prev"
              >
                ← Previous
              </button>
              <span className="text-sm text-slate-500">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => loadPage(page + 1, sortOrder)}
                disabled={page >= totalPages - 1 || pageLoading}
                className="btn-secondary disabled:opacity-40 text-xs px-3 py-1.5"
                id="pagination-next"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={handleModalClose}
        title={editingJob ? 'Edit Application' : 'Add New Application'}
        size="lg"
      >
        <JobForm
          initialData={editingJob ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleModalClose}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Application"
        message={`Are you sure you want to delete the application for ${deleteTarget?.position} at ${deleteTarget?.company}? This cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
