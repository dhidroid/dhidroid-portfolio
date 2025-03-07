import React from "react";
import { Helmet } from 'react-helmet'
import { AiOutlineArrowRight } from "react-icons/ai";
import { RxPlus } from "react-icons/rx";
import { data, Link } from "react-router";
import styles from './styles/Hero.module.css'
import ServiceStyle from './styles/Service.module.css'
import { SiMaterialdesignicons } from "react-icons/si";
import { MdDeveloperMode } from "react-icons/md";
import { FaFirefoxBrowser } from "react-icons/fa6";
import { ServiceCard } from "../../components/Cards";
import { BsArrowRight } from "react-icons/bs";
const HomePage: React.FC = () => {

  const serviceData = [
    {
      icon: SiMaterialdesignicons,
      title: "UI/UX Design",
      des: "Crafting user-friendly and visually appealing designs for web and mobile apps."
    },
    {
      icon: MdDeveloperMode,
      title: "Cross Platform App Dev",
      des: "Building high-performance apps that run seamlessly on Android and iOS."
    },
    {
      icon: FaFirefoxBrowser,
      title: "Web Development",
      des: "Developing responsive and dynamic websites with modern technologies."
    }
  ];

  const clients = [
    "https://avatar.iran.liara.run/public/boy?username=Ash",
    "https://avatar.iran.liara.run/public/girl?username=Jane",
    "https://avatar.iran.liara.run/public/boy?username=Reena",
  ]

  return (
    <div>
      <Helmet>
        <title>Dhidroid - home</title>
      </Helmet>

      {/* hero page */}
      <div className={styles.container}>
        {/* hero page  */}
        <div>
          {/* top title container */}
          <div className={styles.heroContentContainer}>
            <div>
              <h1>i'm <span>DhineshKumar ,</span> Web  <br /> Mobile App Developer</h1>
              <center>
                <p>ReactNative | <span>TypeScript</span> | GoLang </p>
              </center>
            </div>
          </div>
          {/* clients */}
          <div className={styles.clientsContainer}>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>2 +</div>
            <div style={{ fontSize: "14px", color: "#555" }}>Happy Clients</div>
            <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
              {clients.map((src, index) => (
                <div key={index} className={styles.clientImageContainer} style={{ marginLeft: index === 0 ? "0px" : "-20px" }}>
                  <img src={src} className={styles.clientImage} alt="client" style={{}} />
                </div>
              ))}
              <div className={styles.plusIcon}>
                <RxPlus />
              </div>
            </div>
          </div>

          {/* cta button */}
          <div className={styles.ctaButtonContainer}>
            <div className={styles.portfolioButtonContainer}>
              <Link
                to={"#"}
                className={styles.portfolioButton}>
                Portfolio
                <span>
                  <AiOutlineArrowRight color="black" size={20} />
                </span>
              </Link>

              <Link
                to={"#"}
                className={styles.hiremeButton}>
                Hire Me
              </Link>
            </div>
          </div>

          {/* carocils */}
        </div>
      </div>

      {/*  services session */}
      <div className={ServiceStyle.serviceContainer}>
        {/* title */}
        <div className={ServiceStyle.serviceinnerContainer}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <h1>My <span>Services</span></h1>
            <a>
              <div style={{ backgroundColor: "#5315FC", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "100px" }}>
                <BsArrowRight color="white" />
              </div>
              View All Service
            </a>
          </div>

        </div>

        {/* card */}
        <div className={ServiceStyle.serviceCardContainer}>
          {serviceData.map((data, index) => (
            <ServiceCard Icon={data.icon} title={data.title} description={data.des} />
          ))}

        </div>
      </div>


      {/* about me session */}
      <div></div>

      {/* education & work */}

      {/* my latest project */}


      {/* freelacing plans */}

      {/* contact */}


      {/* testomonieal */}


      {/* blogs */}


      {/* quots card */}
    </div>);
};

export default HomePage;
