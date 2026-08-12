// src/api/resumeApi.ts
import apiClient from './axios';

export const resumeApi = {
  uploadResume: async (jobId: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<string>(`/api/jobs/${jobId}/resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  downloadResume: async (jobId: number): Promise<Blob> => {
    const response = await apiClient.get(`/api/jobs/${jobId}/resume`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
