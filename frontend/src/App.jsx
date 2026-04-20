import { useEffect, useMemo, useState } from 'react';
import { createNote, deleteNote, fetchNotes, searchNotes, updateNote } from './api/notes';
import Loader from './components/Loader';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [deletingId, setDeletingId] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        if (!search.trim()) {
          await loadNotes();
          return;
        }
        setLoading(true);
        const serverResults = await searchNotes(search);
        setNotes(serverResults);
      } catch (error) {
        showMessage('error', error.response?.data?.message || 'Search failed');
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const clientFilteredNotes = useMemo(() => {
    return notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));
  }, [notes, search]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      if (editingNote) {
        const updated = await updateNote(editingNote._id, formData);
        setNotes((prev) => prev.map((note) => (note._id === updated._id ? updated : note)));
        setEditingNote(null);
        showMessage('success', 'Note updated successfully');
      } else {
        const created = await createNote(formData);
        setNotes((prev) => [created, ...prev]);
        showMessage('success', 'Note created successfully');
      }

      return true;
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Operation failed');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      if (editingNote?._id === id) setEditingNote(null);
      showMessage('success', 'Note deleted successfully');
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Delete failed');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Mini Notes App</h1>
          <p className="mt-2 text-slate-600">Create, search, update, and delete your notes with ease.</p>
        </div>

        {message.text && (
          <div
            className={`mb-6 rounded-xl px-4 py-3 text-sm font-medium shadow-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div>
            <NoteForm
              onSubmit={handleSubmit}
              isSubmitting={submitting}
              editingNote={editingNote}
              onCancelEdit={() => setEditingNote(null)}
            />
          </div>

          <div>
            <div className="mb-5 rounded-2xl bg-white p-4 shadow-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes by title..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
              />
            </div>

            {loading ? (
              <Loader text="Fetching notes..." />
            ) : clientFilteredNotes.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-md">
                <h3 className="text-xl font-bold text-slate-800">No notes found</h3>
                <p className="mt-2 text-slate-600">Create a new note or try a different search.</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {clientFilteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={setEditingNote}
                    onDelete={handleDelete}
                    isDeleting={deletingId === note._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
