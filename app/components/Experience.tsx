"use client";

import { siteConfig } from '@/config/profile';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, CalendarRange, ExternalLink, MapPin } from 'lucide-react';

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary?: string;
  highlights?: string[];
  stack?: string[];
  link?: {
    label: string;
    url: string;
  };
};

export default function Experience() {
  if (!siteConfig.experience || siteConfig.experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="section-padding container-max">
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
      >
        <div className="space-y-4">
          <span className="section-kicker">Professional Timeline</span>
          <h2 className="section-title">
            Experience that shaped how I ship, scale, and communicate.
          </h2>
        </div>
        <p className="section-copy max-w-3xl lg:justify-self-end">
          Roles spanning Android delivery, full-stack product engineering, founder-led execution, and hands-on technical facilitation.
        </p>
      </motion.div>

      <div className="relative ml-2 space-y-6 before:absolute before:bottom-3 before:left-2 before:top-3 before:w-px before:bg-gradient-to-b before:from-brand-300/60 before:via-brand-300/20 before:to-transparent">
        {siteConfig.experience.map((item: ExperienceItem, index) => (
          <motion.article
            key={`${item.company}-${item.role}`}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="relative ml-8 premium-card premium-card-hover p-6 md:p-8"
          >
            <div className="absolute -left-[2.6rem] top-8 flex h-8 w-8 items-center justify-center rounded-full border border-brand-300/45 bg-brand-50 text-brand-700 shadow-md dark:border-brand-400/20 dark:bg-brand-950/70 dark:text-brand-300">
              <span className="h-2 w-2 rounded-full bg-current" />
            </div>

            <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-200/45 bg-brand-50 text-brand-700 dark:border-brand-400/15 dark:bg-brand-950/60 dark:text-brand-300">
                  <BriefcaseBusiness size={22} />
                </div>

                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#5b3419] dark:text-stone-400">
                  {item.company}
                </p>
                <h3 className="mb-4 text-3xl font-display tracking-tight text-[#18110b] dark:text-inherit">
                  {item.role}
                </h3>

                <div className="space-y-3 text-sm text-[#5f4632] dark:text-stone-400">
                  <div className="flex items-start gap-2">
                    <CalendarRange size={16} className="mt-0.5 shrink-0" />
                    <span>{item.period}</span>
                  </div>

                  {item.location && (
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="mt-0.5 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                {item.summary && (
                  <p className="text-base leading-relaxed text-[#3b2819] dark:text-stone-300">
                    {item.summary}
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="space-y-3 text-sm leading-relaxed text-[#4b3524] dark:text-stone-400">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-px w-6 bg-brand-400/75 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {(item.stack || item.link) && (
                  <div className="flex flex-col gap-4 pt-2">
                    {item.stack && item.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.stack.map((entry) => (
                          <span key={entry} className="label-chip">
                            {entry}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.link && (
                      <div>
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
                        >
                          {item.link.label}
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
