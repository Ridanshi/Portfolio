import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Mail, ArrowUpRight, Code, Server, Palette,
  ChevronDown, Download, Link as LinkIcon
} from 'lucide-react';

const oracleLogo = "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg";
const udemyLogo = "/Udemy-Symbol.png";

export default function Homepage() {
  const [openModal, setOpenModal] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isDeletingTitle, setIsDeletingTitle] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(75);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, []);



  const roles = ["Modern Web Developer", "UI/UX Designer", "Frontend Expert"];
  const titles = ["A Web Developer", "An AIML Enthusiast"];

  const certificates = [
    {
      title: "OCI Generative AI Professional Certification",
      issuer: "Oracle",
      logo: oracleLogo,
      year: "2025",
      desc: "Professional-level certification demonstrating expertise in generative AI technologies on Oracle Cloud Infrastructure.",
      tags: ["Generative AI", "Oracle Cloud", "AI Professional", "OCI"],
      id: "1019410790CI25GAIOCP",
      certificatePdf: "ecertificate gen ai_page-0001.jpg",
      verifyLink: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=D998D48C7AF9825989572D3B4559BC57E772FD9CB8F7782366F18FFF8268BF73"
    },
    {
      title: "Mastering Data Structures & Algorithms using C and C++",
      issuer: "Udemy",
      logo: udemyLogo,
      year: "2025",
      desc: "Completed practical training in core data structures and algorithms, including arrays, linked lists, trees, sorting, and dynamic programming using C. Gained strong foundational skills for problem-solving and efficient coding.",
      tags: ["Data Structures", "Algorithms", "C Programming", "Udemy"],
      id: "MLAZ-20246548",
      certificatePdf: "/dsa cert.jpg"
    },
    {
      title: "Learn C++ Programming – Beginner to Advance",
      issuer: "Udemy",
      logo: udemyLogo,
      year: "2025",
      desc: "Completed practical training in C++ programming, covering OOP, pointers, memory management, and STL basics. Developed a strong foundation for writing efficient and structured C++ code.",
      tags: ["C++", "Object-Oriented Programming", "Memory Management", "STL"],
      id: "UC-c1b23806-fa4e-4849-ad8f-48085ad57ace",
      certificatePdf: "/cpp cert.jpg"
    }


  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(75);
  };

  const openCertificate = (cert) => {
    setActiveCert(cert);
    setOpenModal(true);
    setZoomLevel(75);
  };

  const closeModal = () => {
    setOpenModal(false);
    setActiveCert(null);
    setZoomLevel(100);
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
    setEmailCopied(false);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setEmailCopied(false);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('ridanshiagarwal2@gmail.com').then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const openResume = () => {
    setShowResume(true);
  };

  const closeResume = () => {
    setShowResume(false);
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  useEffect(() => {
    const currentText = titles[currentTitle];
    const timeout = setTimeout(() => {
      if (!isDeletingTitle) {
        if (titleText.length < currentText.length) {
          setTitleText(currentText.slice(0, titleText.length + 1));
        } else {
          setTimeout(() => setIsDeletingTitle(true), 2000);
        }
      } else {
        if (titleText.length > 0) {
          setTitleText(titleText.slice(0, -1));
        } else {
          setIsDeletingTitle(false);
          setCurrentTitle((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeletingTitle ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [titleText, isDeletingTitle, currentTitle, titles]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --bg-color: ${isDarkMode ? '#030712' : '#ffffff'};
  --bg-secondary: ${isDarkMode ? '#111827' : '#f8fafc'};
  --border-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.08)'};
  --text-primary: ${isDarkMode ? '#f9fafb' : '#0f172a'};
  --text-secondary: ${isDarkMode ? '#9ca3af' : '#475569'};
  --text-accent: ${isDarkMode ? '#38bdf8' : '#0284c7'};
  --header-bg: ${isDarkMode ? 'rgba(3, 7, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
}

    .portfolio-pro {
      background-color: var(--bg-color);
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }


.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: ${isDarkMode
      ? 'linear-gradient(135deg, #02040a, #0a0c14, #111827)'
      : 'linear-gradient(135deg, #f0f9ff, #e0f2fe, #ffffff)'};
  background-size: 200% 200%;
  animation: gradient-flow 15s ease infinite;
  overflow: hidden;
}

.particle-background::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${isDarkMode
      ? 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, transparent 70%)'};
  top: -250px;
  right: -150px;
  animation: float-orb 20s ease-in-out infinite;
}

.particle-background::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${isDarkMode
      ? 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'};
  bottom: -200px;
  left: -100px;
  animation: float-orb 25s ease-in-out infinite reverse;
}

    @keyframes gradient-flow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

.particle {
  position: absolute;
  border-radius: 50%;
  background: ${isDarkMode ? 'var(--text-accent)' : '#0284c7'};
  opacity: 0;
  animation: float 25s linear infinite;
  box-shadow: ${isDarkMode
      ? '0 0 20px rgba(56, 189, 248, 0.5)'
      : '0 0 15px rgba(2, 132, 199, 0.4)'};
}


.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${isDarkMode
      ? 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)'
      : 'linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)'};
  background-size: 50px 50px;
  opacity: 0.5;
  animation: grid-move 30s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes float-orb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

.glow-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${isDarkMode ? 'rgba(56, 189, 248, 0.8)' : 'rgba(2, 132, 199, 0.6)'};
  border-radius: 50%;
  box-shadow: ${isDarkMode
      ? '0 0 15px 3px rgba(56, 189, 248, 0.6)'
      : '0 0 10px 2px rgba(2, 132, 199, 0.4)'};
  animation: glow-pulse 4s ease-in-out infinite;
}

// .certification-list {
//   display: grid;
//   grid-template-columns: repeat(3, 360px);
//   gap: 2rem;
//   justify-content: center;
// }

.certification-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  justify-content: center;
}


.project-card {
  max-width: 350px;
  width: 100%;
}

.certifications-header {
  max-width: 1144px; /* EXACT width of the card grid */
  margin: 0 auto 0.5rem;
  padding: 0 1.5rem; /* keeps it safe on smaller screens */
}

#certifications .section-title {
  margin-left: -27px;
}





    
.glow-dot:nth-child(50){ left: 15%; top: 20%; animation-delay: 0s; }
.glow-dot:nth-child(51){ left: 85%; top: 15%; animation-delay: 1s; }
.glow-dot:nth-child(52){ left: 25%; top: 75%; animation-delay: 2s; }
.glow-dot:nth-child(53){ left: 75%; top: 85%; animation-delay: 1.5s; }
.glow-dot:nth-child(54){ left: 50%; top: 30%; animation-delay: 0.5s; }
.glow-dot:nth-child(55){ left: 10%; top: 60%; animation-delay: 2.5s; }
.glow-dot:nth-child(56){ left: 90%; top: 50%; animation-delay: 1.8s; }
.glow-dot:nth-child(57){ left: 40%; top: 90%; animation-delay: 0.8s; }


@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(2);
  }
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${isDarkMode
      ? 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)'
      : 'linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)'};
  background-size: 50px 50px;
  opacity: 0.5;
  animation: grid-move 30s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}


    .particle:nth-child(1){ width: 8px; height: 8px; left: 10%; animation-delay: 1s; animation-duration: 23s; }
    .particle:nth-child(2){ width: 5px; height: 5px; left: 20%; animation-delay: 3s; animation-duration: 28s; }
    .particle:nth-child(3){ width: 10px; height: 10px; left: 30%; animation-delay: 0s; animation-duration: 22s; }
    .particle:nth-child(4){ width: 6px; height: 6px; left: 40%; animation-delay: 5s; animation-duration: 30s; }
    .particle:nth-child(5){ width: 7px; height: 7px; left: 50%; animation-delay: 2s; animation-duration: 24s; }
    .particle:nth-child(6){ width: 4px; height: 4px; left: 60%; animation-delay: 8s; animation-duration: 32s; }
    .particle:nth-child(7){ width: 9px; height: 9px; left: 70%; animation-delay: 4s; animation-duration: 26s; }
    .particle:nth-child(8){ width: 5px; height: 5px; left: 80%; animation-delay: 6s; animation-duration: 29s; }
    .particle:nth-child(9){ width: 6px; height: 6px; left: 90%; animation-delay: 1s; animation-duration: 25s; }
    .particle:nth-child(10){ width: 8px; height: 8px; left: 15%; animation-delay: 10s; animation-duration: 20s; }

    .particle:nth-child(11){ width: 4px; height: 4px; left: 25%; animation-delay: 7s; animation-duration: 27s; }
