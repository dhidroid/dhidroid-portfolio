import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import DhiDroidLogo from '../../assets/logo.svg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Works", href: "/works" },
    { title: "Skills", href: "/skills" },
    { title: "Services", href: "/services" },
    // { title: "Pricing", href: "/pricing" },
    { title: "Blog", href: "/bloglist" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3" : "bg-transparent py-5"
        }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <img
              src={DhiDroidLogo}
              alt="DhiDroid Logo"
              className="h-8 w-8 rounded-full"
            />
            <span>Dhidroid</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.href) ? "text-primary" : "text-gray-600"
                  }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center border border-gray-300 bg-card/80 divide-x divide-gray-300 overflow-hidden">

              {/* LinkedIn Action */}
              <a
                href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=dhidroid-rndev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-2 hover:bg-muted/5 transition-colors duration-300"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-all duration-300">
                  <FaLinkedin size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold font-display text-foreground leading-none mb-0.5">LinkedIn</span>
                  <span className="text-[10px] text-muted-foreground font-medium leading-none">Follow Me</span>
                </div>
              </a>

              {/* Hire Me Action */}
              <Link
                to="/schedule"
                className="group flex items-center gap-3 px-4 py-2 hover:bg-muted/5 transition-colors duration-300"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-muted/20 text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold font-display text-foreground leading-none mb-0.5">Hire Me</span>
                  <span className="text-[10px] text-muted-foreground font-medium leading-none">Book Call</span>
                </div>
              </Link>

            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 md:hidden shadow-lg animate-fade-in-down">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className={`text-base font-medium py-2 ${isActive(link.href) ? "text-primary" : "text-gray-600"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=dhidroid-rndev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white px-4 py-3 rounded-full font-medium shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaLinkedin size={18} />
                <span>Follow on LinkedIn</span>
              </a>
              <Link to="/schedule" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-full group flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
