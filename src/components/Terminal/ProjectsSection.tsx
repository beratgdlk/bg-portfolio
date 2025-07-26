import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    id: '001',
    title: 'AI-Powered Dashboard',
    category: 'Web Application',
    description: 'Real-time analytics dashboard with machine learning insights and interactive data visualization.',
    year: '2024',
    tech: ['React', 'D3.js', 'Python', 'TensorFlow']
  },
  {
    id: '002', 
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Modern e-commerce solution with payment integration, inventory management, and admin panel.',
    year: '2024',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis']
  },
  {
    id: '003',
    title: 'Mobile Finance App',
    category: 'React Native',
    description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
    year: '2023',
    tech: ['React Native', 'Node.js', 'MongoDB', 'JWT']
  }
];

const ProjectsSection: React.FC = () => {
  const projectsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!projectsRef.current) return;

    const projectCards = projectsRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(projectCards,
      { 
        opacity: 0, 
        rotationY: -90, 
        z: -200,
        scale: 0.5
      },
      {
        opacity: 1,
        rotationY: 0,
        z: 0,
        scale: 1,
        duration: 1.5,
        stagger: {
          amount: 1,
          from: "random",
          ease: "power3.out"
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 70%"
        }
      }
    );
    
    // Parallax effect for project numbers
    projectCards.forEach((card) => {
      const projectNumber = card.querySelector('.project-number');
      if (projectNumber) {
        gsap.to(projectNumber, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === projectsRef.current || 
            projectsRef.current?.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="projects-section" ref={projectsRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-number">002</span>
          <h2>Featured Projects</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <div className="project-card" key={project.id}>
              <div className="project-number">{project.id}</div>
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-year">{project.year}</span>
                </div>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 