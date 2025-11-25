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
import ProjectCard from "../../components/Cards/ProjectsCard";
import HomeBlogCard from "../../components/Cards/HomeBlogCards";
import { BlogData, ContactIcons, ProjectData, ResumeLink, SocialMedia, about, serviceData } from './helpers/index'
import { getCalApi } from "@calcom/embed-react";
import { AnimatedTooltip } from "../../components";
import { clientData } from "../../utils/Data/HeroData";
import { AiOutlineArrowRight } from 'react-icons/ai'
import WorkExpCard from "../../components/Cards/WorkExpComp";
import { client } from "../../senity/senity";
import ResumeModal from "./helpers/ResumeModel";
import FlipProfileCard from "../../components/Cards/FipCard/FlipCard";


const HomePage: React.FC = () => {
  const navigation = useNavigate();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [workExpData, setWorkExpData] = useState<any[]>([]);


  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "cssVarsPerTheme": { "light": { "cal-brand": "#5315FC" }, "dark": { "cal-brand": "#5315FC" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
    fetchWorkExperience();
  }, [])

  const fetchWorkExperience = async () => {
    try {
      const query = `
        *[_type == "workExperience"]{
            company,
            posted,
            title,
            tags,
            rate,
            location,
            iconUrl,
            duration[]{
                from,
                toDate
            }
        }`;

      const result = await client.fetch(query);
      console.log(result);
      setWorkExpData(result);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <React.Fragment>
      <Helmet>
        <title>DhineshKumar Thirupathi - Web & Mobile App Developer | React Native, TypeScript, NodeJS</title>
        <meta name="description" content="DhineshKumar Thirupathi (Dhidroid) - Professional React Native and web developer specializing in TypeScript, NodeJS, and MERN Stack. Expert in building high-performance mobile and web applications." />
        <meta name="keywords" content="React Native Developer, TypeScript Developer, NodeJS Developer, Web Developer, Mobile App Developer, MERN Stack Developer, Software Engineer, DhineshKumar Thirupathi, Dhidroid, Frontend Developer, Full Stack Developer, Firebase, GCP, Azure, Android, iOS, Swift, Kotlin, Figma Designer, UI/UX Designer, Content Writer, API Development" />
        <meta name="author" content="DhineshKumar Thirupathi" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DhineshKumar Thirupathi - Web & Mobile App Developer" />
        <meta property="og:description" content="Professional React Native and web developer with expertise in TypeScript, NodeJS, and MERN Stack. Building high-performance mobile and web applications." />
        <meta property="og:image" content="https://dhidroid.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://dhidroid.vercel.app/" />
        <meta property="og:site_name" content="Dhidroid Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dhidroid" />
        <meta name="twitter:creator" content="@dhidroid" />
        <meta name="twitter:title" content="DhineshKumar Thirupathi - Web & Mobile App Developer" />
        <meta name="twitter:description" content="Professional React Native and web developer with expertise in TypeScript, NodeJS, and MERN Stack." />
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
            "description": "Professional React Native and web developer specializing in TypeScript, NodeJS, and MERN Stack",
            "knowsAbout": ["React Native", "TypeScript", "NodeJS", "MERN Stack", "Web Development", "Mobile App Development", "Firebase", "GCP", "Azure", "Android", "iOS", "Swift", "MS SQL", "Figma", "UI/UX Design", "Content Writing", "API Development"],
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
              <h1>Your Vision, Our <span>Expertise</span><br />Let's Build Together</h1>
              <p className={styles.heroSubtitle}>
                Turn your idea into a thriving <strong>Digital project</strong>. <br /> With hands-on support in <span>strategy, design, and development </span>, <br /> we'll craft a platform that ensures your launch is nothing short of remarkable.
              </p>
            </div>
          </div>

          {/* animated tooltip */}
          <div className={"flex flex-row items-center justify-center mb-12 mt-12 w-full"}>
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
                onClick={(e) => {
                  e.preventDefault();
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
      <div className={`${AboutStyle.aboutContainer} px-100 pb-20 flex flex-row *:flex-wrap justify-center`}>
        {/* left */}
        <div className="w-[40%] mr-5 h-[90%] justify-center items-center content-center">
            <FlipProfileCard  />
            {/* <img className="w-[100%] h-[100%] object-fill" src={MyProfileCard} alt="DhineshKumar Thirupathi - Web and Mobile App Developer" /> */}
        </div>

        {/* right */}
        <div className={AboutStyle.right}>
          <div className="relative text-center pb-20">
            {/* Background large text */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-gray-300 opacity-20 whitespace-nowrap select-none pointer-events-none">
              About Me
            </span>

            {/* Foreground content */}
            <h1 className="relative z-20 text-left text-3xl font-bold font-secondary transition-transform duration-300 ease-in-out">
              Who is{" "}
              <span className="text-primary hover:underline">
                DhineshKumar<br />Thirupathi ?
              </span>
            </h1>
          </div>


          {about.split("\n").map((line, index) => (
            <p className="text-justify text-[18px]" key={index}>{line}<br /></p>
          ))}
          {/* button */}
          <div className="flex flex-row mt-10" >
            <CtaButton title="View My Resume 😊" onPress={() => setIsResumeModalOpen(true)} />
          </div>
        </div>
      </div>

      {/* education & work */}
      <div className={`${EduStyle.Educontainer} pb-20`}>
        {/* title */}
        <div className={EduStyle.title}>
          <h1>
            My <span>Work Experience</span>
          </h1>
        </div>

        {/* horizontal scroll container */}
        <div className="flex px-100 gap-10 overflow-x-auto overflow-y-hidden py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent *:scrollbar-thumb-rounded-full">
          {workExpData.map((data, index) => (
            <div key={`work-exp-${index}`} className="shrink-0">
              <WorkExpCard data={data} />
            </div>
          ))}
        </div>
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