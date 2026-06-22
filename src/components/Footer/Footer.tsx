import { Link } from "react-router";
import { Container } from "../ui/Container";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import DhiDroidLogo from '../../assets/logo.svg';
import { IconContainer } from "../ui/IconContainer";
import { Newsletter } from "../ui/Newsletter";
import { LinkPreview } from "../ui/LinkPreview";
import { D3FooterAnimation } from "./D3FooterAnimation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/dhidroid", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/dhidroid-rndev", label: "LinkedIn" },
    { icon: FaMedium, href: "https://medium.com/@dhidroid", label: "Medium" },
  ];

  return (
    <footer className="bg-background border-t border-border mt-auto font-sans">
      <Newsletter />
      
      {/* Interactive D3 Generative Visual */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 mt-12">
        <D3FooterAnimation />
      </div>

      <div className="pt-16 pb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 select-none">
            <div className="md:col-span-1">
              <LinkPreview href="/" className="flex items-center gap-3 font-bold text-xl tracking-tighter mb-6 uppercase text-slate-900 dark:text-white font-display">
                <img
                  src={DhiDroidLogo}
                  alt="DhiDroid Logo"
                  className="h-8 w-8 rounded-sm object-cover"
                />
                <span>Dhidroid</span>
              </LinkPreview>
              <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed mb-10 max-w-[240px] font-sans">
                Senior software engineer specializing in high-fidelity digital experiences and modern web architecture.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <LinkPreview
                    key={social.label}
                    href={social.href}
                    className="group"
                  >
                    <IconContainer size="sm" variant="outline" className="border-border text-slate-700 dark:text-zinc-300 rounded-sm">
                      <social.icon />
                    </IconContainer>
                  </LinkPreview>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs text-slate-400 dark:text-zinc-500 tracking-wider uppercase mb-6">[ PAGES ]</h4>
              <ul className="space-y-4">
                <li>
                  <LinkPreview href="/" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Home</LinkPreview>
                </li>
                <li>
                  <LinkPreview href="/about" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">About</LinkPreview>
                </li>
                <li>
                  <LinkPreview href="/services" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Services</LinkPreview>
                </li>
                <li>
                  <LinkPreview href="/works" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Projects</LinkPreview>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-slate-400 dark:text-zinc-500 tracking-wider uppercase mb-6">[ MY STUDIO ]</h4>
              <ul className="space-y-4">
                <li>
                  <LinkPreview href="/contact" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Contact</LinkPreview>
                </li>
                <li>
                  <LinkPreview href="/bloglist" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Blog</LinkPreview>
                </li>
                <li>
                  <LinkPreview href="/schedule" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Schedule Demo</LinkPreview>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-slate-400 dark:text-zinc-500 tracking-wider uppercase mb-6">[ RESOURCES ]</h4>
              <ul className="space-y-4">
                <li>
                  <LinkPreview href="/style-guide" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Style Guide</LinkPreview>
                </li>
                <li>
                  <LinkPreview href="/licenses" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Licenses</LinkPreview>
                </li>
                <li>
                  <LinkPreview href="/changelog" className="text-slate-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors text-sm">Changelog</LinkPreview>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-zinc-400 font-mono">
            <p>&copy; {currentYear} Dhidroid. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <LinkPreview href="/privacy" className="hover:text-primary">Privacy Policy</LinkPreview>
              <LinkPreview href="/terms" className="hover:text-primary">Terms of Service</LinkPreview>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
