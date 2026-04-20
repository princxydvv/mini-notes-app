import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: ''
};

const NoteForm = ({ onSubmit, isSubmitting, editingNote, onCancelEdit }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        description: editingNote.description || ''
      });
    } else {
      setFormData(initialState);
    }
    setError('');
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setError('');
    const success = await onSubmit({
      title: formData.title,
      description: formData.description
    });

    if (success && !editingNote) {
      setFormData(initialState);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          {editingNote ? 'Edit Note' : 'Create Note'}
        </h2>
        {editingNote && (
          <button
            onClick={onCancelEdit}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter note title"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write your note here"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
          />
        </div>

        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          {isSubmitting ? (editingNote ? 'Updating...' : 'Creating...') : editingNote ? 'Update Note' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
