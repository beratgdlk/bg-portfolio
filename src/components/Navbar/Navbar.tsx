import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Logo refs
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLButtonElement>(null);

  // Modern GSAP logo animasyonları
  useEffect(() => {
    if (!logoRef.current) return;

    // Mobil kontrol
    const isMobile = window.innerWidth <= 768;

    // Sürekli subtle breathing animasyonu
    gsap.to(logoRef.current, {
      scale: isMobile ? 1.02 : 1.05,
      duration: isMobile ? 4 : 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Sürekli soft glow animasyonu
    gsap.to(logoRef.current, {
      filter: isMobile
        ? "drop-shadow(0 0 8px rgba(192, 169, 62, 0.4))"
        : "drop-shadow(0 0 12px rgba(192, 169, 62, 0.6))",
      duration: isMobile ? 5 : 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Window resize listener
    const handleResize = () => {
      gsap.killTweensOf(logoRef.current);

      const newIsMobile = window.innerWidth <= 768;

      gsap.to(logoRef.current, {
        scale: newIsMobile ? 1.02 : 1.05,
        duration: newIsMobile ? 4 : 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf(logoRef.current);
    };
  }, []);

  // Modern hover animasyonları - magnetic + pulse effect
  const handleLogoMouseEnter = (e: React.MouseEvent) => {
    if (!logoRef.current || !logoContainerRef.current) return;

    const isMobile = window.innerWidth <= 768;

    // Mobilde daha basit animasyon
    if (isMobile) {
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 0.4,
        ease: "back.out(1.7)",
        filter: "drop-shadow(0 0 16px rgba(192, 169, 62, 0.8)) brightness(1.1)"
      });
      return;
    }

    // Desktop'ta magnetic + pulse efekti
    const rect = logoContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = (mouseX - centerX) * 0.15;
    const deltaY = (mouseY - centerY) * 0.15;

    const tl = gsap.timeline();

    // Magnetic pull effect
    tl.to(logoRef.current, {
      x: deltaX,
      y: deltaY,
      scale: 1.15,
      duration: 0.6,
      ease: "power2.out"
    })
    // Pulse glow effect
    .to(logoRef.current, {
      filter: "drop-shadow(0 0 20px rgba(192, 169, 62, 1)) drop-shadow(0 0 30px rgba(77, 91, 206, 0.4)) brightness(1.2)",
      duration: 0.3,
      ease: "power2.out"
    }, 0)
    // Container aura effect
    .to(logoContainerRef.current, {
      background: "radial-gradient(circle at 50% 50%, rgba(192, 169, 62, 0.1) 0%, transparent 70%)",
      duration: 0.4,
      ease: "power2.out"
    }, 0);

    // Particle effect simulation with pseudo elements
    gsap.fromTo(logoContainerRef.current, {
      boxShadow: "0 0 0 0 rgba(192, 169, 62, 0.4)"
    }, {
      boxShadow: "0 0 0 20px rgba(192, 169, 62, 0)",
      duration: 1,
      ease: "power2.out"
    });
  };

  // Mouse move için magnetic tracking
  const handleLogoMouseMove = (e: React.MouseEvent) => {
    if (!logoRef.current || !logoContainerRef.current) return;
    if (window.innerWidth <= 768) return; // Mobilde skip

    const rect = logoContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = (mouseX - centerX) * 0.15;
    const deltaY = (mouseY - centerY) * 0.15;

    // Smooth magnetic follow
    gsap.to(logoRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLogoMouseLeave = () => {
    if (!logoRef.current || !logoContainerRef.current) return;

    const tl = gsap.timeline();

    // Return to center with elastic bounce
    tl.to(logoRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.6)"
    })
    // Fade glow
    .to(logoRef.current, {
      filter: "drop-shadow(0 0 12px rgba(192, 169, 62, 0.6))",
      duration: 0.6,
      ease: "power2.out"
    }, 0)
    // Clear container effects
    .to(logoContainerRef.current, {
      background: "transparent",
      boxShadow: "none",
      duration: 0.6,
      ease: "power2.out"
    }, 0);
  };

  // Tıklama animasyonu - wave ripple effect
  const handleLogoClick = () => {
    if (!logoRef.current || !logoContainerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline();

    // Mobilde basit ripple
    if (isMobile) {
      tl.to(logoRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.in"
      })
      .to(logoRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      })
      // Simple ripple effect
      .fromTo(logoContainerRef.current, {
        boxShadow: "0 0 0 0 rgba(192, 169, 62, 0.6)"
      }, {
        boxShadow: "0 0 0 30px rgba(192, 169, 62, 0)",
        duration: 0.8,
        ease: "power2.out"
      }, 0);
    } else {
      // Desktop'ta full wave effect
      tl.to(logoRef.current, {
        scale: 0.85,
        duration: 0.1,
        ease: "power2.in"
      })
      .to(logoRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
      .to(logoRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)"
      })
      // Multi-layer ripple waves
      .fromTo(logoContainerRef.current, {
        boxShadow: "0 0 0 0 rgba(192, 169, 62, 0.6), 0 0 0 0 rgba(77, 91, 206, 0.4)"
      }, {
        boxShadow: "0 0 0 40px rgba(192, 169, 62, 0), 0 0 0 60px rgba(77, 91, 206, 0)",
        duration: 1.2,
        ease: "power2.out"
      }, 0);
    }

    // Navigation
    navigate('/');
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClickOld = () => {
    navigate('/');
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Skip Navigation Link - Accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={(e) => e.target.style.transform = 'translateY(0)'}
        onBlur={(e) => e.target.style.transform = 'translateY(-100%)'}
      >
        Ana içeriğe geç
      </a>

      <nav className="navbar" role="navigation" aria-label="Ana navigasyon">
        <div className="navbar__content">
          {/* Logo - Keyboard Accessible */}
          <button
            className="navbar__logo" 
            ref={logoContainerRef}
            onMouseEnter={handleLogoMouseEnter}
            onMouseMove={handleLogoMouseMove} 
            onMouseLeave={handleLogoMouseLeave}
            onClick={handleLogoClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLogoClick();
              }
            }}
            aria-label="Ana sayfaya git - Berat Gudelek Portfolio"
            type="button"
          >
            <img 
              src="/assets/images/bg-logo.png" 
              alt="Berat Gudelek - Portfolio Logo" 
              ref={logoRef}
            />
          </button>

          {/* Navigation Menu */}
          <div 
            className={`navbar__menu ${isMenuOpen ? 'active' : ''}`}
            role="menu"
            aria-hidden={!isMenuOpen}
            aria-labelledby="menu-button"
          >
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
              aria-label="Ana sayfa"
            >
              _hello
            </Link>
            <Link 
              to="/_about-me" 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
              aria-label="Hakkımda sayfası"
            >
              _about-me
            </Link>
            <Link 
              to="/_projects" 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
              aria-label="Projeler sayfası"
            >
              _projects
            </Link>
            <Link 
              to="/_contact-me" 
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
              aria-label="İletişim sayfası"
            >
              _contact-me
            </Link>
          </div>

          {/* Hamburger Menu Button - Accessible */}
          <button 
            className="navbar__hamburger" 
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
            aria-expanded={isMenuOpen}
            aria-controls="navbar-menu"
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            id="menu-button"
            type="button"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span className="sr-only">
              {isMenuOpen ? "Menüyü kapat" : "Navigasyon menüsünü aç"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;