import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import './PageTransition.scss';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, isVisible }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;
    
    const tl = gsap.timeline();
    
    if (isVisible) {
      // Sayfa giriş animasyonu
      tl.set(overlayRef.current, { scaleX: 0, transformOrigin: "left center" })
        .set(containerRef.current, { opacity: 0, y: 30 })
        .to(overlayRef.current, { 
          scaleX: 1, 
          duration: 0.6, 
          ease: "power2.inOut" 
        })
        .to(containerRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out" 
        }, "-=0.3")
        .to(overlayRef.current, { 
          scaleX: 0, 
          transformOrigin: "right center",
          duration: 0.6, 
          ease: "power2.inOut" 
        }, "-=0.4");
    }
    
    return () => {
      tl.kill();
    };
  }, [isVisible]);
  
  return (
    <div className="page-transition-wrapper">
      <div 
        ref={overlayRef}
        className="page-transition-overlay"
      />
      <div 
        ref={containerRef}
        className="page-transition-content"
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition; 