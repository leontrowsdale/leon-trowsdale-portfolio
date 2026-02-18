import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="font-mono text-primary mb-4 text-sm">04. WHAT'S NEXT?</div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Initialize Communication
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I am currently open to new opportunities in robotics, embedded systems, and automation engineering. 
            Whether you have a question or just want to discuss control theory, my inbox is always open.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
             <div className="grid grid-cols-1 gap-6 mb-12">
                 <div className="flex items-center justify-center gap-8">
                     <a href="mailto:hello@example.com" className="flex flex-col items-center gap-2 group">
                         <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-none group-hover:border-primary/50 group-hover:text-primary transition-all">
                             <Mail className="w-5 h-5" />
                         </div>
                         <span className="text-xs font-mono text-muted-foreground">EMAIL</span>
                     </a>
                     <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                         <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-none group-hover:border-primary/50 group-hover:text-primary transition-all">
                             <Linkedin className="w-5 h-5" />
                         </div>
                         <span className="text-xs font-mono text-muted-foreground">LINKEDIN</span>
                     </a>
                     <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                         <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-none group-hover:border-primary/50 group-hover:text-primary transition-all">
                             <Github className="w-5 h-5" />
                         </div>
                         <span className="text-xs font-mono text-muted-foreground">GITHUB</span>
                     </a>
                 </div>
             </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-mono rounded-none px-8 py-6 h-auto text-lg">
              <a href="mailto:hello@example.com">SAY HELLO</a>
            </Button>
          </div>
        </div>

        <footer className="mt-32 text-center text-sm text-muted-foreground font-mono">
          <p>Designed & Engineered by Mechatronic Systems</p>
          <p className="text-xs opacity-50 mt-2">© 2026 Mechatronic Systems Portfolio</p>
        </footer>
      </div>
    </section>
  );
}
