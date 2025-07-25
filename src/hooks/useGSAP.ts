import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

// Sayfa yükleme animasyonu (güvenli versiyon)
export const usePageLoad = (ref: React.RefObject<HTMLElement>, delay: number = 0) => {
  useEffect(() => {
    if (!ref.current) return;
    
    // Element'i önce görünür yap
    gsap.set(ref.current, { opacity: 1 });
    
    // Sonra animasyon yap
    gsap.fromTo(ref.current, 
      { 
        y: 20,
        scale: 0.98 
      },
      { 
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: delay,
        ease: "power2.out"
      }
    );
    
    return () => {
      gsap.killTweensOf(ref.current);
    };
  }, [delay]);
};

// Basit yazma makinesi animasyonu
export const useTypewriter = (
  ref: React.RefObject<HTMLElement>, 
  texts: string[], 
  speed: number = 100
) => {
  useEffect(() => {
    if (!ref.current || texts.length === 0) return;
    
    const element = ref.current;
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeText = () => {
      const currentText = texts[currentIndex];
      
      if (!isDeleting) {
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
          setTimeout(() => { isDeleting = true; }, 2000);
        }
      } else {
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % texts.length;
        }
      }
      
      setTimeout(typeText, isDeleting ? speed / 2 : speed);
    };
    
    typeText();
    
    return () => {
      // Cleanup
    };
  }, [texts, speed]);
};

// Scroll-triggered animasyon (IntersectionObserver ile)
export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  animation: any
) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(element,
              { 
                opacity: 0, 
                y: 50,
                ...animation.from 
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                ...animation.to
              }
            );
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [animation]);
};

// Stagger animasyonu (çoklu elementler için)
export const useStaggerAnimation = (
  selector: string,
  container?: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = container?.current 
        ? container.current.querySelectorAll(selector)
        : document.querySelectorAll(selector);
      
      if (elements.length === 0) return;
      
      gsap.fromTo(elements,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [selector]);
};

// Hover animasyonu
export const useHoverAnimation = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        rotation: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, []);
};

// Floating animasyonu
export const useFloatingAnimation = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    
    gsap.to(ref.current, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
    
    return () => {
      gsap.killTweensOf(ref.current);
    };
  }, []);
};

// Sayfa geçiş animasyonu
export const usePageTransition = () => {
  const transitionRef = useRef<HTMLDivElement>(null);
  
  const startTransition = (callback: () => void) => {
    if (!transitionRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(transitionRef.current,
      { x: "-100%" },
      { x: "0%", duration: 0.5, ease: "power2.inOut" }
    )
    .call(callback)
    .to(transitionRef.current,
      { x: "100%", duration: 0.5, ease: "power2.inOut" }
    );
  };
  
  return { transitionRef, startTransition };
}; 