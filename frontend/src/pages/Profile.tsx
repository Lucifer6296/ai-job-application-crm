// src/pages/Profile.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Shield, CheckCircle2, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Profile</h2>
        <p className="text-sm text-slate-400 mt-0.5">Your user credentials & account information</p>
      </div>

      <div className="card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-500/30">
              U
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Authenticated User</h3>
              <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-full font-medium mt-1">
                <CheckCircle2 size={12} /> Active Session
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-xl text-sm font-semibold transition-colors"
            id="profile-logout-btn"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Mail className="text-brand-600 shrink-0" size={18} />
            <div className="min-w-0">
              <p className="text-xs text-slate-400 font-medium">Session JWT Token</p>
              <p className="text-xs font-mono text-slate-600 truncate max-w-md">{token}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Shield className="text-brand-600 shrink-0" size={18} />
            <div>
              <p className="text-xs text-slate-400 font-medium">Authentication Type</p>
              <p className="text-sm font-semibold text-slate-800">Bearer JWT (Spring Security)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

