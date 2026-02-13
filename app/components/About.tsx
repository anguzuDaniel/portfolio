"use client";

import { siteConfig } from '@/config/profile';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section-padding container-max">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 flex items-center gap-4">
            <span className="w-12 h-1.5 bg-brand-600 rounded-full" />
            About Me
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">

            {siteConfig.about.description}
          </p>

          <div className="grid grid-cols-3 gap-6">
            {siteConfig.about.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="p-6 premium-card premium-card-hover"
              >

                <div className="text-4xl font-display font-black text-brand-600 dark:text-brand-500 mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Branch Focus Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-blue-600 rounded-[2rem] blur opacity-10" />
          <div className="relative premium-card p-12 !rounded-[2.5rem]">
            <h3 className="text-2xl mb-8">Technical Arsenal</h3>
            <div className="flex flex-wrap gap-3">
              {[...siteConfig.skills.languages, ...siteConfig.skills.frameworks].slice(0, 10).map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-2.5 bg-zinc-100/50 dark:bg-white/5 text-xs font-bold rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 hover:border-brand-500 dark:hover:border-brand-500 transition-all duration-300 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-base text-zinc-500 italic leading-relaxed font-medium">
                &quot;Clean code is not just a practice; it is a commitment to excellence and scalability.&quot;

              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
