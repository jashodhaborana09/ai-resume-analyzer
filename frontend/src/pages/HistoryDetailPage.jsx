import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchHistoryById } from '../services/historyService';
import LoadingScreen from '../components/LoadingScreen';
import { downloadReport } from '../services/historyService';

const HistoryDetailPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoryById(id)
      .then((response) => setEntry(response.data))
      .catch(() => toast.error('Unable to load entry'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownload = async () => {
    try {
      const response = await downloadReport(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume-report-${id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Unable to download report');
    }
  };

  if (loading) return <LoadingScreen />;
  if (!entry) return null;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{entry.fileName}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Uploaded {new Date(entry.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={entry.fileUrl} target="_blank" rel="noreferrer" className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
              View Resume
            </a>
            <button onClick={handleDownload} className="rounded-full bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700">Download Report</button>
            <Link to="/history" className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-100">Back to History</Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Parsed Resume Data</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <p><span className="font-semibold">Name:</span> {entry.parsedData.name || 'N/A'}</p>
            <p><span className="font-semibold">Email:</span> {entry.parsedData.email || 'N/A'}</p>
            <p><span className="font-semibold">Phone:</span> {entry.parsedData.phone || 'N/A'}</p>
            <p><span className="font-semibold">Education:</span></p>
            <ul className="list-disc space-y-1 pl-5">{entry.parsedData.education?.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">AI Resume Analysis</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <p><span className="font-semibold">ATS Score:</span> {entry.analysis?.atsScore || 'N/A'}</p>
            <p><span className="font-semibold">Missing Skills:</span> {entry.analysis?.missingSkills?.join(', ') || 'N/A'}</p>
            <p><span className="font-semibold">Recruiter Feedback:</span> {entry.analysis?.recruiterFeedback || 'N/A'}</p>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Job Match Insights</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 text-sm text-slate-700 dark:text-slate-300">
          <div>
            <p className="font-semibold">Match Percentage</p>
            <p>{entry.jobMatch?.matchPercentage || 'N/A'}%</p>
          </div>
          <div>
            <p className="font-semibold">Recommended Keywords</p>
            <p>{entry.jobMatch?.recommendedKeywords?.join(', ') || 'N/A'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HistoryDetailPage;
