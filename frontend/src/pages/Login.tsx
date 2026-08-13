// src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Mail, Lock, Zap, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { storage } from '../utils/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [wakingUp, setWakingUp] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
    if (!password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setWakingUp(false);
    let enteredWakingUp = false;
    try {
      const token = await authApi.login({ email, password });
      // 1. Store in localStorage first (synchronous)
      storage.setToken(token);
      // 2. Update React context
      login(token);
      toast.success('Welcome back!');
      // 3. Navigate — ProtectedRoute reads from localStorage so this is immediate
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status;
      const isNetworkError = !(err as { response?: unknown })?.response;

      if (status === 401 || status === 400) {
        toast.error('Invalid email or password.');
      } else if (isNetworkError) {
        // Render free tier: backend is cold-starting, retry automatically
        enteredWakingUp = true;
        setWakingUp(true);
        setLoading(false);
        setTimeout(async () => {
          setWakingUp(false);
          setLoading(true);
          try {
            const token = await authApi.login({ email, password });
            storage.setToken(token);
            login(token);
            toast.success('Welcome back!');
            navigate('/dashboard', { replace: true });
          } catch {
            toast.error('Server is still starting. Please try again in a moment.');
          } finally {
            setLoading(false);
          }
        }, 15000);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      if (!enteredWakingUp) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-brand-600/40">
            <Zap size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your JobTracker account</p>
        </div>

        {/* Waking up banner */}
        {wakingUp && (
          <div className="mb-4 flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-2xl px-4 py-3 text-sm">
            <Loader2 size={16} className="animate-spin shrink-0" />
            <span>Server is waking up on Render's free tier. Retrying automatically in ~15s…</span>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              error={errors.email}
              placeholder="you@example.com"
              icon={<Mail size={16} />}
              autoComplete="email"
              id="login-email"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              error={errors.password}
              placeholder="••••••••"
              icon={<Lock size={16} />}
              autoComplete="current-password"
              id="login-password"
            />
            <Button
              type="submit"
              loading={loading}
              disabled={wakingUp}
              className="w-full justify-center mt-2"
              id="login-submit-btn"
            >
              {wakingUp ? 'Waking up server…' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-600 font-semibold hover:text-brand-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
