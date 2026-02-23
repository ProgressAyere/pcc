import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/transparent-logo.png';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const isProjectPage = location.pathname === '/project';

  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';
    setActiveLink(path.charAt(0).toUpperCase() + path.slice(1));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Project', path: '/project' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md py-4'
            : 'bg-transparent backdrop-blur-sm py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="PCC Logo" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setActiveLink(link.name)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-black' : isProjectPage ? 'text-black' : 'text-white'
                } group`}
              >
                {link.name}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                    activeLink === link.name ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <button className="hidden md:block bg-[#D4AF37] text-[#111111] px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-[#111111] hover:text-[#D4AF37]">
            Get Quote
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-[70] relative"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="flex flex-col space-y-1.5">
                <span className="block w-6 h-0.5 bg-[#D4AF37]"></span>
                <span className="block w-6 h-0.5 bg-[#D4AF37]"></span>
                <span className="block w-6 h-0.5 bg-[#D4AF37]"></span>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-[60]"
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-2xl transform transition-transform duration-300 md:hidden z-[65] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 z-[70]"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col space-y-8 pt-24 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => {
                setActiveLink(link.name);
                setMobileMenuOpen(false);
              }}
              className={`text-white text-lg font-medium transition-colors duration-300 ${
                activeLink === link.name ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-[#D4AF37] text-[#111111] px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white">
            Get Quote
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