.particle:nth-child(12){ width: 7px; height: 7px; left: 35%; animation-delay: 9s; animation-duration: 31s; }
.particle:nth-child(13){ width: 5px; height: 5px; left: 45%; animation-delay: 11s; animation-duration: 21s; }
.particle:nth-child(14){ width: 9px; height: 9px; left: 55%; animation-delay: 4s; animation-duration: 26s; }
.particle:nth-child(15){ width: 6px; height: 6px; left: 65%; animation-delay: 2s; animation-duration: 29s; }

.star {
  position: absolute;
  width: 3px;
  height: 3px;
  background: ${isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(2, 132, 199, 0.5)'};
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
  box-shadow: ${isDarkMode
      ? '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(56, 189, 248, 0.6)'
      : '0 0 4px rgba(2, 132, 199, 0.3), 0 0 8px rgba(2, 132, 199, 0.2)'};
}

.star:nth-child(16){ left: 5%; top: 10%; animation-delay: 0s; }
.star:nth-child(17){ left: 15%; top: 20%; animation-delay: 0.5s; }
.star:nth-child(18){ left: 25%; top: 15%; animation-delay: 1s; }
.star:nth-child(19){ left: 35%; top: 25%; animation-delay: 1.5s; }
.star:nth-child(20){ left: 45%; top: 8%; animation-delay: 2s; }
.star:nth-child(21){ left: 55%; top: 18%; animation-delay: 2.5s; }
.star:nth-child(22){ left: 65%; top: 12%; animation-delay: 0.8s; }
.star:nth-child(23){ left: 75%; top: 22%; animation-delay: 1.2s; }
.star:nth-child(24){ left: 85%; top: 16%; animation-delay: 1.8s; }
.star:nth-child(25){ left: 95%; top: 20%; animation-delay: 2.2s; }
.star:nth-child(26){ left: 8%; top: 50%; animation-delay: 0.3s; }
.star:nth-child(27){ left: 18%; top: 60%; animation-delay: 0.9s; }
.star:nth-child(28){ left: 28%; top: 55%; animation-delay: 1.4s; }
.star:nth-child(29){ left: 38%; top: 65%; animation-delay: 1.9s; }
.star:nth-child(30){ left: 48%; top: 58%; animation-delay: 2.4s; }
.star:nth-child(31){ left: 58%; top: 68%; animation-delay: 0.6s; }
.star:nth-child(32){ left: 68%; top: 52%; animation-delay: 1.1s; }
.star:nth-child(33){ left: 78%; top: 62%; animation-delay: 1.6s; }
.star:nth-child(34){ left: 88%; top: 56%; animation-delay: 2.1s; }
.star:nth-child(35){ left: 12%; top: 85%; animation-delay: 0.4s; }

.floating-orb-1 {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${isDarkMode
      ? 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, transparent 70%)'};
  top: -250px;
  right: -150px;
  animation: float-orb 20s ease-in-out infinite;
  pointer-events: none;
}

.floating-orb-2 {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${isDarkMode
      ? 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'};
  bottom: -200px;
  left: -100px;
  animation: float-orb 25s ease-in-out infinite reverse;
  pointer-events: none;
}

.floating-orb-3 {
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: ${isDarkMode
      ? 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
      : 'radial-gradient(circle, rgba(219, 39, 119, 0.08) 0%, transparent 70%)'};
  top: 50%;
  left: 50%;
  animation: float-orb 30s ease-in-out infinite;
  pointer-events: none;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@keyframes float-orb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
        }
    }

    .content-wrapper {
      position: relative;
      z-index: 1;
      max-width: 1024px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 0;
  background-color: var(--header-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  box-shadow: ${isDarkMode ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'};
}
    .header .content-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--text-primary);
    }
    .nav-menu a {
        color: var(--text-secondary);
        text-decoration: none;
        padding: 0.5rem 1rem;
        font-weight: 500;
        transition: color 0.3s ease;
        position: relative;
    }
    .nav-menu a:hover {
        color: var(--text-primary);
    }
    .nav-menu a.active {
        color: var(--text-accent);
    }

    #home {
      padding-top: 12rem;
      padding-bottom: 8rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .hero-title {
      font-size: clamp(2.8rem, 6vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.025em;
      margin-bottom: 1.5rem;
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin-bottom: 2rem;
    }
.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--text-accent);
  color: ${isDarkMode ? 'var(--bg-color)' : '#ffffff'};
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${isDarkMode ? 'none' : '0 4px 6px -1px rgba(2, 132, 199, 0.2)'};
}
.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: ${isDarkMode
      ? '0 10px 20px rgba(56, 189, 248, 0.15)'
      : '0 10px 25px rgba(2, 132, 199, 0.3)'};
}
    
    section {
      padding: 6rem 0;
      border-top: 1px solid var(--border-color);
    }
    #home {
        border-top: none;
    }
    .section-title {
      font-size: 2.25rem;
      font-weight: 700;
      margin-bottom: 3rem;
      color: var(--text-primary);
    }

    #about p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.7;
      max-width: 700px;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
