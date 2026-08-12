// src/api/jobApi.ts
import apiClient from './axios';
import type { Job, JobFormData, JobStatusHistory, JobPage } from '../types/job';

export const jobApi = {
  getJobs: async (): Promise<Job[]> => {
    const response = await apiClient.get<Job[]>('/api/jobs');
    return response.data;
  },

  getJob: async (id: number): Promise<Job> => {
    const response = await apiClient.get<Job>(`/api/jobs/${id}`);
    return response.data;
  },

  createJob: async (data: JobFormData): Promise<Job> => {
    const response = await apiClient.post<Job>('/api/jobs', data);
    return response.data;
  },

  updateJob: async (id: number, data: JobFormData): Promise<Job> => {
    const response = await apiClient.put<Job>(`/api/jobs/${id}`, data);
    return response.data;
  },

  deleteJob: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/jobs/${id}`);
  },

  searchJobs: async (company: string): Promise<Job[]> => {
    const response = await apiClient.get<Job[]>('/api/jobs/search', {
      params: { company },
    });
    return response.data;
  },

  getJobsPage: async (page: number, size: number, sort: string): Promise<JobPage> => {
    const response = await apiClient.get<JobPage>('/api/jobs/page', {
      params: { page, size, sort },
    });
    return response.data;
  },

  getHistory: async (id: number): Promise<JobStatusHistory[]> => {
    const response = await apiClient.get<JobStatusHistory[]>(`/api/jobs/${id}/history`);
    return response.data;
  },
};
