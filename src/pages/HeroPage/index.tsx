"use strict"
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router";
import styles from './styles/Hero.module.css'
import ServiceStyle from './styles/Service.module.css'
import SkillsStyle from './styles/Skills.module.css'
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


// Function to convert OneDrive share link to embed link
const convertToEmbedUrl = (url: string): string => {
  // If it's a OneDrive link, convert it to embed format
  if (url.includes('onedrive.live.com')) {
    // Replace 'view.aspx' with 'embed.aspx'
    if (url.includes('view.aspx')) {
      return url.replace('view.aspx', 'embed.aspx');
    }
    // If already has resid and authkey, convert to embed
    if (url.includes('resid=') || url.includes('authkey=')) {
      const baseUrl = url.split('?')[0];
      const params = new URLSearchParams(url.split('?')[1]);
      return `https://onedrive.live.com/embed?${params.toString()}`;
    }
  }
  
  // For 1drv.ms shortened links - these need to be opened in new window
  if (url.includes('1drv.ms')) {
    return url;
  }
  
  // If it's a Google Drive link
  if (url.includes('drive.google.com')) {
    const fileId = url.match(/[-\w]{25,}/);
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId[0]}/preview`;
    }
  }
  
  // For direct PDF links, return as is
  return url;
};

// Resume Modal Component
const ResumeModal: React.FC<{ isOpen: boolean; onClose: () => void; resumeUrl: string }> = ({ isOpen, onClose, resumeUrl }) => {
  const [embedUrl, setEmbedUrl] = useState('');
  const [canEmbed, setCanEmbed] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const convertedUrl = convertToEmbedUrl(resumeUrl);
      setEmbedUrl(convertedUrl);
      
      // Check if it's a shortened link that can't be embedded
      if (resumeUrl.includes('1drv.ms')) {
        setCanEmbed(false);
      }
    }
  }, [isOpen, resumeUrl]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
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
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 20px',
          backgroundColor: '#5315FC',
          color: 'white'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            Resume - DhineshKumar Thirupathi
          </h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => window.open(resumeUrl, '_blank')}
              style={{
                backgroundColor: 'white',
                color: '#5315FC',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              Open in New Tab
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div style={{ 
          flex: 1, 
          position: 'relative', 
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {canEmbed ? (
            <>
              <iframe
                src={embedUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundColor: 'white'
                }}
                title="Resume PDF Viewer"
                allow="autoplay"
              />
              
              {/* Loading/Fallback message */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                maxWidth: '400px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #5315FC',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#333',
                  marginBottom: '15px',
                  fontWeight: '500'
                }}>
                  Loading Resume...
                </p>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  If the resume doesn't load within a few seconds,<br />
                  please click "Open in New Tab" button above.
                </p>
              </div>
            </>
          ) : (
            // Message for shortened links that can't be embedded
            <div style={{
              textAlign: 'center',
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              maxWidth: '500px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>📄</div>
              <h3 style={{
                color: '#5315FC',
                marginBottom: '15px',
                fontSize: '20px'
              }}>
                Resume Ready to View
              </h3>
              <p style={{ 
                fontSize: '15px', 
                color: '#666',
                marginBottom: '25px',
                lineHeight: '1.6'
              }}>
                This resume is hosted on OneDrive. Please click the button below to view it in a new tab.
              </p>
              <button
                onClick={() => window.open(resumeUrl, '_blank')}
                style={{
                  backgroundColor: '#5315FC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 30px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#4012d4';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#5315FC';
                }}
              >
                View Resume →
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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
                Turn your idea into a thriving <bold>Digital project</bold>. <br /> With hands-on support in <span>strategy, design, and development </span>, <br /> we'll craft a platform that ensures your launch is nothing short of remarkable.
              </p>
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

      {/* skills  */}

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