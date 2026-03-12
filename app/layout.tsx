import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Anguzu Daniel | Full Stack Developer",
  description: "Portfolio of Anguzu Daniel, a passionate Full Stack Software Developer specializing in robust backend systems and intuitive web & mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className="font-sans antialiased"
      >


        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem>
          <Navbar />
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
