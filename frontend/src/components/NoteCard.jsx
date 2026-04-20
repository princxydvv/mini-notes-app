const NoteCard = ({ note, onEdit, onDelete, isDeleting }) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-800">{note.title}</h3>
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="mb-5 whitespace-pre-wrap text-sm leading-6 text-slate-600">
        {note.description || 'No description provided.'}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          disabled={isDeleting}
          className="flex-1 rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
