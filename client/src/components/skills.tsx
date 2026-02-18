import { motion } from "framer-motion";
import { Cpu, Terminal, Settings, Radio, Database, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skills = [
  {
    category: "Robotics & Control",
    icon: Cpu,
    items: ["ROS/ROS2", "Kinematics & Dynamics", "PID Control", "Motion Planning", "Computer Vision (OpenCV)"]
  },
  {
    category: "Embedded Systems",
    icon: Terminal,
    items: ["C/C++", "Python", "STM32 / AVR", "RTOS", "I2C/SPI/UART"]
  },
  {
    category: "Automation & PLC",
    icon: Settings,
    items: ["Siemens TIA Portal", "Industrial IoT", "SCADA Systems", "Pneumatics", "Safety Systems"]
  },
  {
    category: "Hardware Design",
    icon: Zap,
    items: ["PCB Design (KiCad/Altium)", "SolidWorks / CAD", "Circuit Analysis", "Motor Drivers", "Sensors & Actuators"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-card/30 border-y border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="text-primary font-mono text-xl">02.</span>
            TECHNICAL ARSENAL
          </h2>
          <div className="h-1 w-20 bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-secondary/20 border-white/5 h-full hover:border-primary/50 transition-colors duration-300 rounded-none">
                <CardHeader>
                  <skill.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="font-mono text-lg tracking-wide text-white">
                    {skill.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
