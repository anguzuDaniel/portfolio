import { siteConfig } from '@/config/profile';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            {siteConfig.about.description}
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            {siteConfig.about.stats.map((stat) => (
              <div key={stat.label} className="p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Focus Area */}
        <div className="bg-gradient-to-br from-slate-900 to-[#050505] p-8 rounded-3xl border border-white/5">
          <h3 className="text-white font-semibold mb-4">Core Competencies</h3>
          <div className="flex flex-wrap gap-2">
            {siteConfig.skills.languages.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-xs rounded-lg border border-cyan-500/20">
                {skill}
              </span>
            ))}
            {siteConfig.skills.frameworks.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-white/5 text-slate-300 text-xs rounded-lg border border-white/10">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-sm text-slate-500 italic">"Clean code is not written; it is evolved."</p>
          </div>
        </div>
      </div>
    </section>
  );
}