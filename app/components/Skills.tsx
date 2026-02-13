"use client";

import { Cpu, Globe, Layers, Smartphone } from "lucide-react";
import SkillCard from "./SkillCard";
import { motion } from "framer-motion";

export default function Skills({ siteConfig }: { siteConfig: { skills: { frontend: string[], backend: string[], languages: string[], mobile: string[] } } }) {
  const skillCategories = [
    {
      icon: <Layers className="text-brand-500" />,
      title: "Frontend Development",
      list: siteConfig.skills.frontend,
      description: "Crafting beautiful, responsive, and high-performance user interfaces."
    },
    {
      icon: <Smartphone className="text-brand-500" />,
      title: "Mobile Development",
      list: siteConfig.skills.mobile,
      description: "Building native and cross-platform mobile applications for iOS and Android."
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
    <section id="skills" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-black text-zinc-950 dark:text-white mb-3 tracking-tighter">
            Core Expertise
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            A comprehensive suite of technical skills developed through years of professional engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                list={category.list}
                description={category.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
