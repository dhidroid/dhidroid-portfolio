import React from "react";
import styles from "./Footer.module.css";

import {
  IoIosMail,
  IoIosCall,
} from "react-icons/io";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section - Contact Info */}
        <div className={styles.contact}>
          <div className={styles.logo}>Dhidroid</div>
          <p >
            <IoIosMail /> dhinesh4668@outlook.com
          </p>
          <p>
            <IoIosCall /> +91 91505 07530
          </p>
        </div>

        {/* Right Section - CTA */}
        <div className={styles.ctaSection}>
          <h3>Get started with my services now</h3>
          <div className={styles.buttons}>
            <button onClick={() => window.open("tel:+919150507538")} className={styles.tryBtn}>Hire Me</button>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
