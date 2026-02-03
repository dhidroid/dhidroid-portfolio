import React from "react";
import { Link } from "react-router";
import { Container } from "../ui/Container";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import DhiDroidLogo from '../../assets/logo.svg';
import { IconContainer } from "../ui/IconContainer";
import { Newsletter } from "../ui/Newsletter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/dhidroid", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/dhidroid-rndev", label: "LinkedIn" },
    { icon: FaMedium, href: "https://medium.com/@dhidroid", label: "Medium" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto font-sans">
      <Newsletter />
      <div className="pt-24 pb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-tighter mb-6 uppercase">
              <img
                src={DhiDroidLogo}
                alt="DhiDroid Logo"
                  className="h-8 w-8"
              />
              <span>Dhidroid</span>
            </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-[240px]">
                Senior software engineer specializing in high-fidelity digital experiences and modern web architecture.
            </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title={social.label}
                  >
                    <IconContainer size="sm" variant="outline">
                      <social.icon />
                    </IconContainer>
                  </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Pages</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-500 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/project" className="text-gray-500 hover:text-primary transition-colors">Projects</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">My Studio</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/bloglist" className="text-gray-500 hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-500 hover:text-primary transition-colors">Schedule Demo</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/style-guide" className="text-gray-500 hover:text-primary transition-colors">Style Guide</Link>
              </li>
              <li>
                <Link to="/licenses" className="text-gray-500 hover:text-primary transition-colors">Licenses</Link>
              </li>
              <li>
                <Link to="/changelog" className="text-gray-500 hover:text-primary transition-colors">Changelog</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Dhidroid. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
