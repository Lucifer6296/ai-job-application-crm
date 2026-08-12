// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { storage } from '../utils/storage';

export default function ProtectedRoute() {
  // Read directly from localStorage to avoid React state race conditions
  // (e.g. token just set by login() but state hasn't re-rendered yet)
  const token = storage.getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