.skill-card {
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${isDarkMode ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.05)'};
}
.skill-card:hover {
  transform: translateY(-5px);
  border-color: var(--text-accent);
  box-shadow: ${isDarkMode
      ? 'none'
      : '0 10px 20px rgba(0, 0, 0, 0.08)'};
}
    .skill-card h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    .skill-card p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

.project-card {
  background-color: ${isDarkMode ? 'transparent' : 'var(--bg-secondary)'};
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
  box-shadow: ${isDarkMode ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.05)'};
}

.project-card:hover {
  background-color: var(--bg-secondary);
  transform: translateY(-5px);
  box-shadow: ${isDarkMode
      ? 'none'
      : '0 10px 20px rgba(0, 0, 0, 0.08)'};
}
    .project-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .project-card p {
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }
    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--text-accent);
        text-decoration: none;
        font-weight: 500;
    }

    #contact {
        text-align: center;
    }
    #contact p {
        font-size: 1.25rem;
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto 3rem;
    }
    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .social-links a {
      color: var(--text-secondary);
      transition: color 0.3s, transform 0.3s;
    }
    .social-links a:hover {
      color: var(--text-primary);
      transform: translateY(-3px);
    }
.footer {
  width: 100%;
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
  position: relative;
  z-index: 2;

  border-top: 1px solid rgba(255, 255, 255, 0.15);

  background: transparent;
}



    @media (max-width: 768px) {
        .hero-title { font-size: 2.25rem; }
        .hero-subtitle { font-size: 1rem; }
        section { padding: 4rem 0; }
        .section-title { font-size: 1.75rem; }
        #home { padding-top: 8rem; padding-bottom: 4rem; }
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }


