import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const fetchNotes = async () => {
  const { data } = await API.get('/notes');
  return data;
};

export const createNote = async (payload) => {
  const { data } = await API.post('/notes', payload);
  return data;
};

export const updateNote = async (id, payload) => {
  const { data } = await API.put(`/notes/${id}`, payload);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await API.delete(`/notes/${id}`);
  return data;
};

export const searchNotes = async (query) => {
  const { data } = await API.get(`/notes/search?query=${encodeURIComponent(query)}`);
  return data;
};
