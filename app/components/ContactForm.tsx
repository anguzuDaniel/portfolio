"use client";

import { ArrowRight } from 'lucide-react';
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
                <div className="bg-[rgba(255,248,240,0.9)] p-6 md:p-14 dark:bg-transparent">
                        <motion.form
                            initial={{ x: 20 }}
                            whileInView={{ x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                            action={handleSubmit}
                            id="contact-form"
                        >
                            <div className="mb-8 space-y-3">
                                <span className="section-kicker">Project Brief</span>
                                <h3 className="text-4xl font-display tracking-tight text-[#18110b] dark:text-inherit">
                                    Send the details.
                                </h3>
                                <p className="section-copy max-w-xl">
                                    A short overview of the product, problem, or collaboration is enough to start.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-700 dark:text-stone-400">Your Name</label>
                                <input type="text" name="name" placeholder="Daniel Anguzu" className="field-input" suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-700 dark:text-stone-400">Email Address</label>
                                <input type="email" name="email" placeholder="daniel@exceptional.com" className="field-input" suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-700 dark:text-stone-400">Subject</label>
                                <input type="text" name="subject" placeholder="Project Collaboration" className="field-input" suppressHydrationWarning required />
                            </div>

                            <div className="space-y-3">
                                <label className="px-1 text-[10px] font-black uppercase tracking-[0.22em] text-stone-700 dark:text-stone-400">Your Message</label>
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
        </section>
    );
}