.cert-actions {
  display: flex;
  flex-direction: column;   /* stack vertically */
  gap: 0.75rem;
  margin-top: auto;
}


.btn-primary {
  flex: 1;
  background: var(--text-accent);
  color: var(--bg-color);
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(56, 189, 248, 0.35);
}

.btn-secondary {
  flex: 1;
  background: transparent;
  color: var(--text-accent);
  border: 1px solid var(--border-color);
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
}

.cert-id {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  word-break: break-all;
}

.cert-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.cert-badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 9999px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-primary);
  white-space: nowrap;
}

.btn-primary,
.btn-secondary {
  width: 100%;
  display: flex;
  align-items: center;        /* vertical centering */
  justify-content: center;    /* horizontal centering */
  gap: 0.6rem;                /* icon–text spacing */
}


@media (max-width: 768px) {

  /* ===== GLOBAL SAFETY ===== */
  html, body {
    overflow-x: hidden;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  /* ===== HEADER / NAVBAR ===== */
  .header {
    padding: 0.75rem 0;
  }

  .header .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .logo {
    width: 40px !important;
    height: 40px !important;
    font-size: 0.9rem !important;
    flex-shrink: 0;
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    right: 1rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 0.75rem;
    display: none;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 999;
  }

  .nav-menu.open {
    display: flex;
  }

  .nav-menu a {
    padding: 0.5rem 0.75rem;
    text-align: right;
  }

  /* ===== SECTIONS ===== */
  section {
    padding: 3.5rem 0;
  }

  .section-title {
    font-size: 1.6rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  #home {
    padding-top: 8rem;
    padding-bottom: 4rem;
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  /* ===== PROJECTS ===== */
  .project-card {
    max-width: 100%;
  }

  .project-image {
    height: 150px !important;
  }
  
  /* Center project cards on mobile */
  .project-list {
    display: flex;
    flex-direction: column;
    align-items: center;     /* ⬅️ centers cards */
    gap: 1.5rem;
  }

  .project-list .project-card {
    width: 100%;
    max-width: 360px;        /* same visual balance as certifications */
  }

  /* ===== CERTIFICATIONS ===== */
  #certifications .section-title {
    margin-left: 0;
    text-align: center;
  }

  /* Center certification cards on mobile */
  .certification-list {
    grid-template-columns: 1fr;
    justify-items: center;   /* ⬅️ THIS is the key */
  }

  .certification-list .project-card {
    width: 100%;
    max-width: 360px;        /* keeps it clean, not edge-to-edge */
  }

  .cert-badges {
    justify-content: center;
  }

  .cert-actions {
    gap: 0.6rem;
  }

  /* ===== FOOTER ===== */
  .footer {
    padding: 2rem 1rem;
    font-size: 0.8rem;
  }
}




    
  `;

  return (
    <div className="portfolio-pro">
      <style>{portfolioStyles}</style>
      <div className="particle-background">
        <div className="grid-overlay"></div>
        <div className="floating-orb-1"></div>
        <div className="floating-orb-2"></div>
        <div className="floating-orb-3"></div>
        {[...Array(35)].map((_, i) => (
          <div key={i} className={i < 15 ? "particle" : "star"}></div>
        ))}
      </div>

      <header className="header">
        <div className="content-wrapper">
          <div className="logo" style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-secondary)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 700
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-accent)';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.color = 'var(--text-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >RA</div>
<nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
  <a
    href="#home"
    onClick={(e) => {
      scrollToSection(e, "home");
      setMobileMenuOpen(false);
    }}
  >
    Home
  </a>

  <a
    href="#about"
    onClick={(e) => {
      scrollToSection(e, "about");
      setMobileMenuOpen(false);
    }}
  >
    About
  </a>

  <a
    href="#skills"
    onClick={(e) => {
      scrollToSection(e, "skills");
      setMobileMenuOpen(false);
    }}
  >
    Skills
  </a>

  <a
    href="#projects"
    onClick={(e) => {
      scrollToSection(e, "projects");
      setMobileMenuOpen(false);
    }}
  >
    Projects
  </a>

  <a
    href="#certifications"
    onClick={(e) => {
      scrollToSection(e, "certifications");
      setMobileMenuOpen(false);
    }}
  >
    Certifications
  </a>

  <a
    href="#contact"
    onClick={(e) => {
      scrollToSection(e, "contact");
      setMobileMenuOpen(false);
    }}
  >
    Contact
  </a>
</nav>


          <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            {isMobile && (
    <button
      onClick={() => setMobileMenuOpen(prev => !prev)}
      aria-label="Open menu"
      style={{
        background: "none",
        border: "none",
        color: "var(--text-primary)",
        cursor: "pointer",
      }}
    >
      <ChevronDown size={24} />
    </button>
  )}

            
        </div>
      </header>

      <div className="content-wrapper">
        <main>
          <section id="home">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="hero-title">
                Hi, I'm Ridanshi Agarwal. <br />
                {titleText}<span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  backgroundColor: 'currentColor',
                  marginLeft: '2px',
                  animation: 'blink 1s infinite'
                }}></span>
              </h1>
              <p className="hero-subtitle">
                I specialize in building exceptional and accessible digital experiences. Currently focused on full-stack development and exploring the world of AI/ML.
              </p>
              <button onClick={openEmailModal} className="hero-cta" style={{
                cursor: 'pointer',
                border: 'none'
              }}>
                Get In Touch <Mail size={18} />
              </button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{
                  marginTop: '3rem',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <motion.button
                  onClick={scrollToAbout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    transition: 'color 0.3s ease'
                  }}
                  whileHover={{ color: 'var(--text-primary)' }}
                >
                  <span style={{ opacity: 0.7 }}>Scroll to explore</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '2px solid currentColor',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.7
                    }}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          </section>

          <motion.section
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">About Me</h2>
            <p>
              As a passionate and detail-oriented Computer Science student, I thrive on solving complex problems and building beautiful, high-performance web applications. My journey in technology is driven by a relentless curiosity and a desire to create software that makes a real-world impact. From competitive programming to full-stack development, I am constantly pushing the boundaries of my knowledge.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <button
                onClick={openResume}
                style={{

                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-color)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                View Resume
              </button>
              <a
                href="/Resume (8).pdf"
                download="Ridanshi_Agarwal_Resume.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border-color)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </motion.section>

          {showResume && (
            <div style={{
              position: "fixed", left: 0, top: 17, width: "100vw", height: "100vh",
              background: "rgba(3, 7, 18, 0.95)", zIndex: 9999, display: "flex",
              alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)"
            }} onClick={closeResume}>
              <div style={{
                background: "var(--bg-secondary)", borderRadius: 12, padding: 32,
                width: "90%", maxWidth: 900, maxHeight: "90vh",
                boxShadow: "0px 7px 32px 8px rgba(0,0,0,0.3)", position: "relative",
                border: "1px solid var(--border-color)"
              }} onClick={e => e.stopPropagation()}>
                <button aria-label="Close" onClick={closeResume} style={{
                  position: "absolute", top: 16, right: 16, background: "none",
                  border: "none", color: "var(--text-primary)", fontSize: "2rem",
                  cursor: "pointer", opacity: 0.75, transition: "opacity 0.3s"
                }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0.75}>&times;</button>
                <h3 style={{ marginBottom: 16, color: "var(--text-primary)" }}>Resume - Ridanshi Agarwal</h3>
                <iframe
                  src="/Resume (8).pdf"
                  style={{ width: "100%", height: "70vh", border: "1px solid var(--border-color)", borderRadius: 8 }}
                  title="Resume Preview"
                ></iframe>
                <div style={{ marginTop: 16, textAlign: "right" }}>
                  <a href="/Resume (8).pdf" download="Ridanshi_Agarwal_Resume.pdf"
                    style={{
                      background: "var(--text-accent)", color: "var(--bg-color)",
                      fontWeight: 600, padding: "0.65rem 1.5rem", borderRadius: "0.5rem",
                      border: "none", textDecoration: "none", display: "inline-flex",
                      alignItems: "center", gap: "0.5rem", cursor: "pointer",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          )}

          <motion.section
            id="skills"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">My Skillset</h2>

            <div className="skills-grid">
              <div className="skill-card">
                <Palette size={24} style={{ color: 'var(--text-accent)' }} />
                <h3>Frontend Development</h3>
                <p>
                  React, HTML5, CSS3, JavaScript. Crafting responsive and intuitive user interfaces.
                </p>
              </div>

              <div className="skill-card">
                <Server size={24} style={{ color: 'var(--text-accent)' }} />
                <h3>Backend Development</h3>
                <p>
                  Node.js, Express. Building robust and scalable server-side logic and APIs.
                </p>
              </div>

              {/* <div className="skill-card">
                <Code size={24} style={{ color: 'var(--text-accent)' }} />
                <h3>AI & Machine Learning</h3>
                <p>
                  Foundational knowledge in AI/ML concepts, exploring generative AI and deep learning models.
                </p>
              </div> */}

              <div className="skill-card">
                <Server size={24} style={{ color: 'var(--text-accent)' }} />
                <h3>Databases</h3>
                <p>
                  SQL (MySQL), MongoDB. Designing schemas, writing queries, and managing data efficiently.
                </p>
              </div>
            </div>
          </motion.section>


          <motion.section
            id="projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Featured Projects</h2>
            <div className="project-list" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div
                className="project-card"
                style={{ maxWidth: '350px', display: 'flex', flexDirection: 'column' }}
              >


                <div
                  className="project-image"
                  style={{ width: '100%', height: '180px', backgroundColor: 'var(--bg-color)', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}
                >
                  <img
                    src="/Screenshot 2026-01-02 124308.png"
                    alt="Medicine Availability Portal"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h3>MedicineFinder</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>React</span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>Node.js</span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>MongoDB</span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>Express</span>
                </div>
                <p>
                  A prototype full-stack Medicine Finder app that helps users find nearby pharmacies with specific medicines using real-time search, filters, and location-based results.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  <a
                    href="https://github.com/Ridanshi/MedicineFinder"
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} /> View Code
                  </a>

                  <a
                    href="https://medicinefinder-b2h8.onrender.com/"
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight size={16} /> Live Demo
                  </a>
                </div>
              </div>

              {/* <div className="project-card" style={{ maxWidth: '350px', display: 'flex', flexDirection: 'column' }}>
                <div
                  className="project-image"
                  style={{ width: '100%', height: '180px', backgroundColor: 'var(--bg-color)', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}
                >
                  <img
                    src="/screely-1760812875790.png"
                    alt="nightMess"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div> */}
              {/* <h3>nightMess</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>React</span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>Node.js</span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>MongoDB</span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>Express</span>
                </div> */}
              {/* <p>
                  A prototype full-stack NightMess hostel canteen ordering platform with menu browsing, prepaid wallet with auto-deductions and refunds, order tracking, and dietary filters.
                </p>
                <a
                  href="https://github.com/Ridanshi/nightMess"
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
                >
                  <Github size={16} /> View Code
                </a> */}
              {/* </div> */}
            </div>
          </motion.section>

          <motion.section
            id="certifications"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="certifications-header">
              <h2 className="section-title">Certifications & Credentials</h2>
            </div>


            <div className="certification-list">
              {certificates.map((cert, idx) => (
                <div key={idx} className="project-card" style={{ maxWidth: '350px', display: 'flex', flexDirection: 'column' }}>
                  <div
                    className="project-image"
                    style={{
                      width: '100%',
                      height: '180px',
                      backgroundColor: 'var(--bg-color)',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '0.25rem',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <img
                      src={cert.logo}
                      alt={cert.issuer + " Logo"}
                      style={{
                        maxWidth: '120px',
                        maxHeight: '120px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <h3>{cert.title}</h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    color: 'var(--text-accent)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}>
                    <span>{cert.issuer}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{cert.year}</span>
                  </div>
                  {/* Badges */}
                  <div className="cert-badges">
                    {cert.tags.map((tag, i) => (
                      <span key={i} className="cert-badge">{tag}</span>
                    ))}
                  </div>

                  {/* Description */}
                  <p>{cert.desc}</p>

                  {/* Credential ID */}
                  <div className="cert-id">
                    Credential ID: {cert.id}
                  </div>

                  {/* Actions */}
                  <div className="cert-actions">
                    <a
                      href="#"
                      className="btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        openCertificate(cert);
                      }}
                    >
                      <ArrowUpRight size={18} />
                      <span>Show Credential</span>
                    </a>

                    {cert.verifyLink && (
                      <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <LinkIcon size={18} />
                        <span>Verify Credential</span>
                      </a>
                    )}
                  </div>

                  {/* <a
                      href="#"
                      className="project-link"
                      onClick={(e) => {
                        e.preventDefault();
                        openCertificate(cert);
                      }}
                    >
                      View Certificate <ArrowUpRight size={16} />
                    </a>

                    {cert.verifyLink && (
                      <a
                        href={cert.verifyLink}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verify Credential <ArrowUpRight size={16} />
                      </a> */}
                  {/* )} */}
                </div>
              ))}
            </div>
            {openModal && activeCert && (
              <div style={{
                position: "fixed", left: 0, top: 30, width: "100vw", height: "100vh",
                background: "rgba(3, 7, 18, 0.95)", zIndex: 9999, display: "flex",
                alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)",
                padding: "1.5rem"
              }} onClick={closeModal}>
                <div style={{
                  background: "var(--bg-secondary)", borderRadius: 12, padding: "1.5rem",
                  width: "95%", maxWidth: "1000px", height: "85vh",
                  boxShadow: "0px 7px 32px 8px rgba(0,0,0,0.3)",
                  position: "relative", border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column"
                }} onClick={e => e.stopPropagation()}>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                    flexShrink: 0
                  }}>
                    <div>
                      <h3 style={{
                        color: "var(--text-primary)",
                        fontSize: "1.5rem",
                        margin: 0,
                        marginBottom: "0.25rem"
                      }}>
                        {activeCert.title}
                      </h3>
                      <p style={{
                        color: "var(--text-secondary)",
                        margin: 0,
                        fontSize: "1rem"
                      }}>
                        {activeCert.issuer} • {activeCert.year}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        background: "var(--bg-color)",
                        padding: "0.25rem",
                        borderRadius: "0.5rem",
                        border: "1px solid var(--border-color)"
                      }}>
                        <button
                          onClick={handleZoomOut}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-primary)",
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderRadius: "0.25rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-secondary)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          title="Zoom Out"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                        <span style={{
                          color: "var(--text-primary)",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          minWidth: "45px",
                          textAlign: "center"
                        }}>
                          {zoomLevel}%
                        </span>
                        <button
                          onClick={handleZoomIn}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-primary)",
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderRadius: "0.25rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-secondary)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          title="Zoom In"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                        <button
                          onClick={handleResetZoom}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderRadius: "0.25rem",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--bg-secondary)";
                            e.currentTarget.style.color = "var(--text-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--text-secondary)";
                          }}
                          title="Reset Zoom"
                        >
                          Reset
                        </button>
                      </div>

                      <button
                        aria-label="Close"
                        onClick={closeModal}
                        style={{
                          background: "transparent",
                          border: "2px solid var(--border-color)",
                          color: "var(--text-primary)",
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--text-accent)";
                          e.currentTarget.style.borderColor = "var(--text-accent)";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.borderColor = "var(--border-color)";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div style={{
                    flex: 1,
                    minHeight: 0,
                    marginBottom: "1rem",
                    overflow: "auto",
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-color)"
                  }}>
                    <div style={{
                      flex: 1,
                      minHeight: 0,
                      marginBottom: "1rem",
                      overflow: "auto",
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      background: "var(--bg-color)",
                      position: "relative"
                    }}>
                      <img
                        src={activeCert.certificatePdf}
                        alt="Certificate"
                        style={{
                          width: `${zoomLevel}%`,
                          height: "auto",
                          display: "block",
                          margin: zoomLevel <= 100 ? "auto" : "0",
                          marginTop: "50px"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{
                    textAlign: "right",
                    flexShrink: 0
                  }}>
                    <a
                      href={activeCert.certificatePdf}
                      download
                      style={{
                        background: "var(--text-accent)",
                        color: "var(--bg-color)",
                        fontWeight: 600,
                        padding: "0.75rem 1.5rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        fontSize: "1rem"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(56, 189, 248, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Download size={18} />
                      Download Certificate
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.section>

          <motion.section
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Let's Connect</h2>
            <p>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out.
            </p>
            <button onClick={openEmailModal} className="hero-cta" style={{
              fontSize: '1.25rem',
              padding: '1rem 2rem',
              cursor: 'pointer',
              border: 'none'
            }}>
              Say Hello <Mail size={22} />
            </button>
            <div className="social-links">
              <a href="https://github.com/Ridanshi" target="_blank" rel="noopener noreferrer"><Github size={28} /></a>
              <a href="https://www.linkedin.com/in/ridanshi-agarwal-74203928b/" target="_blank" rel="noopener noreferrer"><Linkedin size={28} /></a>
            </div>
          </motion.section>
        </main>
      </div>

      <footer className="footer">
        <p>© 2025 Ridanshi Agarwal. All rights reserved.</p>
      </footer>

      {showEmailModal && (
        <div style={{
          position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
          background: "rgba(3, 7, 18, 0.95)", zIndex: 9999, display: "flex",
          alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)"
        }} onClick={closeEmailModal}>
          <div style={{
            background: "var(--bg-secondary)", borderRadius: 16, padding: 40,
            width: "90%", maxWidth: 500,
            boxShadow: "0px 10px 40px rgba(0,0,0,0.5)", position: "relative",
            border: "1px solid var(--border-color)"
          }} onClick={e => e.stopPropagation()}>
            <button aria-label="Close" onClick={closeEmailModal} style={{
              position: "absolute", top: 16, right: 16, background: "none",
              border: "none", color: "var(--text-primary)", fontSize: "2rem",
              cursor: "pointer", opacity: 0.75, transition: "opacity 0.3s"
            }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0.75}>&times;</button>

            <div style={{ textAlign: "center" }}>
              <Mail size={48} style={{ color: "var(--text-accent)", marginBottom: "1rem" }} />
              <h3 style={{ marginBottom: 16, color: "var(--text-primary)", fontSize: "1.5rem" }}>Get In Touch</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                Feel free to reach out via email
              </p>

              <div style={{
                background: "var(--bg-color)",
                padding: "1rem 1.5rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border-color)",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem"
              }}>
                <span style={{
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  wordBreak: "break-all"
                }}>
                  ridanshiagarwal2@gmail.com
                </span>
              </div>

              <button
                onClick={copyEmailToClipboard}
                style={{
                  background: emailCopied ? "#10b981" : "var(--text-accent)",
                  color: "var(--bg-color)",
                  fontWeight: 600,
                  padding: "0.75rem 2rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  if (!emailCopied) e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {emailCopied ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy Email Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    // </div>
  );
}