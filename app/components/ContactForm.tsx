"use client";

import { siteConfig } from '@/config/profile';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useState } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { toast } from 'sonner';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await sendEmail(formData);
        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Message sent successfully! I'll get back to you soon.");
            // Optional: Reset form here if needed, or rely on native form reset
            (document.getElementById("contact-form") as HTMLFormElement)?.reset();
        }
    }

    return (
        <section id="contact" className="section-padding container-max">
            <div className="premium-card overflow-hidden !rounded-[2.6rem] md:!rounded-[3rem]">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative overflow-hidden bg-[linear-gradient(145deg,rgba(47,28,14,0.98),rgba(21,15,11,0.98))] p-6 text-white md:p-14">
                        <div className="absolute inset-0 hero-grid opacity-20" />
                        <div className="absolute -right-12 top-0 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl" />
                        <div className="absolute -bottom-16 -left-8 h-52 w-52 rounded-full bg-brand-700/30 blur-3xl" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
                                Contact / Collaboration
                            </span>
                            <h2 className="mt-5 text-5xl font-display leading-[0.95] tracking-tight">
                                Let&apos;s shape the next product with clarity and range.
                            </h2>
                            <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-white/72">
                                If you need a builder who can move from product interface to backend behavior and deployment detail, we should talk.
                            </p>

                            <div className="mt-10 space-y-4">
                                {[
                                    { icon: <Mail className="w-6 h-6" />, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                                    { icon: <Github className="w-6 h-6" />, label: "GitHub", value: "anguzuDaniel", href: siteConfig.github },
                                    { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "Daniel Anguzu", href: siteConfig.linkedIn }
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        target={item.label !== "Email" ? "_blank" : undefined}
                                        rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                                        className="group/item flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 transition-all duration-300 hover:border-brand-300/25 hover:bg-white/10"
                                    >
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white transition-all duration-300 backdrop-blur-sm group-hover/item:bg-white/20">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-brand-100/70">{item.label}</div>
                                            <div className="text-lg font-bold text-white transition-transform group-hover/item:translate-x-1">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="bg-white/30 p-6 md:p-14 dark:bg-transparent">
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                            action={handleSubmit}
                            id="contact-form"
                        >
                            <div className="mb-8 space-y-3">
                                <span className="section-kicker">Project Brief</span>
                                <h3 className="text-4xl font-display tracking-tight">
                                    Send the details.
                                </h3>
                                <p className="section-copy max-w-xl">
                                    A short overview of the product, problem, or collaboration is enough to start.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Your Name</label>
                                <input type="text" name="name" placeholder="Daniel Anguzu" className="field-input" suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Email Address</label>
                                <input type="email" name="email" placeholder="daniel@exceptional.com" className="field-input" suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Subject</label>
                                <input type="text" name="subject" placeholder="Project Collaboration" className="field-input" suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Your Message</label>
                                <textarea name="message" rows={5} placeholder="Hello Daniel, I'd like to talk about..." className="field-input resize-none" suppressHydrationWarning required />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                suppressHydrationWarning
                                className="flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-brand-600 py-5 text-lg font-bold text-white shadow-xl shadow-brand-500/25 transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                {!isSubmitting && <ArrowRight size={22} />}
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </div>
        </section>
    );
}
