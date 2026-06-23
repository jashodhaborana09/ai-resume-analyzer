import { Link } from 'react-router-dom';

const HomePage = () => (
  <section className="space-y-8 py-16">
    <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <p className="text-sm uppercase tracking-[0.28em] text-sky-600">AI Resume Analyzer</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
        Intelligent resume review, ATS scoring, and job-fit insights.
      </h1>
      <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
        Upload a resume, extract structured skills and experience, compare it to real job descriptions, and get recruiter-ready recommendations powered by modern AI.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/register" className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-sky-700">
          Get Started
        </Link>
        <Link to="/dashboard" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-100">
          View Dashboard
        </Link>
      </div>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {[
        { title: 'Upload & Parse', description: 'Drag and drop your resume to extract skills, education, and experience.' },
        { title: 'AI Analysis', description: 'Get ATS score, skill gap recommendations, and recruiter feedback.' },
        { title: 'Job Matching', description: 'Compare your resume against job descriptions and improve your application.' },
      ].map((item) => (
        <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{item.title}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">{item.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default HomePage;
