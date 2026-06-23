import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { uploadResume } from '../services/resumeService';
import { analyzeResume } from '../services/resumeService';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [parsedData, setParsedData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxSize: 8 * 1024 * 1024,
    onDropRejected: () => toast.error('Only PDF or DOCX files under 8MB are accepted.'),
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Select a resume file first');
      return;
    }

    setLoading(true);
    try {
      const response = await uploadResume(selectedFile, {
        onUploadProgress: (event) => setProgress(Math.round((event.loaded * 100) / event.total)),
      });
      setParsedData(response.data.parsedData);
      toast.success('Resume uploaded successfully');
      const analysisResponse = await analyzeResume(response.data.history._id);
      setAnalysis(analysisResponse.data.analysis);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to upload resume');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Upload Resume</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Drag and drop your resume to parse it and generate an AI-powered report.</p>
        <div {...getRootProps()} className="mt-6 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center transition hover:border-sky-500 dark:border-slate-700 dark:bg-slate-950">
          <input {...getInputProps()} />
          <p className="text-slate-700 dark:text-slate-300">{isDragActive ? 'Drop your file here...' : 'Drop a PDF or DOCX here, or click to browse.'}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Maximum file size 8MB.</p>
        </div>
        {selectedFile && <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">Selected file: {selectedFile.name}</p>}
        <button onClick={handleUpload} disabled={loading} className="mt-6 rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400">
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
        {progress > 0 && (
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
      </section>

      {parsedData && (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Parsed Resume Data</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {['name', 'email', 'phone'].map((key) => (
              <div key={key} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{key}</p>
                <p className="mt-3 text-lg font-medium text-slate-900 dark:text-slate-100">{parsedData[key] || 'Not found'}</p>
              </div>
            ))}
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {parsedData.skills?.length ? parsedData.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-700 dark:bg-sky-900/40 dark:text-sky-200">{skill}</span>
                )) : <p className="text-sm text-slate-500 dark:text-slate-400">No skills detected yet.</p>}
              </div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Education</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {parsedData.education?.length ? parsedData.education.map((item, idx) => <li key={idx}>{item}</li>) : <li>No education lines found.</li>}
              </ul>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Experience</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {parsedData.experience?.length ? parsedData.experience.map((item, idx) => <li key={idx}>{item}</li>) : <li>No experience lines found.</li>}
              </ul>
            </div>
          </div>
        </section>
      )}

      {analysis && (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">AI Analysis</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">ATS Score</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{analysis.atsScore || 'N/A'}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Missing Skills</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {analysis.missingSkills?.length ? analysis.missingSkills.map((skill) => <p key={skill}>• {skill}</p>) : <p>No missing skills detected.</p>}
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Summary</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{analysis.resumeSummary || 'No summary available.'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recruiter Feedback</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{analysis.recruiterFeedback || 'No recruiter feedback available.'}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UploadPage;
