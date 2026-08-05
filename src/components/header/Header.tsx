import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { Container } from "../ui/Container";
import { LinkPreview } from "../ui/LinkPreview";
import DhiDroidLogo from '../../assets/logo.svg';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
    { title: "Blog", href: "/bloglist" },
    { title: "Authors", href: "/blog/authors" },
    { title: "Contact", href: "/contact" },
    { title: "Pricing", href: "/pricing" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent py-3.5 "
          : "bg-transparent py-5"
      }`}
    >
      <Container className="max-w-[1800px] px-6">
        <div className="flex items-center justify-between">
          {!isScrolled && 
          //  LEFT: Consensys Style Logo & Monospace Badge 
          <div className="flex items-center gap-4">
            <LinkPreview href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-sm overflow-hidden border border-border bg-slate-100 dark:bg-zinc-900 flex items-center justify-center p-1 group-hover:border-[#5235F6] transition-colors">
                <img
                  src={DhiDroidLogo}
                  alt="DhiDroid Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold font-display text-xl tracking-tight text-foreground uppercase group-hover:text-[#5235F6] transition-colors">
                  Dhidroid
                </span>
              </div>
            </LinkPreview>
          </div>
          }
          

          {/* CENTER: Consensys Minimalist Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-200/50 dark:bg-zinc-900/60 p-1.5 rounded-sm border border-border backdrop-blur-md">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.title}
                  to={link.href}
                  className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 rounded-sm ${
                    active
                      ? "bg-[#5235F6] text-white font-bold shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-foreground hover:bg-slate-300/40 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Consensys Action Buttons & Status Badge */}
          <div className="hidden md:flex items-center gap-3">


            {/* LinkedIn Link */}
            <a
              href="https://linkedin.com/in/dhidroid-rndev/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm border border-border bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
              title="Follow on LinkedIn"
            >
              <FaLinkedin size={15} />
            </a>

            {/* Consensys Pill CTA */}
            <Link
              to="/schedule"
              className="group flex items-center gap-2.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-mono text-xs uppercase font-bold tracking-wider rounded-sm hover:bg-[#5235F6] dark:hover:bg-[#5235F6] dark:hover:text-white transition-colors duration-300 shadow-sm"
            >
              <span>Hire Me / Book Call</span>
              <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-[#5235F6] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FAF8F5] dark:bg-[#0C0C0E] border-b border-border p-6 lg:hidden shadow-2xl animate-fade-in-down">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className={`text-sm font-mono uppercase tracking-wider py-2.5 px-4 rounded-sm border transition-colors ${
                  isActive(link.href)
                    ? "bg-[#5235F6] text-white font-bold border-[#5235F6]"
                    : "border-border text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
              <a
                href="https://linkedin.com/in/dhidroid-rndev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white px-4 py-3 rounded-sm font-mono text-xs uppercase font-bold tracking-wider"
              >
                <FaLinkedin size={16} />
                <span>Follow on LinkedIn</span>
              </a>

              <Link
                to="/schedule"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-4 py-3 rounded-sm font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#5235F6] transition-colors"
              >
                <span>Hire Me / Book Call</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
