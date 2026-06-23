import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ResumeCard from '../components/ResumeCard';
import LoadingScreen from '../components/LoadingScreen';
import { fetchHistory, deleteHistoryEntry } from '../services/historyService';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const response = await fetchHistory();
      setHistory(response.data);
    } catch (error) {
      toast.error('Unable to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteHistoryEntry(id);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      toast.success('History removed');
    } catch (error) {
      toast.error('Unable to delete entry');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Resume History</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Review previous uploads, ATS scores, and AI feedback.</p>
      </div>
      {history.length ? (
        <div className="grid gap-4">
          {history.map((item) => (
            <ResumeCard key={item._id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <p>No resume uploads yet. Upload a resume to begin tracking your ATS performance.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
