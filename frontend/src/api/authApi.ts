// src/api/authApi.ts
import apiClient from './axios';
import type { LoginRequest, RegisterRequest } from '../types/auth';

export const authApi = {
  login: async (data: LoginRequest): Promise<string> => {
    const response = await apiClient.post<string>('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<void> => {
    await apiClient.post('/api/users/register', data);
  },
};
