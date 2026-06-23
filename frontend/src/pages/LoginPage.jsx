import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';

const LoginPage = () => {
  const { register: registerField, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      setAuth(response.data.user, response.data.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to login');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Welcome Back</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">Login to access your resume insights.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
          <input type="email" {...registerField('email', { required: 'Email is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Password
          <input type="password" {...registerField('password', { required: 'Password is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
        </label>
        <button type="submit" className="w-full rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">Login</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
        New here? <Link to="/register" className="text-sky-600 hover:text-sky-700">Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
