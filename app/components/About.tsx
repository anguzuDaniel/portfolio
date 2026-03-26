"use client";

import { siteConfig } from '@/config/profile';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const featuredSkills = [
    ...new Set([
      ...siteConfig.skills.languages,
      ...siteConfig.skills.frameworks,
      ...siteConfig.skills.tools,
    ]),
  ].slice(0, 12);

  return (
    <section id="about" className="section-padding container-max">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] items-start">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="section-kicker">About / Approach</span>
            <h2 className="section-title max-w-3xl">
              Product-minded engineering with mobile roots and full-stack range.
            </h2>
            <p className="section-copy max-w-2xl">
              {siteConfig.about.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {siteConfig.about.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 10 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="premium-card premium-card-hover p-5"
              >
                <div className="mb-2 text-4xl font-display font-black text-brand-600 dark:text-brand-300">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-700 dark:text-stone-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="premium-card p-4 md:p-6"
        >
          <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-[1.65rem] border border-brand-200/40 bg-brand-950/90">
              <Image
                src="/profile.jpg"
                alt={`${siteConfig.name} portrait`}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white/82 backdrop-blur-sm">
                  Based in {siteConfig.location}
                </div>
                <h3 className="mt-4 text-3xl font-display text-white">
                  {siteConfig.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-white/75">
                  {siteConfig.role}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="section-kicker">Current Focus</span>
                <a
                  href={siteConfig.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
                >
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {featuredSkills.map((skill) => (
                  <span key={skill} className="label-chip">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <div className="rounded-[1.6rem] border border-brand-200/35 bg-white/55 p-5 dark:border-brand-400/10 dark:bg-white/[0.03]">
                  <div className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-brand-600 dark:text-brand-300">
                    Philosophy
                  </div>
                  <p className="text-lg font-display italic leading-relaxed text-[#2f2117] dark:text-stone-200">
                    &quot;{siteConfig.about.quote}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
