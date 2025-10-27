"use strict"
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
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


// Resume Modal Component
const ResumeModal: React.FC<{ isOpen: boolean; onClose: () => void; resumeUrl: string }> = ({ isOpen, onClose, resumeUrl }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'relative',
          width: '90%',
          height: '90%',
          maxWidth: '1200px',
          backgroundColor: 'white',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#5315FC',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
        <iframe
          src={resumeUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="Resume PDF Viewer"
        />
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const navigation = useNavigate();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);


  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "cssVarsPerTheme": { "light": { "cal-brand": "#5315FC" }, "dark": { "cal-brand": "#5315FC" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])


  return (
    <React.Fragment>
      <Helmet>
        <title>DhineshKumar Thirupathi - Web & Mobile App Developer | React Native, TypeScript, GoLang</title>
        <meta name="description" content="DhineshKumar Thirupathi (Dhidroid) - Professional React Native and web developer specializing in TypeScript, GoLang, and MERN Stack. Expert in building high-performance mobile and web applications." />
        <meta name="keywords" content="React Native Developer, TypeScript Developer, GoLang Developer, Web Developer, Mobile App Developer, MERN Stack Developer, Software Engineer, DhineshKumar Thirupathi, Dhidroid, Frontend Developer, Full Stack Developer" />
        <meta name="author" content="DhineshKumar Thirupathi" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DhineshKumar Thirupathi - Web & Mobile App Developer" />
        <meta property="og:description" content="Professional React Native and web developer with expertise in TypeScript, GoLang, and MERN Stack. Building high-performance mobile and web applications." />
        <meta property="og:image" content="https://dhidroid.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://dhidroid.vercel.app/" />
        <meta property="og:site_name" content="Dhidroid Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dhidroid" />
        <meta name="twitter:creator" content="@dhidroid" />
        <meta name="twitter:title" content="DhineshKumar Thirupathi - Web & Mobile App Developer" />
        <meta name="twitter:description" content="Professional React Native and web developer with expertise in TypeScript, GoLang, and MERN Stack." />
        <meta name="twitter:image" content="https://dhidroid.vercel.app/twitter-image.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://dhidroid.vercel.app/" />
        <meta name="theme-color" content="#5315FC" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "DhineshKumar Thirupathi",
            "alternateName": "Dhidroid",
            "url": "https://dhidroid.vercel.app/",
            "jobTitle": "Web & Mobile App Developer",
            "description": "Professional React Native and web developer specializing in TypeScript, GoLang, and MERN Stack",
            "knowsAbout": ["React Native", "TypeScript", "GoLang", "MERN Stack", "Web Development", "Mobile App Development"],
            "sameAs": [
              "https://twitter.com/dhidroid",
              "https://instagram.com/dhidroid"
            ]
          })}
        </script>
      </Helmet>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
        resumeUrl={ResumeLink} 
      />

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
          </div>
        </div>

        {/* card */}
        <div className={ServiceStyle.serviceCardContainer}>
          {serviceData.map((data, index) => (
            <ServiceCard key={`service-${index}`} Icon={data.icon} title={data.title} description={data.des} />
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
            }} src={MyProfileCard} alt="DhineshKumar Thirupathi - Web and Mobile App Developer" />
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
              <CtaButton title="View My Resume 😊" onPress={() => setIsResumeModalOpen(true)} />
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
          <div className={EduStyle.EduCard}>
            {WorkExpData.map((data, index) => (
              <EducationCard key={`work-exp-${index}`} Icon={data.icon} data={data.exp} mainTitle={data.type} />
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
            <div key={`project-${index}`} className={ProjectStyle.card} style={{ marginBottom: "20px" }}>
              <ProjectCard link={data.link} projectDes={data.des} projectTitle={data.title} projectImage={data.image} catagrees={data.catagrees} />
            </div>
          ))}
        </div>
      </div>

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
            <h1>Let's Build Something Great Together!</h1>
            <p>
              Are you looking to build a high-performance mobile app, enhance your
              small-scale product's UI design, develop a website, or get reliable
              tech support? I specialize in crafting user-friendly mobile and web
              applications using React Native, MERN stack, and other cutting-edge
              technologies. Let's discuss how I can help bring your ideas to life.
            </p>
          </div>

          <div className={ContactStyle.linksContainer}>
            <div className={ContactStyle.iconContainer}>
              {ContactIcons?.map((data, index) => (
                <div
                  className={ContactStyle.icon}
                  key={`contact-${index}`}
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
                  key={`social-${index}`}
                  onClick={() => window.open(`${data.link}`)}
                >
                  <data.Icon color={"white"} size={30} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
              <div key={`blog-${index}`}>
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
    </React.Fragment >
  );
};

export default HomePage;