"use strect"
import React, { useEffect } from "react";
// import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router";
import styles from './styles/Hero.module.css'
import ServiceStyle from './styles/Service.module.css'
import AboutStyle from './styles/About.module.css'
import EduStyle from './styles/WorkExp.module.css'
import ProjectStyle from './styles/Projects.module.css'
import ContactStyle from './styles/Contact.module.css'
import BlogStyle from './styles/blog.module.css'
import { ServiceCard } from "../../components/Cards";
import CtaButton from "../../components/button/ctaButton";
import EducationCard from "../../components/Cards/EducationWorkCard";
import ProjectCard from "../../components/Cards/ProjectsCard";
import HomeBlogCard from "../../components/Cards/HomeBlogCards";
import { AboutData, BlogData, ContactIcons, ProjectData, ResumeLink, SocialMedia, WorkExpData, serviceData } from './helpers/index'
import { getCalApi } from "@calcom/embed-react";
import MyProfileCard from '../../assets/profile card.png'
import { AnimatedTooltip } from "../../components";
import { clientData } from "../../utils/Data/HeroData";
import {AiOutlineArrowRight} from 'react-icons/ai'


const HomePage: React.FC = () => {
  const navigation = useNavigate();


  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "cssVarsPerTheme": { "light": { "cal-brand": "#5315FC" }, "dark": { "cal-brand": "#5315FC" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])


  return (
    <React.Fragment>
      {/* <Helmet>
        <title>Dhidroid - Home</title>
        <meta name="description" content="DhineshKumar Thirupathi - A skilled web and mobile app developer specializing in React Native, TypeScript, and GoLang. Explore my services, projects, and blog posts." />
        <meta name="keywords" content="React Native, TypeScript, GoLang, Web Developer, Mobile App Developer, MERN Stack, Software Engineer, DhineshKumar Thirupathi, Dhidroid" />
        <meta name="author" content="DhineshKumar Thirupathi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dhidroid - Home" />
        <meta property="og:description" content="Explore the portfolio of DhineshKumar Thirupathi, a React Native and web developer with expertise in TypeScript and GoLang." />
        <meta property="og:image"
        // content="https://yourwebsite.com/your-preview-image.jpg"
        />
        <meta property="og:url" content="https://dhidroid.vercel.app/" />
        <meta property="og:site_name" content="Dhidroid" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dhidroid - Home" />
        <meta name="twitter:description" content="Explore the portfolio of DhineshKumar Thirupathi, a React Native and web developer with expertise in TypeScript and GoLang." />
        <meta name="twitter:image"
        // content="https://yourwebsite.com/your-preview-image.jpg"
        />
        <meta name="twitter:creator" content="@dhidroid" />
        <meta name="insta:creator" content="dhidroid" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet> */}


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

          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "50px",
            width: "100%",
            marginTop: "50px"
          }}>
            <AnimatedTooltip items={clientData} />
          </div>

          {/* cta button */}
          <div className={styles.ctaButtonContainer}>
            <div className={styles.portfolioButtonContainer}>
              <Link
                to={"#"}
                onClick={(e) => {
                  // window.open("https://cal.com/dhidroid/30min?overlayCalendar=true&layout=month_view")
                  e.preventDefault()
                }}
                data-cal-namespace="30min"
                data-cal-link="dhidroid/30min"
                data-cal-config='{"layout":"month_view"}'
                className={styles.portfolioButton}>
                Book a Meeting
                <span>
                  <AiOutlineArrowRight color="black" size={20} />
                </span>
              </Link>
              <Link
                to={"#"}
                onClick={() => {
                  window.location.href = "tel:+919150507538";
                }}
                className={styles.hiremeButton}>
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  services session */}
      <div className={ServiceStyle.serviceContainer}>
        {/* title */}
        <div className={ServiceStyle.serviceinnerContainer}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <h1>The <span>Stack I Bring ⚡️</span></h1>
            {/* <a>
              <div style={{ backgroundColor: "#5315FC", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "100px" }}>
                <BsArrowRight color="white" />
              </div>
              Explore My Stack
            </a> */}
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
          <div className={AboutStyle.card}>
            <img style={{
              width: "100%",
              height: "100%",
              objectFit: "fill"
            }} src={MyProfileCard} alt="dhineshkumar-thirupathi" />
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
              <CtaButton colour={"black"} title="View My Resume :)" onPress={() => window.open(ResumeLink)} />
            </div>
          </div>
        </div>
      </div>

      {/* education & work */}
      <div className={EduStyle.Educontainer}>
        {/* title */}
        <div className={EduStyle.title}>
          <h1>My <span>Work Experience</span></h1>
        </div>

        {/* card */}
        <center style={{
          marginBottom: 50
        }}>
          <div className={EduStyle.EduCard} style={{}}>
            {WorkExpData.map((data, index) => (
              <EducationCard key={index} Icon={data.icon} data={data.exp} mainTitle={data.type} />
            ))}
          </div>
        </center>
      </div>

      {/* my latest project */}
      <div className={ProjectStyle.projectContainer}>
        {/* title */}
        <div className={ProjectStyle.Projecttitle}>
          <div className={ProjectStyle.innterTitleContainer}>
            <h1>My latest <span>Projects</span></h1>
            <CtaButton title="Projects" onPress={() => navigation('/project')} />
          </div>
        </div>

        {/* data */}
        <div className={ProjectStyle.cardContainer} >
          {ProjectData?.map((data, index) => (
            <div key={index} className={ProjectStyle.card} style={{ marginBottom: "20px" }}>
              <ProjectCard link={data.link} projectDes={data.des} projectTitle={data.title} projectImage={data.image} catagrees={data.catagrees} />
            </div>
          ))}
        </div>
      </div>

      {/* freelacing plans */}

      {/* contact */}
      <div className={ContactStyle.container}>
        {/* title */}
        <div className={ContactStyle.title}>
          <h1>
            Start a <span>Conversation</span>
          </h1>
        </div>

        {/* content */}
        <div className={ContactStyle.content}>
          <div className={ContactStyle.textBlock}>
            <h1>Let’s Build Something Great Together!</h1>
            <p>
              Are you looking to build a high-performance mobile app, enhance your
              small-scale product’s UI design, develop a website, or get reliable
              tech support? I specialize in crafting user-friendly mobile and web
              applications using React Native, MERN stack, and other cutting-edge
              technologies. Let’s discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className={ContactStyle.linksContainer}>
            <div className={ContactStyle.iconContainer}>
              {ContactIcons?.map((data, index) => (
                <div
                  className={ContactStyle.icon}
                  key={index}
                  onClick={() => window.open(`${data.link}`)}
                >
                  <data.Icon color={"white"} size={30} />
                </div>
              ))}
            </div>

            <div className={ContactStyle.socialContainer}>
              {SocialMedia?.map((data, index) => (
                <div
                  className={ContactStyle.icon}
                  key={index}
                  onClick={() => window.open(`${data.link}`)}
                >
                  <data.Icon color={"white"} size={30} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* testomonieal */}

      {/* blogs */}
      <div className={BlogStyle.container}>
        <div>
          {/* title */}
          <div className={BlogStyle.title}>
            <h1>My <br />
              <span>Blog Post</span>
            </h1>

            <div>
              <CtaButton title="View My Blogs" onPress={() => navigation('/bloglist')} />
            </div>

          </div>

          {/* blog posts */}
          <div className={BlogStyle.BlogCard} >
            {BlogData?.map((data, index) => (
              <div key={index}>
                <HomeBlogCard
                  BlogImage={data.blogImage}
                  BlogTitle={data.blogTitle}
                  Category={data.categoree}
                  author="DhineshKumar"
                  date={new Date()}
                  onPress={() => window.open(`${data.link}`)} />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* quots card */}
    </React.Fragment >
  );
};

export default HomePage;
