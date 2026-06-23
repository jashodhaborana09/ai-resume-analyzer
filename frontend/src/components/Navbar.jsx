import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

const linkClass = ({ isActive }) =>
  isActive ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-sky-600';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-bold text-slate-900 dark:text-white">
          AI Resume Analyzer
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 md:flex">
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/upload" className={linkClass}>Upload</NavLink>
            <NavLink to="/history" className={linkClass}>History</NavLink>
            <NavLink to="/job-match" className={linkClass}>Job Match</NavLink>
          </nav>
          <ThemeSwitcher />
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {user.name}
              </Link>
              <button onClick={logout} className="rounded-full bg-sky-600 px-3 py-2 text-sm text-white hover:bg-sky-700">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="rounded-full bg-sky-600 px-3 py-2 text-sm text-white hover:bg-sky-700">Login</Link>
              <Link to="/register" className="rounded-full border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
