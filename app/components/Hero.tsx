import Image from 'next/image';
import { siteConfig } from '@/config/profile';
import { Github, Mail, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          {/* Text: Black in light mode, White in dark mode */}
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            {siteConfig.hero.title}{" "}
            <span className="text-cyan-600 dark:text-cyan-400">
              {siteConfig.hero.titleAccent}
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            {siteConfig.hero.subtext}
          </p>
          
          <div className="flex gap-4">
            {/* Button: Dark background in light mode, White background in dark mode */}
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="bg-slate-900 text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors shadow-lg"
            >
              Get in Touch
            </a>

            {/* GitHub Icon: Slate border in light mode, subtle white border in dark mode */}
            <a 
              href={siteConfig.github} 
              target="_blank" 
              className="border border-slate-200 dark:border-slate-800 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition-all"
            >
              <Github />
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            {/* Glow effect behind image - visible in dark mode */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-2xl border-4 border-white dark:border-slate-900 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="/profile.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}