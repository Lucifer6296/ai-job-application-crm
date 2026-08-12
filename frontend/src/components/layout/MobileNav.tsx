// src/components/layout/MobileNav.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/applications', label: 'Jobs', icon: Briefcase },
  { to: '/reminders', label: 'Reminders', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function MobileNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-20 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                isActive ? 'text-brand-600' : 'text-slate-400'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-2 text-slate-400 hover:text-red-500 transition-colors"
          id="mobile-logout-btn"
        >
          <LogOut size={20} />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
