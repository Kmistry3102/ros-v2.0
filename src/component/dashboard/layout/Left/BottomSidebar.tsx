export default function BottomSidebar({ open }: { open: boolean }) {
  return (
    <div className="mt-4 shrink-0 border-t border-gray-800/70 pt-3 text-[11px] text-gray-300">
      {open ? (
        <>
          <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">
            Version
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-white">
              v2.0.0
            </span>
            <span className="text-[10px] text-gray-400">All systems normal</span>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] text-white">
            v2.0.0
          </span>
        </div>
      )}
    </div>
  );
}