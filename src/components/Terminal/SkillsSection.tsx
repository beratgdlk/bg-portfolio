import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Mock data for skills
const skillsData = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Language' },
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'GSAP', level: 85, category: 'Animation' },
  { name: 'PostgreSQL', level: 82, category: 'Database' },
  { name: 'Next.js', level: 87, category: 'Framework' }
];

const SkillsSection: React.FC = () => {
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!skillsRef.current) return;

    const skillItems = skillsRef.current.querySelectorAll('.skill-item');
    const skillBars = skillsRef.current.querySelectorAll('.skill-bar');
    
    // Wave entrance animasyonu
    gsap.fromTo(skillItems, 
      { 
        opacity: 0, 
        y: 100, 
        rotationY: -45,
        scale: 0.8 
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start",
          ease: "power2.out"
        },
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 75%"
        }
      }
    );
    
    // Skill bars liquid fill effect
    skillBars.forEach((bar, index) => {
      const percentage = skillsData[index]?.level || 0;
      
      // Liquid wave effect
      gsap.timeline({
        scrollTrigger: {
          trigger: bar,
          start: "top 85%"
        }
      })
      .set(bar, { width: "0%" })
      .to(bar, {
        width: `${percentage}%`,
        duration: 2,
        ease: "elastic.out(1, 0.5)"
      })
      .to(bar, {
        boxShadow: "0 0 20px rgba(77, 91, 206, 0.6)",
        duration: 0.5
      }, "-=0.5");
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === skillsRef.current || 
            skillsRef.current?.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className="skills-section" ref={skillsRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-number">001</span>
          <h2>Technical Skills</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar" data-level={skill.level}></div>
              </div>
              <span className="skill-category">{skill.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 