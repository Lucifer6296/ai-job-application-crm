// src/hooks/useJobs.ts
import { useState, useCallback } from 'react';
import { jobApi } from '../api/jobApi';
import { Job, JobFormData } from '../types/job';
import toast from 'react-hot-toast';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobApi.getJobs();
      setJobs(data);
    } catch {
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const createJob = async (data: JobFormData): Promise<boolean> => {
    try {
      const newJob = await jobApi.createJob(data);
      setJobs((prev) => [newJob, ...prev]);
      toast.success('Application added successfully!');
      return true;
    } catch {
      toast.error('Failed to add application.');
      return false;
    }
  };

  const updateJob = async (id: number, data: JobFormData): Promise<boolean> => {
    try {
      const updated = await jobApi.updateJob(id, data);
      setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
      toast.success('Application updated successfully!');
      return true;
    } catch {
      toast.error('Failed to update application.');
      return false;
    }
  };

  const deleteJob = async (id: number): Promise<boolean> => {
    try {
      await jobApi.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      toast.success('Application deleted.');
      return true;
    } catch {
      toast.error('Failed to delete application.');
      return false;
    }
  };

  return { jobs, loading, error, fetchJobs, createJob, updateJob, deleteJob };
}
