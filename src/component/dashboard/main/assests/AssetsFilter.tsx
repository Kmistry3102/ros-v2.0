export default function AssetsFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:border-black hover:text-black hover:bg-gray-50 transition"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span>Land</span>
      </button>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:border-black hover:text-black hover:bg-gray-50 transition"
      >
        <span className="h-2 w-2 rounded-full bg-sky-500" />
        <span>Projects</span>
      </button>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:border-black hover:text-black hover:bg-gray-50 transition"
      >
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        <span>Society</span>
      </button>
    </div>
  );
}