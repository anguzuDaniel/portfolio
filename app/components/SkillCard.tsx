"use client";

export default function SkillCard({ icon, title, list, description }: { icon: React.ReactNode, title: string, list: string[], description?: string }) {
  return (
    <div className="group premium-card premium-card-hover p-10 h-full flex flex-col">
      {/* Icon Container - Refined for better light mode contrast */}
      <div className="w-16 h-16 bg-zinc-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-8 
                    group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 
                    group-hover:rotate-12 border border-zinc-200 dark:border-zinc-800/50 shadow-sm text-zinc-900 dark:text-white">
        {icon}
      </div>

      {/* FIXED TITLE: High contrast text-zinc-900 for Light Mode, White for Dark Mode */}
      <h3 className="text-xl text-gradient text-zinc-950 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors tracking-tight">
        {title}
      </h3>

      {description && (
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 font-medium leading-relaxed">
          {description}
        </p>
      )}

      {/* Skill Tags */}
      <div className="mt-auto flex flex-wrap gap-2">
        {list.map((item) => (
          <span
            key={item}
            className="text-[10px] uppercase tracking-widest font-black 
                       text-brand-700 dark:text-brand-300 
                       bg-brand-50 dark:bg-brand-500/10 
                       px-3.5 py-2 rounded-xl 
                       border border-brand-100 dark:border-brand-500/20 
                       whitespace-nowrap transition-transform hover:scale-105"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}