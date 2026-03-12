"use client";

export default function SkillCard({ icon, title, list, description, index }: { icon: React.ReactNode, title: string, list: string[], description?: string, index: number }) {
  return (
    <div className="group premium-card premium-card-hover relative flex h-full flex-col p-8 md:p-9">
      <div className="mb-8 flex items-start justify-between gap-4">
        <span className="label-chip">Capability {String(index + 1).padStart(2, "0")}</span>
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-brand-200/45 bg-brand-50 text-brand-700 transition-all duration-300 group-hover:border-brand-300 group-hover:bg-brand-500 group-hover:text-white dark:border-brand-400/15 dark:bg-brand-950/60 dark:text-brand-300 dark:group-hover:bg-brand-500 dark:group-hover:text-white">
          {icon}
        </div>
      </div>

      <h3 className="mb-3 text-2xl font-display leading-tight tracking-tight text-[#140e09] transition-colors group-hover:text-brand-800 dark:text-stone-50 dark:group-hover:text-brand-300">
        {title}
      </h3>

      {description && (
        <p className="mb-6 text-sm font-medium leading-relaxed text-[#4c3524] dark:text-stone-400">
          {description}
        </p>
      )}

      <div className="mt-auto space-y-3 border-t border-stone-200/80 pt-6 dark:border-stone-800/80">
        {list.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 text-sm font-semibold text-[#2f2117] dark:text-stone-300"
          >
            <span className="h-px w-6 bg-brand-400/70 dark:bg-brand-300/60" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
