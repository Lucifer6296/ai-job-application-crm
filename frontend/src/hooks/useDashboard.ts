// src/hooks/useDashboard.ts
import { useState, useCallback } from 'react';
import { dashboardApi } from '../api/dashboardApi';
import { DashboardStats } from '../types/dashboard';

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch {
      setError('Failed to load dashboard stats.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { stats, loading, error, fetchStats };
}
