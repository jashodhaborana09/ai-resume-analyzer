const LoadingScreen = () => (
  <div className="grid min-h-[60vh] place-items-center">
    <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <p className="text-center text-xl font-semibold">Loading...</p>
      <div className="mt-4 h-2 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
  </div>
);

export default LoadingScreen;
