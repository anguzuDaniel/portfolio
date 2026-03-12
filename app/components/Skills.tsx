"use client";

import { Cpu, Globe, Layers, Smartphone, Wrench } from "lucide-react";
import SkillCard from "./SkillCard";
import { motion } from "framer-motion";

export default function Skills({ siteConfig }: { siteConfig: { skills: { frontend: string[], backend: string[], languages: string[], mobile: string[], tools: string[] } } }) {
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
    },
    {
      icon: <Wrench className="text-brand-500" />,
      title: "Tooling & Delivery",
      list: siteConfig.skills.tools,
      description: "Deployment, automation, and product infrastructure used to ship reliably."
    },
  ];


  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div className="space-y-4">
            <span className="section-kicker">Capabilities / Toolkit</span>
            <h2 className="section-title">
              Core expertise shaped by product shipping, not just experimentation.
            </h2>
          </div>
          <p className="section-copy max-w-3xl lg:justify-self-end">
            A working toolkit across frontend systems, Android, APIs, automation, and the deployment layer that keeps products stable once they reach real users.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillCard
                index={index}
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
