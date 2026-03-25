"use client";

import { siteConfig } from '@/config/profile';
import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';

type EducationItem = {
  school: string;
  award: string;
  focus: string;
  period: string;
};

export default function Credentials() {
  return (
    <section id="credentials" className="section-padding container-max">
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
      >
        <div className="space-y-4">
          <span className="section-kicker">Foundations / Continuous Learning</span>
          <h2 className="section-title">
            Education and certifications that reinforce the practice.
          </h2>
        </div>
        <p className="section-copy max-w-3xl lg:justify-self-end">
          Formal study plus practical upskilling across Android, developer tooling, automation, and teaching.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="premium-card p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-200/45 bg-brand-50 text-brand-700 dark:border-brand-400/15 dark:bg-brand-950/60 dark:text-brand-300">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="text-3xl font-display tracking-tight text-[#140e09] dark:text-inherit">Education</h3>
              <p className="text-[15px] text-[#4c3524] dark:text-stone-400">Academic grounding across software and business.</p>
            </div>
          </div>

          <div className="space-y-5">
            {siteConfig.education.map((item: EducationItem) => (
              <div
                key={`${item.school}-${item.period}`}
                className="rounded-[1.5rem] border border-brand-200/30 bg-[rgba(255,248,240,0.9)] p-5 dark:border-brand-400/10 dark:bg-white/[0.03]"
              >
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#6b4423] dark:text-stone-400">
                  {item.period}
                </p>
                <h4 className="mb-1 text-xl font-display text-[#140e09] dark:text-inherit">{item.school}</h4>
                <p className="text-[15px] text-[#4c3524] dark:text-inherit">
                  {item.award} in {item.focus}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="premium-card p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-200/45 bg-brand-50 text-brand-700 dark:border-brand-400/15 dark:bg-brand-950/60 dark:text-brand-300">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-3xl font-display tracking-tight text-[#140e09] dark:text-inherit">Certifications</h3>
              <p className="text-[15px] text-[#4c3524] dark:text-stone-400">Courses and recognition that reinforce current practice.</p>
            </div>
          </div>

          <div className="space-y-3">
            {siteConfig.certifications.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[1.25rem] border border-brand-200/30 bg-[rgba(255,248,240,0.92)] px-4 py-4 text-[15px] text-[#4c3524] dark:border-brand-400/10 dark:bg-white/[0.03] dark:text-stone-300"
              >
                <span className="mt-2 h-px w-6 bg-brand-400/75 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
