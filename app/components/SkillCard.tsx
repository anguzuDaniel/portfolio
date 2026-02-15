"use client";

export default function SkillCard({ icon, title, list, description }: { icon: React.ReactNode, title: string, list: string[], description?: string }) {
  return (
    <div className="group premium-card premium-card-hover p-8 md:p-10 h-full flex flex-col relative">
      {/* Hover accent — top edge gradient stripe */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl flex items-center justify-center mb-6 
                    group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 
                    border border-zinc-200/60 dark:border-zinc-700/40 text-zinc-600 dark:text-zinc-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors tracking-tight">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium leading-relaxed">
          {description}
        </p>
      )}

      {/* Skill Tags */}
      <div className="mt-auto flex flex-wrap gap-2">
        {list.map((item) => (
          <span
            key={item}
            className="text-[10px] uppercase tracking-widest font-bold 
                       text-brand-700 dark:text-brand-300 
                       bg-brand-50 dark:bg-brand-500/10 
                       px-3 py-1.5 rounded-lg 
                       border border-brand-100 dark:border-brand-500/20 
                       whitespace-nowrap transition-all hover:scale-105 hover:border-brand-300 dark:hover:border-brand-500/40"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}