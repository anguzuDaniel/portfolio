"use client";

import { siteConfig } from '@/config/profile';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm() {
    return (
        <section id="contact" className="section-padding px-6 max-w-6xl mx-auto">
            <div className="premium-card overflow-hidden !rounded-[3rem]">

                <div className="grid md:grid-cols-2">

                    <div className="p-10 md:p-16 bg-brand-600 text-white relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 leading-tight tracking-tighter">
                                Let&apos;s Build Something <span className="text-blue-200">Exceptional</span>
                            </h2>
                            <p className="text-blue-100 text-lg mb-8 font-medium leading-relaxed">
                                Ready to transform your ideas into robust digital realities? Let&apos;s connect and discuss your next project.
                            </p>

                            <div className="space-y-6 mt-10">

                                {[
                                    { icon: <Mail className="w-6 h-6" />, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                                    { icon: <Github className="w-6 h-6" />, label: "GitHub", value: "anguzuDaniel", href: siteConfig.github },
                                    { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "Daniel Anguzu", href: siteConfig.linkedIn }
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        target={item.label !== "Email" ? "_blank" : undefined}
                                        className="flex items-center gap-5 group/item transition-all duration-300"
                                    >
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover/item:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200 mb-1">{item.label}</div>
                                            <div className="text-lg font-bold group-hover/item:translate-x-1 transition-transform">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="p-10 md:p-16 bg-white dark:bg-transparent">
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-1">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Daniel Anguzu"
                                    suppressHydrationWarning
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="daniel@exceptional.com"
                                    suppressHydrationWarning
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Project Collaboration"
                                    suppressHydrationWarning
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-medium"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-1">Your Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Hello Daniel, I'd like to talk about..."
                                    suppressHydrationWarning
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-medium resize-none shadow-inner"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                suppressHydrationWarning
                                className="w-full bg-brand-600 text-white py-5 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/25 flex items-center justify-center gap-3 text-lg"
                            >
                                Send Message
                                <ArrowRight size={22} />
                            </motion.button>
                        </motion.form>
                    </div>

                </div>
            </div>
        </section>
    );
}