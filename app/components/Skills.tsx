import { Code2, Cpu, Globe } from "lucide-react";
import SkillCard from "./SkillCard";

export default function Skills({ siteConfig }: { siteConfig: any }) {
    return (
      <section id="skills" className="py-20 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* These now match the keys in your profile.ts */}
            <SkillCard 
              icon={<Code2 className="text-cyan-600 dark:text-cyan-500" />} 
              title="Frontend" 
              list={siteConfig.skills.frontend.join(", ")} 
            />
            <SkillCard 
              icon={<Cpu className="text-cyan-600 dark:text-cyan-500" />} 
              title="Backend" 
              list={siteConfig.skills.backend.join(", ")} 
            />
            <SkillCard 
              icon={<Globe className="text-cyan-600 dark:text-cyan-500" />} 
              title="Tools & Branches" 
              list={siteConfig.skills.tools.join(", ")} 
            />
          </div>
        </div>
      </section>
    );
}