import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { analyzeJobDescription } from '../services/resumeService';
import { fetchHistory } from '../services/historyService';
import ProgressBar from '../components/ProgressBar';
import LoadingScreen from '../components/LoadingScreen';

const JobMatchPage = () => {
  const [history, setHistory] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobMatch, setJobMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHistory()
      .then((response) => {
        setHistory(response.data);
        if (response.data.length) {
          setSelectedId(response.data[0]._id);
        }
      })
      .catch(() => toast.error('Unable to load resume history'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!selectedId || !jobDescription.trim()) {
      toast.error('Select a resume and paste a job description');
      return;
    }
    setSubmitting(true);
    try {
      const response = await analyzeJobDescription(selectedId, jobDescription);
      setJobMatch(response.data.jobMatch);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to analyze job description');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Job Description Matching</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Match your resume against a role and uncover missing keywords and skills.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            Resume
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
              {history.map((item) => (
                <option key={item._id} value={item._id}>{item.fileName}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            Job description
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={6} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </label>
        </div>
        <button onClick={handleSubmit} disabled={submitting} className="mt-6 rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400">
          {submitting ? 'Analyzing...' : 'Analyze Job Match'}
        </button>
      </div>

      {jobMatch && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Match Percentage</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100">{jobMatch.matchPercentage || 0}%</p>
            </div>
            <div className="space-y-4">
              {['matchingSkills', 'missingSkills', 'recommendedKeywords'].map((key) => (
                <div key={key} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700 dark:text-slate-300">
                    {jobMatch[key]?.length ? jobMatch[key].map((item) => <span key={item} className="rounded-full bg-sky-100 px-3 py-1 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">{item}</span>) : <span>No data available</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Optimization Tips</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{jobMatch.optimizationTips || 'No optimization tips generated.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatchPage;
