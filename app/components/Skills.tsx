"use client";

import { Cpu, Globe, Layers } from "lucide-react";
import SkillCard from "./SkillCard";
import { motion } from "framer-motion";

export default function Skills({ siteConfig }: { siteConfig: { skills: { frontend: string[], backend: string[], languages: string[] } } }) {
  const skillCategories = [
    {
      icon: <Layers className="text-brand-500" />,
      title: "Frontend Development",
      list: siteConfig.skills.frontend,
      description: "Crafting beautiful, responsive, and high-performance user interfaces."
    },
    {
      icon: <Cpu className="text-brand-500" />,
      title: "Backend Architecture",
      list: siteConfig.skills.backend,
      description: "Building robust, scalable server-side systems and APIs."
    },
    {
      icon: <Globe className="text-brand-500" />,
      title: "Languages & Frameworks",
      list: siteConfig.skills.languages,
      description: "Modern languages and frameworks for cross-platform solutions."
    }
  ];

  return (
    <section id="skills" className="section-padding bg-zinc-100/30 dark:bg-zinc-950/50 border-y border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-black text-zinc-900 dark:text-white mb-3 tracking-tighter">

            Core Expertise
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            A comprehensive suite of technical skills developed through years of professional engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillCard
                icon={category.icon}
                title={category.title}
                list={category.list.join(", ")}
                description={category.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
