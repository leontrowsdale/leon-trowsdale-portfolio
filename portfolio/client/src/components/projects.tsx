import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Autonomous Warehouse Rover",
    description: "Designed and built a 4-wheel differential drive mobile robot capable of autonomous navigation and obstacle avoidance in a warehouse environment. Implemented SLAM using Lidar and ROS2 navigation stack.",
    tags: ["ROS2", "Python", "C++", "Lidar", "Raspberry Pi"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    links: { demo: "#", code: "#" }
  },
  {
    title: "6-DOF Robotic Arm Controller",
    description: "Developed a custom inverse kinematics solver and trajectory planning algorithm for a 6-DOF robotic manipulator. Interface built with Qt for real-time control and visualization.",
    tags: ["C++", "Qt", "Kinematics", "Real-time Control"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    links: { demo: "#", code: "#" }
  },
  {
    title: "Industrial IoT Monitoring System",
    description: "Created a scalable sensor network for monitoring motor vibration and temperature in a manufacturing line. Data streamed via MQTT to a central dashboard for predictive maintenance analysis.",
    tags: ["ESP32", "MQTT", "Node-RED", "InfluxDB", "Grafana"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    links: { demo: "#", code: "#" }
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex justify-between items-end"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <span className="text-primary font-mono text-xl">03.</span>
              ENGINEERED SYSTEMS
            </h2>
            <div className="h-1 w-20 bg-primary" />
          </div>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-3/5 relative group">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply rounded-sm transition-all duration-300 group-hover:bg-transparent" />
                <div className="absolute -inset-2 border border-primary/20 rounded-sm translate-x-2 translate-y-2 z-[-1] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ maxHeight: '400px' }}
                />
              </div>

              {/* Content Side */}
              <div className={`w-full lg:w-2/5 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                <div className="font-mono text-primary text-sm mb-2">Featured Project</div>
                <h3 className="text-2xl font-bold text-white mb-6">{project.title}</h3>
                
                <div className={`bg-card p-6 rounded-none border border-white/5 mb-6 shadow-xl ${index % 2 === 0 ? 'lg:-ml-12 relative z-10' : 'lg:-mr-12 relative z-10'}`}>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className={`flex flex-wrap gap-3 mb-8 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/20 text-primary font-mono rounded-none">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className={`flex gap-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  <Button variant="ghost" size="icon" className="hover:text-primary rounded-none">
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-primary rounded-none">
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
             <Button variant="outline" className="rounded-none border-primary/50 text-primary hover:bg-primary/10 font-mono gap-2">
                VIEW FULL ARCHIVE <ArrowRight className="w-4 h-4" />
             </Button>
        </div>
      </div>
    </section>
  );
}
