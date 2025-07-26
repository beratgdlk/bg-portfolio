import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    id: '001',
    year: '2024',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovation Co.',
    description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
    tech: ['React', 'TypeScript', 'AWS', 'Docker']
  },
  {
    id: '002', 
    year: '2023',
    title: 'Frontend Developer',
    company: 'Digital Solutions Ltd.',
    description: 'Developed responsive web interfaces and improved user experience with modern JavaScript frameworks.',
    tech: ['Vue.js', 'SASS', 'WebGL', 'GSAP']
  },
  {
    id: '003',
    year: '2022',
    title: 'Junior Developer',
    company: 'StartUp Inc.',
    description: 'Built interactive websites and learned modern development practices in an agile environment.',
    tech: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap']
  }
];

const ExperienceSection: React.FC = () => {
  const experienceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!experienceRef.current) return;

    const timelineItems = experienceRef.current.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%"
        }
      });
      
      // Timeline number bounce effect
      const timelineNumber = item.querySelector('.timeline-number');
      tl.fromTo(timelineNumber,
        { scale: 0, rotation: -180 },
        { 
          scale: 1, 
          rotation: 0, 
          duration: 0.8, 
          ease: "back.out(2)" 
        }
      );
      
      // Content slide + typewriter effect
      const timelineContent = item.querySelector('.timeline-content');
      tl.fromTo(timelineContent,
        { 
          opacity: 0, 
          x: -150, 
          rotationX: -90,
          transformPerspective: 1000
        },
        { 
          opacity: 1, 
          x: 0, 
          rotationX: 0,
          duration: 1, 
          ease: "power3.out" 
        }, "-=0.4");
      
      // Tech badges cascade
      const techBadges = item.querySelectorAll('.tech-badge');
      tl.fromTo(techBadges,
        { opacity: 0, scale: 0, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.5");
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === experienceRef.current || 
            experienceRef.current?.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="experience-section" ref={experienceRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-number">003</span>
          <h2>Experience</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="timeline">
          {experienceData.map((exp, index) => (
            <div className="timeline-item" key={exp.id}>
              <div className="timeline-number">{exp.id}</div>
              <div className="timeline-content">
                <div className="timeline-year">{exp.year}</div>
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.description}</p>
                <div className="timeline-tech">
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
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

export default ExperienceSection; 