const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"></div>
      <p className="text-sm font-medium text-slate-600">{text}</p>
    </div>
  );
};

export default Loader;
