// src/components/layout/Navbar.tsx
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Bell, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/applications': 'Applications',
  '/reminders': 'Reminders',
  '/profile': 'Profile',
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const title =
    Object.entries(pageTitles).find(([path]) =>
      location.pathname.startsWith(path)
    )?.[1] ?? 'JobTracker';

  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? 'Good morning'
      : now.getHours() < 17
      ? 'Good afternoon'
      : 'Good evening';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 sticky top-0 z-10 shadow-sm">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-400 hidden sm:block">{greeting}, welcome back!</p>
      </div>
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        <button
          className="relative w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          aria-label="Notifications"
          id="navbar-notifications-btn"
        >
          <Bell size={16} />
        </button>

        {/* Profile Avatar Button */}
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md hover:ring-2 hover:ring-brand-500/50 transition-all cursor-pointer"
          id="navbar-user-menu-btn"
          aria-expanded={dropdownOpen}
        >
          U
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-800">Account User</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Shield size={12} className="text-emerald-500" /> Active Session
              </p>
            </div>

            <div className="py-1">
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <UserIcon size={16} />
                <span>View Profile</span>
              </Link>
            </div>

            <div className="pt-1 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-left"
                id="navbar-logout-btn"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

