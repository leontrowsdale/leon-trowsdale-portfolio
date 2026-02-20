// src/data.js

export const PORTFOLIO = {
  name: "Leon Trowsdale",
  role: "Mechatronic & Robotic Engineering Student",
  cvLink: "/Leon_Trowsdale_CV.pdf",
  linkedin: "https://linkedin.com/in/leon-trowsdale",
  email: "leon.trowsdale.uk@gmail.com",
  headshot: "/Hero_Image.png", 

skills: [
    "Fusion360", "3D Printing", "C", "Python", "Arduino", "Blender", "SketchUp", "MATLAB", "Unity"
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
      description: "At MyEdSpace, I create GCSE subject content and moderate live physics lessons, supporting students in real time."
    },
    {
      role: "Technical Consultant",
      company: "Gillieron Scott Acoustic Design",
      year: "Jul 2023 - Present",
      description: "My work at GSAD involves modelling spaces in SketchUp, running acoustic simulations, and calculating reverberation times."
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
      category: "3D Printing / Autodarts",
      image: "/dartboard.png", 
      shortDescription: "Engineered a robust solution integrating C++ logic. Focusing on scalability, real-time performance, and clean architecture.",
      details: "Here is where you can write paragraphs of text about the Dartboard project. You can talk about the hardware you used, the challenges you faced with the C++ logic, and how you solved them. \n\nAdd as much detail as you want here!"
    },
    {
      slug: "lipo-safety-solution",
      title: "LiPo Battery Safety Solution",
      featured: true,
      category: "Product Design / 3D Printing",
      image: "/lipo.png",
      shortDescription: "Engineered a robust storage solution. Focusing on safety, ease of access, and efficient 3D printed architecture.",
      details: "Detailed breakdown of the LiPo Battery Storage project goes here."
    },
    {
      slug: "pan-tilt-face-tracking",
      title: "Pan/Tilt Face Tracking",
      featured: true,
      category: "OpenCV / Arduino",
      image: "/opencv.jpg",
      shortDescription: "Engineered a robust solution integrating Python and Computer Vision logic for real-time tracking.",
      details: "Detailed breakdown of the Pan/Tilt Face Tracking project goes here."
    },
    {
      slug: "3d-printed-hovercraft",
      title: "3D Printed Hovercraft",
      featured: true,
      category: "3D Printing / RC",
      image: "/hovercraft.jpg",
      shortDescription: "Engineered a robust solution integrating high-speed brushless motors and lightweight 3D printed structures.",
      details: "Detailed breakdown of the 3D Printed Hovercraft project goes here."
    },
    {
      slug: "screen-reactive-backlight",
      title: "Screen Reactive Backlight",
      featured: false,
      category: "Arduino / Prismatic / Hyperion",
      image: "/backlight.png",
      shortDescription: "Engineered a robust solution for immersive ambient lighting using real-time screen capture processing.",
      details: "Detailed breakdown of the Screen Reactive Backlight project goes here."
    },
    {
      slug: "ubrobotics",
      title: "UBRobotics",
      featured: false,
      category: "Robotics",
      image: "/ubr.jpg",
      shortDescription: "Creative direction and technical execution of cinematic video projects and post-production.",
      details: "Detailed breakdown of the Videography projects goes here."
    },
    {
      slug: "fpv-drones",
      title: "FPV Drones",
      featured: false,
      category: "Electronics / Betaflight",
      image: "/drone.png",
      shortDescription: "Engineered high-performance flight systems integrating PID tuning and custom electronics layouts.",
      details: "Detailed breakdown of the FPV Drones project goes here."
    },
    {
      slug: "plywood-longboard",
      title: "Plywood Longboard",
      featured: false,
      category: "Woodworking",
      image: "/longboard.jpeg",
      shortDescription: "Engineered a robust structural deck using vacuum-pressing and composite plywood layering.",
      details: "Detailed breakdown of the Plywood Longboard project goes here."
    },
    {
      slug: "videography",
      title: "Videography",
      featured: false,
      category: "Video",
      image: "/video.png",
      shortDescription: "Creative direction and technical execution of cinematic video projects and post-production.",
      details: "Detailed breakdown of the Videography projects goes here."
    }
  ]
};