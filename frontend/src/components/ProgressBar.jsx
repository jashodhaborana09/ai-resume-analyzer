const ProgressBar = ({ label, value }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default ProgressBar;
