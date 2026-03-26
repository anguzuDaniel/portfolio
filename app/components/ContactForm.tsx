"use client";

import { useHasMounted } from "@/lib/useHasMounted";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";
import { sendEmail } from "../actions/sendEmail";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { resolvedTheme } = useTheme();
  const hasMounted        = useHasMounted();
  const isDark            = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens ──────────────────────────────────────────────────────────
  const ink      = isDark ? "#ede0c8" : "#1a1208";
  const inkMuted = isDark ? "#8a7a64" : "#7a6a58";
  const gold     = isDark ? "#c8923a" : "#a8721e";
  const ruleLine = isDark ? "rgba(200,146,58,0.13)" : "rgba(168,114,30,0.15)";

  // Outer panel
  const panelBg     = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.70)";
  const panelBorder = isDark ? "rgba(200,146,58,0.10)"   : "rgba(168,114,30,0.14)";
  const panelShadow = isDark
    ? "0 4px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)"
    : "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)";

  // Input fields
  const fieldBg          = isDark ? "rgba(255,255,255,0.04)"  : "rgba(255,252,248,0.90)";
  const fieldBorder      = isDark ? "rgba(200,146,58,0.12)"   : "rgba(168,114,30,0.20)";
  const fieldFocusBorder = isDark ? "rgba(200,146,58,0.40)"   : "rgba(168,114,30,0.50)";
  const fieldFocusShadow = isDark
    ? "0 0 0 3px rgba(200,146,58,0.10)"
    : "0 0 0 3px rgba(168,114,30,0.08)";
  const fieldText        = isDark ? "#ede0c8" : "#1a1208";

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await sendEmail(formData);
    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Message sent! I'll get back to you soon.");
      (document.getElementById("contact-form") as HTMLFormElement)?.reset();
    }
  }

  const labelStyle: React.CSSProperties = {
    color:      inkMuted,
    fontFamily: "'DM Mono', monospace",
    fontSize:   "9px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    paddingLeft: "2px",
    display: "block",
  };

  const fieldStyle: React.CSSProperties = {
    width:           "100%",
    background:      fieldBg,
    border:          `1px solid ${fieldBorder}`,
    borderRadius:    "0.85rem",
    padding:         "0.85rem 1rem",
    color:           fieldText,
    fontSize:        "14px",
    lineHeight:      1.6,
    outline:         "none",
    transition:      "border-color 0.2s, box-shadow 0.2s",
    fontFamily:      "'Instrument Sans', sans-serif",
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = fieldFocusBorder;
    e.currentTarget.style.boxShadow   = fieldFocusShadow;
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = fieldBorder;
    e.currentTarget.style.boxShadow   = "none";
  }

  return (
    <section id="contact" className="section-padding container-max">
      <div
        className="overflow-hidden rounded-[2rem] backdrop-blur-sm md:rounded-[2.5rem]"
        style={{
          background: panelBg,
          border:     `1px solid ${panelBorder}`,
          boxShadow:  panelShadow,
        }}
      >
        <div className="p-7 md:p-12">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6" style={{ background: gold }} />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: gold }}
              >
                Project Brief
              </span>
            </div>

            <h3
              className="text-4xl leading-tight tracking-[-0.04em] sm:text-5xl"
              style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Send the details.
            </h3>

            <p className="max-w-xl text-base leading-[1.85]" style={{ color: inkMuted }}>
              A short overview of the product, problem, or collaboration is enough to start.
            </p>
          </motion.div>

          {/* ── Divider ─────────────────────────────────────────────────────── */}
          <div className="mb-8 h-px w-full" style={{ background: ruleLine }} />

          {/* ── Form ────────────────────────────────────────────────────────── */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
            action={handleSubmit}
            id="contact-form"
          >
            {/* Name + Email — side by side on md+ */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Daniel Anguzu"
                  required
                  suppressHydrationWarning
                  style={fieldStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="space-y-2">
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="daniel@exceptional.com"
                  required
                  suppressHydrationWarning
                  style={fieldStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label style={labelStyle}>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Project Collaboration"
                required
                suppressHydrationWarning
                style={fieldStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label style={labelStyle}>Your Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Hello Daniel, I'd like to talk about..."
                required
                suppressHydrationWarning
                style={{ ...fieldStyle, resize: "none" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* ── Submit ────────────────────────────────────────────────────── */}
            <div className="pt-2">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                suppressHydrationWarning
                className="group flex w-full items-center justify-center gap-3 rounded-[1rem] py-4 text-[15px] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background: gold,
                  color:      "#faf8f4",
                  boxShadow:  isDark
                    ? "0 8px 28px rgba(200,146,58,0.28)"
                    : "0 8px 24px rgba(168,114,30,0.26)",
                  fontFamily: "'Instrument Sans', sans-serif",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.background = isDark
                      ? "#d4a050"
                      : "#8c5e14";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = gold;
                }}
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                {!isSubmitting && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}