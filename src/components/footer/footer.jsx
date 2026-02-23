import { useState, useEffect, useRef } from 'react';
import { Instagram, Facebook, ArrowUp } from 'lucide-react';
import logo2 from '../../assets/logos/logo2.jpeg';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const currentFooter = footerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (currentFooter) observer.observe(currentFooter);

    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (currentFooter) observer.unobserve(currentFooter);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        ref={footerRef}
        className={`bg-black text-white pt-16 pb-8 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* 4-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Logo & Tagline */}
            <div>
              <img src={logo2} alt="PCC Logo" className="h-16 w-auto mb-4" />
              <p className="text-sm text-white leading-relaxed">
                Building excellence through precision, innovation, and unmatched craftsmanship.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-[#D4AF37] font-semibold mb-4 tracking-wide">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#projects" className="text-sm transition-colors duration-300 ease-in-out hover:text-[#D4AF37]">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm transition-colors duration-300 ease-in-out hover:text-[#D4AF37]">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className="text-[#D4AF37] font-semibold mb-4 tracking-wide">Services</h3>
              <ul className="space-y-3">
                {['Architectural Design', 'Construction', 'Supervision', 'Renovation', 'Consultancy'].map((service) => (
                  <li key={service}>
                    <a href="#services" className="text-sm transition-colors duration-300 ease-in-out hover:text-[#D4AF37]">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Social */}
            <div>
              <h3 className="text-[#D4AF37] font-semibold mb-4 tracking-wide">Contact</h3>
              <ul className="space-y-3 mb-6">
                <li className="text-sm">+234 818 142 3564</li>
                <li className="text-sm">mpreslyn@gmail.com</li>
                <li className="text-sm leading-relaxed">123 Construction Avenue, Lagos, Nigeria</li>
              </ul>
              <div className="flex space-x-4">
                <a href="/" className="text-[#D4AF37] transition-colors duration-300 ease-in-out hover:text-white">
                  <Instagram size={20} />
                </a>
                <a href="/" className="text-[#D4AF37] transition-colors duration-300 ease-in-out hover:text-white">
                  <Facebook size={20} />
                </a>
                <a href="/" className="text-[#D4AF37] transition-colors duration-300 ease-in-out hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M13 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Gold Divider */}
          <div className="border-t border-[#D4AF37] mb-6"></div>

          {/* Bottom Strip */}
          <div className="text-center">
            <p className="text-sm text-white">
              &copy; 2026 Pad Construction Consult and Services (PCC). All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#D4AF37] text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:text-[#D4AF37] z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Footer;
