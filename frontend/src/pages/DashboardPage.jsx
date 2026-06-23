import { useEffect, useMemo, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import DashboardCard from '../components/DashboardCard';
import api from '../services/api';
import LoadingScreen from '../components/LoadingScreen';

const DashboardPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/history')
      .then((response) => setHistory(response.data))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const total = history.length;
    const scores = history.map((item) => item.analysis?.atsScore || 0);
    const average = total ? Math.round(scores.reduce((acc, score) => acc + score, 0) / total) : 0;
    const allSkills = [...new Set(history.flatMap((entry) => entry.parsedData.skills || []))];
    const missing = [...new Set(history.flatMap((entry) => entry.analysis?.missingSkills || []))];
    return { total, average, allSkills, missing };
  }, [history]);

  if (loading) return <LoadingScreen />;

  const activity = history.map((item) => ({
    name: new Date(item.createdAt).toLocaleDateString(),
    score: item.analysis?.atsScore || 0,
    skills: (item.parsedData.skills || []).length,
  })).slice(0, 7).reverse();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-4">
        <DashboardCard title="Resumes Analyzed" value={stats.total} detail="Total resume uploads in your account" />
        <DashboardCard title="Average ATS Score" value={`${stats.average}%`} detail="Average score across all analyses" />
        <DashboardCard title="Skills Identified" value={stats.allSkills.length} detail="Unique skills discovered from resumes" />
        <DashboardCard title="Missing Keywords" value={stats.missing.length} detail="Frequently recommended keywords" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">ATS Score Trends</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Track performance across your latest resume submissions.</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area dataKey="score" stroke="#0ea5e9" fill="url(#scoreGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Skill Distribution</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Review your resume skill coverage at a glance.</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activity} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="skills" fill="#0ea5e9" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
