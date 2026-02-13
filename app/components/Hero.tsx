"use client";

import Image from 'next/image';
import { siteConfig } from '@/config/profile';
import { Github, ArrowRight, Code2, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative container-max overflow-hidden min-h-[95vh] flex items-center pt-32 pb-20">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Available for New Projects
          </motion.div>

          <h1 className="text-5xl md:text-8xl tracking-tighter mb-8 leading-[1] md:leading-[0.95] font-black">
            Crafting code that{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-600 dark:text-brand-400 italic font-serif px-2">
                bridges
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-2 md:bottom-4 left-0 h-3 md:h-4 bg-brand-500/20 dark:bg-brand-500/10 -rotate-1"
              />
            </span>
            <br />
            <span className="text-gradient">
              innovation and scale.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-lg leading-relaxed font-medium">
            {siteConfig.hero.subtext}
          </p>

          <div className="flex flex-wrap gap-5">
            <motion.a
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              href={`mailto:${siteConfig.email}`}
              className="bg-brand-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30 flex items-center gap-3 text-lg"
            >
              Start a Project
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.github}
              target="_blank"
              className="bg-white dark:bg-zinc-900/50 p-5 rounded-2xl text-zinc-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <Github size={28} />
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT CONTENT (Placeholder for Image) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center md:justify-end relative"
        >
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            
            {/* Visual Decorative Grid when Image is hidden */}
            <div className="absolute inset-0 grid grid-cols-3 gap-4 opacity-20 dark:opacity-10 pointer-events-none">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="border border-zinc-400 dark:border-zinc-500 rounded-3xl" />
                ))}
            </div>

            {/* <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] overflow-hidden rounded-[3rem] border-4 border-white/50 dark:border-zinc-800/50 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-2 backdrop-blur-sm">
              <Image
                src="/profile.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                priority
              />
            </div> */}

            {/* Floating Experience Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 premium-card px-8 py-6 !rounded-[2.5rem] shadow-2xl border-brand-500/20"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <Code2 size={32} />
                </div>
                <div>
                  <div className="font-display font-black text-zinc-900 dark:text-white text-3xl">5Y+</div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Years Experience</div>
                </div>
              </div>
            </motion.div>

            {/* Secondary Floating Elements to fill space */}
            <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-10 right-10 p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 text-brand-600"
            >
                <Cpu size={24} />
            </motion.div>

            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-20 left-0 p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-700 text-blue-500"
            >
                <Globe size={24} />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}