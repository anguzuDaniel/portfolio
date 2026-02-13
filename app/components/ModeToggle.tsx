"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 hover:ring-2 hover:ring-brand-500/50 transition-all duration-300 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 group"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-500 group-hover:rotate-180 transition-transform duration-500" size={20} />
      ) : (
        <Moon className="text-zinc-700 group-hover:-rotate-12 transition-transform duration-500" size={20} />
      )}
    </button>
  );
}