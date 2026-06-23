import { Link } from 'react-router-dom';

const ResumeCard = ({ item, onDelete }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.fileName}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Uploaded on {new Date(item.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-2">
        <a href={item.fileUrl} target="_blank" rel="noreferrer" className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
          View Resume
        </a>
        <Link to={`/history/${item._id}`} className="rounded-full bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700">
          Details
        </Link>
        <button onClick={() => onDelete(item._id)} className="rounded-full bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default ResumeCard;
