import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { register as registerUser } from '../services/authService';

const RegisterPage = () => {
  const { register: registerField, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      login(response.data.user, response.data.token);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to register');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Create your account</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">Sign up in seconds and start analyzing resumes.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Full Name
          <input type="text" {...registerField('name', { required: 'Name is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
          <input type="email" {...registerField('email', { required: 'Email is required' })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Password
          <input type="password" {...registerField('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>}
        </label>
        <button type="submit" className="w-full rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700">Create account</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account? <Link to="/login" className="text-sky-600 hover:text-sky-700">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
