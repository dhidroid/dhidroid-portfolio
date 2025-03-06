import React from "react";
import styles from "./Footer.module.css";
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaChrome,
  FaAndroid,
} from "react-icons/fa";
import {
  IoIosMail,
  IoIosCall,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section - Contact Info */}
        <div className={styles.contact}>
          <div className={styles.logo}>Dk Portfolio</div>
          <p>
            <IoIosMail /> hello@dkportfolio.com
          </p>
          <p>
            <IoIosCall /> +91 98765 43210
          </p>
        </div>

        {/* Right Section - CTA */}
        <div className={styles.ctaSection}>
          <h3>Get started with my services now</h3>
          <div className={styles.buttons}>
            <button className={styles.tryBtn}>Hire Me</button>
            <button className={styles.watchDemo}>View Projects</button>
          </div>
        </div>
      </div>

      {/* Platform Availability */}
      <div className={styles.platforms}>
        <p>
          <IoMdCheckmarkCircleOutline /> Available on all platforms
        </p>
        <div className={styles.icons}>
          <FaWindows /> <FaApple /> <FaLinux /> <FaChrome /> <FaAndroid />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
