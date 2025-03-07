import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Header.module.css";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  let lastScrollY = 0;
  const navigation = useNavigate()
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


  const Links = [{
    title: "Home",
    link: '/'
  }, {
    title: "Service",
    link: "/service"
  }, {
    title: "About",
    link: "/about"
  }, {
    title: "Project",
    link: "/project"
  }]
  return (
    <nav
      className={`${styles.nav} ${hidden ? styles.hidden : ""} ${scrolling ? styles.scrolled : ""
        }`}
    >
      {/* Logo */}
      <div onClick={() => navigation("/")} className={styles.logo}>Dhidroid</div>

      {/* Navigation Links */}
      <ul className={styles.navLinks}>
        {Links.map((data, index) => (
          <li key={index} className={styles.navItem}>
            <Link to={data.link} className={styles.link}>
              {data.title}
            </Link>
          </li>
        ))}

      </ul>

      {/* CTA Button */}
      <a href="tel:" className={styles.cta}>
        Contact
      </a>
    </nav>
  );
};

export default Header;
