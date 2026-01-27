export default function SkillCard({ icon, title, list }: { icon: any, title: string, list: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 group">
      <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">{list}</p>
    </div>
  );
}