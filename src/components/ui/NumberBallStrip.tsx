export function NumberBallStrip({ label = 'Official Result Status' }: { label?: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-metallicgold/45 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-royalred">
          {label}
        </span>
        <p className="text-xs text-slate-600">
          No Verified Results Available — Official winning numbers will appear only after
          verification and legal approval.
        </p>
      </div>
    </div>
  );
}
