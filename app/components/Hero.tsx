"use client";

import Image from 'next/image';
import { siteConfig } from '@/config/profile';
import { Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative container-max overflow-hidden min-h-[90vh] flex items-center pt-32 pb-20">

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand-500/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-[0.2em] mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
            </span>
            Available for New Projects

          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-zinc-950 dark:text-white mb-6 leading-[1.1] md:leading-[1.05]">
            Crafting code that <span className="relative inline-block">
              <span className="relative z-10 text-brand-600 dark:text-brand-500 italic">bridges</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-1 md:bottom-2 left-0 h-2 md:h-3 bg-brand-500/10 -rotate-1"
              />
            </span>
            <br />
            <span className="text-gradient">
              innovation and scale.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg leading-relaxed font-medium">
            {siteConfig.hero.subtext}
          </p>


          <div className="flex flex-wrap gap-6">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={`mailto:${siteConfig.email}`}
              className="bg-brand-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-2xl shadow-brand-500/25 flex items-center gap-3 text-lg"
            >
              Get in Touch
              <ArrowRight size={22} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.github}
              target="_blank"
              className="bg-white dark:bg-zinc-900/50 p-5 rounded-2xl text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-200/50 dark:border-zinc-800/50"
            >
              <Github size={28} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative group">
            {/* Animated Glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-brand-500 to-blue-600 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] overflow-hidden rounded-[3rem] border-4 border-white/50 dark:border-zinc-800/50 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-2 backdrop-blur-sm">
              <Image
                src="/profile.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                priority
              />
            </div>


            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 premium-card px-6 py-5 hidden lg:block !rounded-[2rem]"
            >

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-500 font-display font-black text-lg">
                  5Y+
                </div>

                <div>
                  <div className="font-display font-bold text-zinc-900 dark:text-white text-lg">Experience</div>
                  <div className="text-sm text-zinc-500 font-medium tracking-wide">In Development</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
