"use client";




export default function SkillCard({ icon, title, list, description }: { icon: React.ReactNode, title: string, list: string[], description?: string }) {
  return (
    <div className="group premium-card premium-card-hover p-10 h-full flex flex-col">

      <div className="w-16 h-16 bg-zinc-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12 border border-zinc-100 dark:border-zinc-800/50 shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-display font-black text-zinc-900 dark:text-white mb-4 tracking-tight">{title}</h3>
      {description && <p className="text-base text-zinc-500 dark:text-zinc-400 mb-8 font-medium leading-relaxed">{description}</p>}
      <div className="mt-auto flex flex-wrap gap-2">
        {list.map((item) => (
          <span
            key={item}
            className="text-[10px] uppercase tracking-wider font-bold text-brand-700 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/5 px-3 py-1.5 rounded-lg border border-brand-500/10 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>

  );
}
