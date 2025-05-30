
import { FaXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";
import { FaInstagram, FaLinkedin, } from "react-icons/fa";
import { SiPeerlist } from "react-icons/si";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { FaSquareGithub } from "react-icons/fa6";

const Footer = () => {

  const SocialIcon = [
    {name: FaSquareGithub, link: "https://github.com/dhidroid"},
    {name: FaInstagram, link: "https://instagram.com/dhidroid"},
    {name: FaLinkedin, link: "https://www.linkedin.com/in/dhineshkumar-thirupathi-🌐-00aa8b1a5"},
    {name: FaXTwitter, link: "https://x.com/@dhidroid"},
    {name: SiPeerlist, link: "https://peerlist.io/dhidroid"},
  ]

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "cssVarsPerTheme": { "light": { "cal-brand": "#5315FC" }, "dark": { "cal-brand": "#5315FC" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section - Contact Info */}
        <div className={styles.contactSection}>
          <p onClick={() => window.open("mailto:dhinesh4668@outlook.com")} style={{cursor: "pointer"}}  className={styles.email}>dhinesh4668@outlook.com</p>
          <p onClick={() => window.open("tel:+919150507538")} style={{cursor: "pointer"}}  className={styles.phone}>+91 9150507538</p>
          <p className={styles.copyright}>© Copyright {new Date().getFullYear()}.</p>
        </div>

        {/* Middle Section - CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.heading}>Got a project? Want to collaborate?</h2>
          <button
          onClick={(e) => {
            e.preventDefault()
          }}
          data-cal-namespace="30min"
          data-cal-link="dhidroid/30min"
          data-cal-config='{"layout":"month_view"}'
          className={styles.ctaButton}>Discuss your project</button>
        </div>

        {/* Right Section - Locations */}
        <div className={styles.locationsSection}>
          <div className={styles.socialIcons}>
            {SocialIcon.map((data, index) => (
              <data.name size={30} className={styles.icon} onClick={() => window.open(data.link)} key={index} />
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.bigText}>
        LET'S WORK TOGETHER
      </div>
    </footer>
  );
};

export default Footer;