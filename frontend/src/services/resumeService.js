import api from './api';

export const uploadResume = (file, options = {}) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...(options.onUploadProgress ? { onUploadProgress: options.onUploadProgress } : {}),
  });
};

export const analyzeResume = (historyId) => api.post('/analysis/resume', { historyId });
export const analyzeJobDescription = (historyId, jobDescription) => api.post('/analysis/job-match', { historyId, jobDescription });
