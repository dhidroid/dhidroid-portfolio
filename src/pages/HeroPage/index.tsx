import React from "react";
import { Helmet } from 'react-helmet'
import { AiOutlineArrowRight } from "react-icons/ai";
import { RxPlus } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import styles from './styles/Hero.module.css'
import ServiceStyle from './styles/Service.module.css'
import AboutStyle from './styles/About.module.css'
import EduStyle from './styles/WorkExp.module.css'
import ProjectStyle from './styles/Projects.module.css'
import { SiMaterialdesignicons } from "react-icons/si";
import { MdDeveloperMode } from "react-icons/md";
import { FaFirefoxBrowser } from "react-icons/fa6";
import { ServiceCard } from "../../components/Cards";
import { BsArrowRight } from "react-icons/bs";
import CtaButton from "../../components/button/ctaButton";
import EducationCard from "../../components/Cards/EducationWorkCard";
import { SiWorkplace } from "react-icons/si";
import { FaGraduationCap } from "react-icons/fa6";
import ProjectCard from "../../components/Cards/ProjectsCard";
import Marquee from "react-fast-marquee";

const HomePage: React.FC = () => {
  const navigation = useNavigate();

  const skillsCarocils = [
    "ReactNative", "JavaScript", "TypeScript", "Git & Github", "Figma UI/UX Design", "Golang(begginer)", "Android", "Ios App Dev", "ReactJS", "Jest unitTesting", "SEO & Content Writing (Begginer)", "Trainner (Junior)"
  ]
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

  const AboutData =
    "passionate mobile app and backend developer specializing in React Native, Go, and cloud services. I have expertise in UI/UX design, Firebase, CI/CD, SEO, and content writing. Additionally, I have experience with basic native app development using Kotlin (Jetpack Compose) for Android and Swift for iOS. I love solving complex challenges and crafting seamless user experiences!";

  const clients = [
    "https://avatar.iran.liara.run/public/boy?username=Ash",
    "https://avatar.iran.liara.run/public/girl?username=Jane",
    "https://avatar.iran.liara.run/public/boy?username=Reena",
  ]


  const WorkExpData = [
    {
      type: "Work Expeience",
      icon: SiWorkplace,
      exp: [{
        title: "Natobotics",
        des: "ReactNative Developer - (android/ios)",
        duration: "2024 - Present",
        link: "https://www.natobotics.com/"
      }, {
        title: "Fiverr & upwork",
        des: "Frelancing Mobile & Web Developemnt",
        duration: "2024 - 2024",
        link: "https://www.upwork.com/freelancers/~012206f0135b314031/"
      },
      {
        title: "Algojaxon Global Soft Private Limited",
        des: "Full stack web development & Mobile App Dev",
        duration: "2023 -2023",
        link: "https://www.linkedin.com/company/algojaxon-global-soft-private-limited"
      }]
    },
    {
      type: "Education",
      icon: FaGraduationCap,
      exp: [{
        title: "RP Sarathi Insitute of Technology - Salem",
        des: "Bachelor of Technology - Information Technology",
        duration: "2020 - 2024",
        link: "https://rpsit.ac.in/"
      },
      {
        title: "Gov Higher Sec School - Dharmapuri",
        des: "Mathematics and ComputerSience",
        duration: "2017 - 2020",
        link: "https://schools.org.in/dharmapuri/33050205902/ghss-laligam.html"
      }
      ]
    }
  ]

  const ProjectData = [
    {
      title: "React Js - Landing Page",
      des: "A modern and responsive landing page built with React.js, focusing on UI/UX and performance.",
      image: "https://i.pinimg.com/736x/19/fd/ac/19fdace8c542abbfbce68a09b7d1e434.jpg",
      catagrees: ["Web Dev", "JavaScript", "UI/UX"],
      link: "https://github.com/dhidroid/"
    },
    {
      title: "React Native - Event Mobile App",
      des: "A React Native-based event app with an intuitive design for seamless user experience.",
      image: "https://i.pinimg.com/736x/5b/b5/65/5bb565e7df13daaba127eb06bbf6c9cc.jpg",
      catagrees: ["Mobile App", "React Native", "UI/UX"],
      link: "https://github.com/dhidroid/"
    },
    {
      title: "React Native Boilerplate v78.0",
      des: "A scalable React Native boilerplate with pre-configured features for rapid development.",
      image: "https://i.pinimg.com/736x/4a/b0/2e/4ab02e5da39a9d9957bb81a31a46bf14.jpg",
      catagrees: ["React Native", "JavaScript", "Mobile Dev"],
      link: "https://github.com/dhidroid/"
    }
  ];


  return (
    <React.Fragment>
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

          {/*skills carocils */}
          <Marquee gradient pauseOnClick pauseOnHover className={styles.marquee} >
            {skillsCarocils.map((data) => (
              <p>{data}</p>
            ))}
          </Marquee>
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
      <div className={AboutStyle.aboutContainer}>
        {/* left */}
        <div style={{ width: "40%", marginRight: "20px", height: "90%", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
          {/* exp card */}
          <div className={AboutStyle.card}>
            <span className={AboutStyle.name}>DHINESHKUMAR</span>
            <div className={AboutStyle.content}>
              <span className={AboutStyle.experience}>12</span>
              <span className={AboutStyle.subtitle}>Month's of Experience</span>
            </div>
          </div>
        </div>

        {/* right */}
        <div className={AboutStyle.right}>
          <div>
            <p><span>-</span> About Me</p>
            <h1>Who is <span>DhineshKumar<br /> Thirupathi ? </span></h1>
          </div>
          <p style={{ textAlign: "justify" }}>{AboutData}</p>


          {/* button */}
          <div style={{ display: "flex", flexDirection: "row", }}>
            <div>
              <CtaButton colour={"black"} title="Download CV" onPress={() => alert("downloading......")} />
            </div>
          </div>
        </div>
      </div>

      {/* education & work */}
      <div className={EduStyle.Educontainer}>
        {/* title */}
        <div className={EduStyle.title}>
          <p><span>-</span> Education & Work</p>
          <h1>My <span>Education</span> & <span>Work Experience</span></h1>
        </div>

        {/* card */}
        <div className={EduStyle.EduCard} style={{}}>
          {WorkExpData.map((data, index) => (
            <EducationCard key={index} Icon={data.icon} data={data.exp} mainTitle={data.type} />
          ))}
        </div>
      </div>

      {/* my latest project */}
      <div className={ProjectStyle.projectContainer}>
        {/* title */}
        <div className={ProjectStyle.Projecttitle}>
          <div className={ProjectStyle.innterTitleContainer}>
            <h1>My latest <span>Projects</span></h1>
            <CtaButton title="Projects" onPress={() => navigation('/projects')} />
          </div>
        </div>

        {/* data */}
        <div className={ProjectStyle.cardContainer} >
          {ProjectData?.map((data, index) => (
            <div key={index} className={ProjectStyle.card} style={{ marginBottom: "20px" }}>
              <ProjectCard link={data.link} projectDes={data.des} projectTitle={data.title} projectImage={data.image} catagrees={data.catagrees} onPress={data.onPress} />
            </div>
          ))}
        </div>
      </div>


      {/* freelacing plans */}

      {/* contact */}


      {/* testomonieal */}


      {/* blogs */}


      {/* quots card */}
    </React.Fragment >
  );
};

export default HomePage;
