import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Profile</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Name</p>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{user?.name}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Email</p>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
