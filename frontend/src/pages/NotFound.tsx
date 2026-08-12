// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-brand-100 rounded-3xl flex items-center justify-center text-brand-600 mb-6 shadow-xl shadow-brand-500/10">
        <Compass size={40} />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-slate-700 mb-2">Page Not Found</h2>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}
