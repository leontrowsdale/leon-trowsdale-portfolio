import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Cpu, Code, Layers, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Nav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: "01. ABOUT", icon: Cpu },
    { href: "#skills", label: "02. SYSTEMS", icon: Layers },
    { href: "#projects", label: "03. WORK", icon: Code },
    { href: "#contact", label: "04. CONTACT", icon: Mail },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-primary font-mono font-bold tracking-tighter text-xl">
          <span className="text-white">&lt;</span>
          MECHATRONICS
          <span className="text-white">/&gt;</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "text-sm font-mono tracking-wider transition-colors hover:text-primary flex items-center gap-2",
                "text-muted-foreground"
              )}
            >
              <span className="text-primary/50 text-xs">{link.label.split('.')[0]}.</span>
              {link.label.split(' ')[1]}
            </a>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-l border-white/10 w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-lg font-mono tracking-wider transition-colors hover:text-primary flex items-center gap-4 text-muted-foreground"
                  >
                    <span className="text-primary/50 text-sm">{link.label.split('.')[0]}.</span>
                    {link.label.split(' ')[1]}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
