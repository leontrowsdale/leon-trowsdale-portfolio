// src/data.js

export const PORTFOLIO = {
  name: "Leon Trowsdale",
  role: "Mechatronic & Robotic Engineering Student",
  cvLink: "/Leon_Trowsdale_CV.pdf",
  linkedin: "https://linkedin.com/in/leon-trowsdale",
  email: "leon.trowsdale.uk@gmail.com",
  headshot: "/Hero_Image.png", 

skills: [
    "Fusion360", "3D Printing", "Arduino", "C", "Python", "Blender", "SketchUp", "MATLAB", "Unity", "Videography", "Music Production"
  ],

education: [
    {
      degree: "BEng Mechatronic and Robotic Engineering",
      school: "University of Birmingham",
      year: "Sep 2024 - Jun 2027",
      description: "Focusing on control systems, embedded architecture, and mechanical design."
    },
    {
      degree: "A-levels",
      school: "Blenheim Sixth Form",
      year: "Sep 2024 - Jun 2027",
      description: "Physics, Maths, Further Maths, Product Design"
    }
  ],
  experience: [
    {
      role: "Engineering and Robotics Intern",
      company: "Dexory",
      year: "Jul 2026 - Jul 2027",
      description: ""
    },
    {
      role: "Junior Educational Manager",
      company: "MyEdSpace",
      year: "Feb 2025 - Present",
      description: "At MyEdSpace, I create A-level/GCSE subject content and moderate live physics lessons of 150+ students, providing real-time academic support and ensuring high-quality interactive delivery."
    },
    {
      role: "Technical Consultant",
      company: "Gillieron Scott Acoustic Design",
      year: "Jul 2023 - Present",
      description: "My work at GSAD involves modelling spaces in SketchUp, running acoustic simulations, and calculating reverberation times. I have also contributed to marketing initiatives, including automated outreach campaigns and CRM implementation"
    },
    {
      role: "Work Experience",
      company: "Cabinet Office",
      year: "Jul 2023",
      description: "Gained experience within the Cabinet Office Cyber Directorate, learning about advanced technologies used to prevent and respond to security breaches."
    }
  ],

  projects: [
    {
      slug: "automatic-dartboard",
      title: "Automatic Dartboard",
      featured: true,
      archived: false,
      category: "3D Printing / Autodarts",
      image: "/dartboard.png", 
      shortDescription: "Engineered a robust solution integrating C++ logic. Focusing on scalability, real-time performance, and clean architecture.",
      details: 
`
A strong example of practical engineering testing was the development of an automated dartboard scoring system I assembled and installed in my university flat. The system used multiple cameras and controlled lighting to detect dart impacts, making structured testing essential.

I began by defining performance criteria such as detection accuracy, repeatability, and robustness under varying lighting conditions. Initial tests focused on camera placement and exposure, followed by controlled trials throwing darts from consistent distances while recording errors.

During testing, accuracy dropped significantly, an issue that got me stumbled. By isolating variables and comparing results, I identified that the problems arose using alternative dart flights that were slightly translucent, reducing contrast and interfering with the vision system. This led to iterative improvements in lighting diffusion and detection thresholds. 

Mechanical mounting was also tested for rigidity and alignment. Due to accommodation restrictions preventing wall fixings, I evaluated alternative methods and ultimately used thin double-sided adhesive strips at the camera bases.

After 14,774 dart throws, only 351 corrections were required, achieving 97.62% accuracy. This project reinforced the value of controlled testing, root-cause analysis, and validating performance across realistic variations - skills directly applicable to systems integration and safety-critical validation.
`
    },
    {
      slug: "lipo-safety-solution",
      title: "LiPo Battery Safety Solution",
      featured: true,
      archived: false,
      category: "Product Design / 3D Printing",
      image: "/lipo.png",
      shortDescription: "A-level Product Design NEA, portable device designed to safely contain and vent lithium-ion battery fires during thermal runaway for drone users.",
      details: 
`
This project focuses on creating a compact and portable safety solution to reduce the dangers associated with lithium-ion battery fires, particularly those used in drone applications, after research highlighted the increasing number and severity of thermal runaway incidents.

 The idea was developed in response to real-world fire cases, expert interviews, material testing, and analysis of existing commercial products that were either too expensive or not portable enough for hobbyist users. 

Through iterative sketching, CAD modelling, rapid prototyping, spring and material testing, and user feedback, the design evolved into a collapsible aluminium container lined with woven fibreglass and fitted with ventilation and flame-filtering features to safely release pressure while containing flames. 

The final outcome meets the design specification for portability, usability, and fire mitigation, and the full project presentation detailing the research, development, and evaluation process is shown below  
`,
      pdfLink: "/battery-safety.pdf"
    },
    {
      slug: "pan-tilt-face-tracking",
      title: "Pan/Tilt Face Tracking",
      featured: true,
      archived: true,
      category: "OpenCV / Arduino",
      image: "/opencv.jpg",
      shortDescription: "Engineered a robust solution integrating Python and Computer Vision logic for real-time tracking.",
      details: "Detailed breakdown of the Pan/Tilt Face Tracking project goes here."
    },
    {
      slug: "3d-printed-hovercraft",
      title: "3D Printed Hovercraft",
      featured: true,
      archived: false,
      category: "3D Printing / RC",
      image: "/hovercraft.jpg",
      shortDescription: "Engineered a robust solution integrating high-speed brushless motors and lightweight 3D printed structures.",
      details: 
`
During my A-Levels, I developed a strong interest in 3D printing and even acquired my own printer to explore its capabilities. One of the projects I’m most proud of was building a fully 3D-printed remote-control hovercraft. The idea came about after I discovered some unused drone parts - two brushless DC motors, a micro-servo, an ESC, a receiver, and lithium polymer batteries - and decided to repurpose them into something new.

I printed the parts at home (which took over 15 hours), assembled the components and tested the design. One key challenge I faced was the hovercraft’s skirt tearing when it moved over rough surfaces like concrete or gravel. To solve this, I experimented with materials and eventually reinforced the skirt by double-lining a bin bag, which greatly improved its durability.

The project was both technically and creatively rewarding. It deepened my understanding of mechanical design, electronics, and problem-solving, while also demonstrating how persistence and iteration lead to tangible results. Seeing the hovercraft successfully glide across the floor was an incredibly satisfying moment - not just because it worked, but because it represented my ability to turn curiosity and resourcefulness into a real, functioning creation that inspired others around me to experiment with 3D printing too.
`
    },
    {
      slug: "screen-reactive-backlight",
      title: "Screen Reactive Backlight",
      featured: false,
      archived: true,
      category: "Arduino / Prismatic / Hyperion",
      image: "/backlight.png",
      shortDescription: "Engineered a robust solution for immersive ambient lighting using real-time screen capture processing.",
      details: "Detailed breakdown of the Screen Reactive Backlight project goes here."
    },
    {
      slug: "ubrobotics",
      title: "UBRobotics",
      featured: false,
      archived: true,
      category: "Robotics",
      image: "/ubr.jpg",
      shortDescription: "Creative direction and technical execution of cinematic video projects and post-production.",
      details: "Detailed breakdown of the Videography projects goes here."
    },
    {
      slug: "fpv-drones",
      title: "FPV Drones",
      featured: false,
      archived: true,
      category: "Electronics / Betaflight",
      image: "/drone.png",
      shortDescription: "Engineered high-performance flight systems integrating PID tuning and custom electronics layouts.",
      details: "Detailed breakdown of the FPV Drones project goes here."
    },
    {
      slug: "plywood-longboard",
      title: "Plywood Longboard",
      featured: false,
      archived: true,
      category: "Woodworking",
      image: "/longboard.jpeg",
      shortDescription: "Engineered a robust structural deck using vacuum-pressing and composite plywood layering.",
      details: "Detailed breakdown of the Plywood Longboard project goes here."
    },
    {
      slug: "videography",
      title: "Videography",
      featured: false,
      archived: true,
      category: "Video",
      image: "/video.png",
      shortDescription: "Creative direction and technical execution of cinematic video projects and post-production.",
      details: "Detailed breakdown of the Videography projects goes here."
    }
  ]
};