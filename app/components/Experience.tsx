"use client";

import { siteConfig } from "@/config/profile";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarRange, MapPin } from "lucide-react";

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

const companyMonograms: Record<string, string> = {
  "Dunam AI": "A",
  "Stoic Pips Limited": "F",
  nooaenergies: "N",
  Turing: "T",
  Holvada: "H",
  Rinfo: "R",
  CodeImpact: "C",
};

export default function Experience() {
  if (!siteConfig.experience || siteConfig.experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="section-padding container-max">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 max-w-3xl space-y-5"
      >
        <span className="section-kicker">Professional Timeline</span>
        <h2 className="section-title">Professional timeline built around product execution.</h2>
        <p className="section-copy">
          A cleaner vertical layout inspired by the reference, restyled into the portfolio&apos;s warm brand system instead of the original monochrome palette.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-7 top-5 bottom-5 hidden w-px bg-gradient-to-b from-brand-300/70 via-brand-400/35 to-brand-200/0 md:block dark:from-brand-300/60 dark:via-brand-400/25" />

        <div className="space-y-10 md:space-y-12">
          {siteConfig.experience.map((item: ExperienceItem, index) => {
            const mark = companyMonograms[item.company] ?? item.company.charAt(0).toUpperCase();

            return (
              <motion.article
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="relative grid gap-5 md:grid-cols-[92px_minmax(0,1fr)] md:gap-8"
              >
                <div className="relative hidden md:flex md:justify-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-brand-300/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,250,244,0.98),rgba(236,214,188,0.9)_45%,rgba(184,109,40,0.16)_100%)] text-2xl font-display font-black text-brand-800 shadow-[0_0_0_6px_rgba(251,243,232,0.55),0_0_26px_rgba(184,109,40,0.22)] dark:border-brand-300/20 dark:bg-[radial-gradient(circle_at_30%_30%,rgba(70,45,24,0.92),rgba(32,22,15,0.98)_52%,rgba(217,168,102,0.12)_100%)] dark:text-brand-100 dark:shadow-[0_0_0_6px_rgba(18,15,12,0.5),0_0_26px_rgba(184,109,40,0.18)]">
                    {mark}
                  </div>
                </div>

                {/* <div className="premium-card p-6 md:p-8"> */}
                  {/* <div className="mb-5 flex items-start gap-4 md:hidden">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-300/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,250,244,0.98),rgba(236,214,188,0.9)_45%,rgba(184,109,40,0.16)_100%)] text-xl font-display font-black text-brand-800 shadow-[0_0_18px_rgba(184,109,40,0.16)] dark:border-brand-300/20 dark:bg-[radial-gradient(circle_at_30%_30%,rgba(70,45,24,0.92),rgba(32,22,15,0.98)_52%,rgba(217,168,102,0.12)_100%)] dark:text-brand-100">
                      {mark}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-2xl leading-tight text-[#18110b] dark:text-[#f7efe3]">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-black uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
                        {item.company}
                      </p>
                    </div>
                  </div> */}

                  <div className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10">
                    <div>
                      <p className="mb-3 hidden text-[11px] font-black uppercase tracking-[0.2em] text-brand-700 md:block dark:text-brand-300">
                        {item.company}
                      </p>
                      <h3 className="mb-4 hidden text-3xl leading-tight text-[#18110b] md:block dark:text-[#f7efe3]">
                        {item.role}
                      </h3>

                      <div className="space-y-3 text-sm text-[#6a4b34] dark:text-stone-300">
                        <div className="flex items-start gap-2.5">
                          <CalendarRange size={16} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" />
                          <span>{item.period}</span>
                        </div>

                        {item.location && (
                          <div className="flex items-start gap-2.5">
                            <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-300" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-5">
                      {item.summary && (
                        <p className="text-base leading-relaxed text-[#3b2819] dark:text-stone-200">
                          {item.summary}
                        </p>
                      )}

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-3 text-[15px] leading-relaxed text-[#4b3524] dark:text-stone-300">
                          {item.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-3">
                              <span className="mt-2 h-px w-7 shrink-0 bg-gradient-to-r from-brand-500 to-brand-300 dark:from-brand-300 dark:to-brand-500" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {(item.stack || item.link) && (
                        <div className="flex flex-col gap-4 pt-1">
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
                                className="inline-flex items-center gap-2 rounded-xl border border-brand-300/45 bg-white/85 px-4 py-2 text-sm font-bold text-brand-700 shadow-[0_10px_24px_rgba(184,109,40,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/60 hover:text-brand-800 dark:border-brand-300/20 dark:bg-brand-950/50 dark:text-brand-200 dark:hover:border-brand-300/45 dark:hover:text-brand-100"
                              >
                                {item.link.label}
                                <ArrowUpRight size={15} />
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                {/* </div> */}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
