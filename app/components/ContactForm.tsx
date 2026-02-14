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

    // Reusable input style to keep code clean
    const inputStyles = "w-full px-6 py-4 rounded-2xl transition-all font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/50 border " +
        "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 " + // Light Mode
        "dark:bg-zinc-900/50 dark:border-zinc-700/50 dark:text-zinc-100 dark:placeholder:text-zinc-500"; // Dark Mode

    return (
        <section id="contact" className="section-padding container-max">
            <div className="premium-card overflow-hidden !rounded-[3rem] border-none shadow-2xl">
                <div className="grid md:grid-cols-2">

                    {/* Left Sidebar: Brand Info */}
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
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover/item:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10 text-white">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200 mb-1">{item.label}</div>
                                            <div className="text-lg font-bold group-hover/item:translate-x-1 transition-transform text-white">{item.value}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Actual Form */}
                    <div className="p-10 md:p-16 bg-white dark:bg-zinc-950/40 backdrop-blur-md">
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                            action={handleSubmit}
                            id="contact-form"
                        >
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Your Name</label>
                                <input type="text" name="name" placeholder="Daniel Anguzu" className={inputStyles} suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Email Address</label>
                                <input type="email" name="email" placeholder="daniel@exceptional.com" className={inputStyles} suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Subject</label>
                                <input type="text" name="subject" placeholder="Project Collaboration" className={inputStyles} suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest px-1">Your Message</label>
                                <textarea name="message" rows={4} placeholder="Hello Daniel, I'd like to talk about..." className={`${inputStyles} resize-none`} suppressHydrationWarning required />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                suppressHydrationWarning
                                className="w-full bg-brand-600 text-white py-5 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/25 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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