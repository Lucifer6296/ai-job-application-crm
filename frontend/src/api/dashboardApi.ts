// src/api/dashboardApi.ts
import apiClient from './axios';
import type { DashboardStats } from '../types/dashboard';

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/api/jobs/dashboard');
    return response.data;
  },
};
