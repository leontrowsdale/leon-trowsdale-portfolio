import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-background">
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Fixed decoration elements */}
      <div className="fixed bottom-0 left-6 hidden xl:block w-px h-32 bg-gradient-to-t from-primary/50 to-transparent" />
      <div className="fixed bottom-0 right-6 hidden xl:block w-px h-32 bg-gradient-to-t from-primary/50 to-transparent" />
      
      <div className="fixed bottom-8 right-10 hidden xl:flex flex-col gap-6 text-xs font-mono text-primary/50 [writing-mode:vertical-rl] tracking-widest mix-blend-difference z-50">
        SCROLL_Y: <span className="animate-pulse">ACTIVE</span>
      </div>
    </div>
  );
}
