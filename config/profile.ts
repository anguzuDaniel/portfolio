// config/profile.ts

export const siteConfig = {
  name: "Anguzu Daniel",
  role: "Full Stack Software Developer",
  email: "anguzudaniel@example.com", // Replace with your actual email
  github: "https://github.com/anguzuDaniel",
  linkedIn: "https://linkedin.com/in/anguzu-daniel-7b793023a/",
  
  // Hero Section text
  hero: {
    title: "Crafting code that bridges",
    titleAccent: "innovation and scale.",
    subtext: "Passionate about building robust backend systems and intuitive web applications across diverse campus ecosystems."
  },

  // About Me - Pulled from your LinkedIn Summary style
  about: {
    description: `I am a tech enthusiast who believes in the power of clean code and meaningful solutions. 
    My journey is driven by curiosity and a desire to help others succeed, whether it's building backend 
    systems, crafting web applications, or managing technical infrastructure for multiple school branches.`,
    stats: [
      { label: "Repositories", value: "50+" },
      { label: "Branch Projects", value: "10+" },
      { label: "Commitment", value: "100%" }
    ]
  },

  // Skills - Categorized for recruiters
  skills: {
    languages: ["Java", "JavaScript", "SQL", "Python"],
    frameworks: ["React", "Next.js", "Node.js", "Express"],
    tools: ["Git", "PostgreSQL", "Docker", "Vercel"],
    frontend: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    backend: ["Node.js", "Java", "PostgreSQL", "Express"],
  }
};