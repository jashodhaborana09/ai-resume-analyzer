import api from './api';

export const fetchHistory = () => api.get('/history');
export const fetchHistoryById = (id) => api.get(`/history/${id}`);
export const deleteHistoryEntry = (id) => api.delete(`/history/${id}`);
export const downloadReport = (id) => api.get(`/history/${id}/report`, { responseType: 'blob' });
