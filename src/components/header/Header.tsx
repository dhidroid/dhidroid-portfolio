import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./Header.module.css";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  let lastScrollY = 0;

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

  return (
    <nav
      className={`${styles.nav} ${hidden ? styles.hidden : ""} ${
        scrolling ? styles.scrolled : ""
      }`}
    >
      {/* Logo */}
      <div className={styles.logo}>DhiDrid</div>

      {/* Navigation Links */}
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/service" className={styles.link}>
            Service
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/portfolio" className={styles.link}>
            Portfolio
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/case-studies" className={styles.link}>
            Case Studies
          </Link>
        </li>
      </ul>

      {/* CTA Button */}
      <a href="tel:" className={styles.cta}>
        Contact Us
      </a>
    </nav>
  );
};

export default Header;
