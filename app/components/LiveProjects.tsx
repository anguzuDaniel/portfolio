"use client";

import { siteConfig } from '@/config/profile';
import { motion } from 'framer-motion';
import { ExternalLink, Rocket } from 'lucide-react';

export default function LiveProjects() {
    // If no projects are defined, don't render the section
    if (!siteConfig.projects || siteConfig.projects.length === 0) {
        return null;
    }

    return (
        <section id="live-projects" className="section-padding container-max relative">
            {/* Background Decoration */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-brand-500/5 blur-[100px] -z-10 rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="inline-block py-1 px-3 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-4">
                    Shipped & Live
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Live <span className="text-gradient">Deployments</span>
                </h2>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                    Production-ready applications currently serving real users.
                    Click to launch and explore.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {siteConfig.projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-blue-600 rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur transition duration-500" />
                        <div className="premium-card premium-card-hover h-full p-6 md:p-8 flex flex-col justify-between cursor-default">

                            <div>
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                                        <Rocket size={24} className="group-hover:text-brand-500 transition-colors" />
                                    </div>
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-brand-600 dark:bg-brand-900/20 rounded-xl text-white dark:text-brand-400 hover:bg-brand-700 hover:text-white transition-all shadow-sm hover:shadow-md"
                                        title="Launch App"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>

                                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                                    {project.description}
                                </p>
                            </div>

                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-700 via-blue-600 to-indigo-700 text-white font-bold text-center transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Launch App
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
