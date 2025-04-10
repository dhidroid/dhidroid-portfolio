import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Header.module.css";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle
import DhiDroidLogo from '../../assets/logo.svg'
const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Menu toggle state
  let lastScrollY = 0;
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = window.scrollY;

      // Blur background when scrolling
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Links = [
    { title: "Home", link: "/" },
    { title: "Blogs", link: "/bloglist" },
    { title: "Service", link: "/service" },
    { title: "About", link: "/about" },
    { title: "Project", link: "/project" },
  ];

  return (
    <nav className={`${styles.nav} ${hidden ? styles.hidden : ""} ${scrolling ? styles.scrolled : ""}`}>
      {/* Logo */}
      <div onClick={() => navigate("/")} className={styles.logo}>
        <img src={DhiDroidLogo} alt="Dhidroid Logo" style={{height: 50, width: 50, gap: "20px", marginRight: 10, borderRadius: 50}} />
        Dhidroid
        </div>

      {/* Menu Button (Mobile) */}
      <div className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={25} /> : <FiMenu size={25} />}
      </div>

      {/* Navigation Links (Desktop & Mobile) */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
        {Links.map((data, index) => (
          <li key={index} className={styles.navItem} onClick={() => setMenuOpen(false)}>
            <Link to={data.link} className={styles.link}>
              {data.title}
            </Link>
          </li>
        ))}
        {menuOpen && (
          <a href="tel:" className={`${styles.cta} ${styles.mobileOnly}`}>
            Contact
          </a>
        )}


      </ul>

      {/* CTA Button (Visible only on Desktop) */}
      <a href="tel:" className={`${styles.cta} ${styles.desktopOnly}`}>
        Contact
      </a>
    </nav>
  );
};

export default Header;
