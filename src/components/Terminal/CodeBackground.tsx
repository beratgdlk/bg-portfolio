import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface CodeBackgroundProps {
  mainRef: React.RefObject<HTMLDivElement>;
}

export interface CodeBackgroundRef {
  cleanup: () => void;
}

const CodeBackground = forwardRef<CodeBackgroundRef, CodeBackgroundProps>(
  ({ mainRef }, ref) => {
    const geometryRef = useRef<HTMLDivElement>(null);
    const codeElementsCacheRef = useRef<HTMLElement[]>([]);

    const createCodeElements = () => {
      if (!geometryRef.current) return;
      
      // Kod elementleri ve sembolleri
      const codeElements = [
        // Binary kodları
        '01001010', '11010110', '00110011', '10101111',
        // Kod sembolleri
        '{', '}', '[', ']', '(', ')', '<', '>', 
        // Terminal sembolleri
        '$', '>', '~', '#', '|', '_',
        // Kod snippet'leri
        'fn()', 'var', 'if', 'for', '==', '=>', '&&', '||',
        // Git hash benzeri
        'a7f2c3d', '9e8b1f4', 'c4d2e9a', 'b3f7d8c',
        // Hex değerler
        '0xFF', '0x00', '0xAA', '0x33'
      ];
      
      // Matrix tarzı kod yağmuru için veriler
      const matrixChars = [
        'console.log', 'function', 'return', 'async', 'await',
        'React', 'useState', 'useEffect', 'const', 'let',
        'import', 'export', 'from', 'class', 'interface'
      ];
      
      // Element sayısını azalttık: 30'dan 15'e
      for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        const isMatrix = i % 5 === 0; // Her 5'te bir matrix element
        
        if (isMatrix) {
          // Matrix tarzı kod yağmuru
          element.className = 'code-element matrix-code';
          element.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          element.style.cssText = `
            position: absolute;
            font-family: Courier New, monospace;
            font-weight: bold;
            pointer-events: none;
            user-select: none;
            z-index: 1;
            font-size: 12px;
            color: #00ff41;
            text-shadow: 0 0 5px #00ff41;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
          `;
        } else {
          // Normal kod elementleri
          element.className = `code-element element-${i % 6}`;
          element.textContent = codeElements[Math.floor(Math.random() * codeElements.length)];
          element.style.cssText = `
            position: absolute;
            font-family: Courier New, monospace;
            font-weight: bold;
            pointer-events: none;
            user-select: none;
            z-index: 1;
            font-size: 14px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
          `;
        }
        
        geometryRef.current.appendChild(element);
        codeElementsCacheRef.current.push(element);
        
        if (isMatrix) {
          // Matrix falling effect - optimize edildi
          gsap.fromTo(element, 
            { y: -100, opacity: 0 },
            {
              y: window.innerHeight + 100,
              opacity: 1,
              duration: 10 + Math.random() * 6, // Daha yavaş
              repeat: -1,
              ease: "none",
              delay: Math.random() * 8 // Daha fazla spread
            }
          );
        } else {
          // Animasyon sayısını azalttık: sadece floating
          gsap.to(element, {
            y: Math.random() * 40 - 20,
            x: Math.random() * 40 - 20,
            duration: 8 + Math.random() * 6, // Daha yavaş
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
          
          // Sadece bazı elementlere opacity animasyonu
          if (i % 3 === 0) {
            gsap.to(element, {
              opacity: 0.3 + Math.random() * 0.5,
              duration: 4 + Math.random() * 4,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut"
            });
          }
        }
      }
      
      // Digital noise sayısını azalttık: 15'ten 8'e
      for (let i = 0; i < 8; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'digital-noise';
        pixel.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: #00ff41;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          opacity: 0.3;
          pointer-events: none;
        `;
        
        geometryRef.current.appendChild(pixel);
        
        // Daha yavaş blink
        gsap.to(pixel, {
          opacity: 0,
          duration: 0.2,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3,
          ease: "none"
        });
      }
    };

    const createScrollCodeEffects = () => {
      let rafId: number;
      
      const scrollTrigger = ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // RAF ile scroll performance optimize et
          if (rafId) cancelAnimationFrame(rafId);
          
          rafId = requestAnimationFrame(() => {
            const progress = self.progress;
            
            // Cache'lenmiş elementleri kullan
            codeElementsCacheRef.current.forEach((element, index) => {
              if (!element.parentNode) return; // Element silinmişse skip
              
              const speed = (index % 3 + 1) * 0.2; // 0.3'ten 0.2'ye düşürdük
              
              if (element.classList.contains('matrix-code')) {
                // Matrix kodları için basitleştirilmiş hareket
                element.style.transform = `rotateX(${progress * 120 * speed}deg)`; // 180'den 120'ye
              } else {
                // Normal kod elementleri için basitleştirilmiş animasyon
                const scale = 0.8 + (Math.sin(progress * Math.PI * 2) * 0.1); // PI * 4'ten PI * 2'ye
                const rotation = progress * 240 * speed; // 360'dan 240'a
                element.style.transform = `rotate(${rotation}deg) scale(${scale})`;
              }
            });
          });
        },
        onLeave: () => {
          if (rafId) cancelAnimationFrame(rafId);
        }
      });
      
      return scrollTrigger;
    };

    const cleanup = () => {
      // Proper cleanup - MEMORY LEAK PREVENTİON
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf('*'); // Tüm GSAP animasyonlarını temizle
      
      // DOM cleanup
      if (geometryRef.current) {
        geometryRef.current.innerHTML = '';
      }
      codeElementsCacheRef.current.length = 0;
    };

    // useImperativeHandle ile parent component'a cleanup fonksiyonunu expose ediyoruz
    useImperativeHandle(ref, () => ({
      cleanup
    }));

    useEffect(() => {
      // Initialize all animations
      createCodeElements();
      const scrollCodeTrigger = createScrollCodeEffects();
      
      return cleanup;
    }, []);

    return <div className="code-background" ref={geometryRef}></div>;
  }
);

CodeBackground.displayName = 'CodeBackground';

export default CodeBackground; 