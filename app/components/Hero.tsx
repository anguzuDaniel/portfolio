"use client";

import Image from 'next/image';
import { siteConfig } from '@/config/profile';
import { Github, ArrowRight, Briefcase, FolderGit2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Briefcase, value: "5+", label: "Years Experience" },
  { icon: FolderGit2, value: "50+", label: "Repositories" },
  { icon: Rocket, value: "4", label: "Live Projects" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[95vh] flex items-center pt-28 pb-16">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/[0.07] rounded-full blur-[140px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="container-max w-full relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

          {/* Availability badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            Available for New Projects
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-6 leading-[1.1] md:leading-[0.95] font-black"
          >
            Crafting code that{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-600 dark:text-brand-400 italic font-serif px-1">
                bridges
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute bottom-1 md:bottom-2 left-0 h-2.5 md:h-3 bg-brand-500/20 dark:bg-brand-500/10 -rotate-1"
              />
            </span>
            <br />
            <span className="text-gradient">
              innovation and scale.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-xl leading-relaxed font-medium"
          >
            {siteConfig.hero.subtext}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${siteConfig.email}`}
              className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/25 flex items-center gap-2.5 text-base"
            >
              Start a Project
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.github}
              target="_blank"
              className="bg-white dark:bg-zinc-900/60 px-8 py-4 rounded-2xl text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm font-bold flex items-center gap-2.5 text-base"
            >
              <Github size={20} />
              GitHub
            </motion.a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6 md:gap-0 md:divide-x md:divide-zinc-200 md:dark:divide-zinc-800"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 px-6 md:px-8">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/5 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <stat.icon size={20} />
                </div>
                <div className="text-left">
                  <div className="font-black text-xl text-zinc-900 dark:text-white leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}