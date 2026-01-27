import { Mail } from "lucide-react";

export default function ContactForm({ siteConfig }: any) {
    return (
        <section id="contact" className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto 
            /* Light Mode: Solid light grey */
            bg-slate-100 
            /* Dark Mode: Deep solid slate (not transparent) */
            dark:bg-slate-900 
            p-12 rounded-3xl border 
            border-slate-200 dark:border-white/10 
            shadow-lg transition-all duration-300"
        >
            <Mail className="mx-auto mb-6 text-cyan-600 dark:text-cyan-400" size={40} />
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Let's work together
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 mb-8">
            Currently looking for new opportunities in software development.
            </p>
            
            <a 
            href={`mailto:${siteConfig.email}`} 
            className="bg-slate-900 text-white dark:bg-white dark:text-black px-10 py-4 rounded-xl font-bold hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all inline-block shadow-md"
            >
            Send me an Email
            </a>
        </div>
        </section>
    );
}