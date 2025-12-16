import React, { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import { Link, useNavigate } from "react-router";
import styles from './styles/Hero.module.css'
import ServiceStyle from './styles/Service.module.css'
import AboutStyle from './styles/About.module.css'
import EduStyle from './styles/WorkExp.module.css'
import BlogStyle from './styles/blog.module.css'
import { ServiceCard } from "../../components/Cards";
import CtaButton from "../../components/button/ctaButton";
import HomeBlogCard from "../../components/Cards/HomeBlogCards";
import { BlogData, ProjectData, ResumeLink, about, serviceData } from './helpers/index'
import { getCalApi } from "@calcom/embed-react";
import { AiOutlineArrowRight } from 'react-icons/ai'
import WorkExpCard from "../../components/Cards/WorkExpComp";
import { client } from "../../senity/senity";
import { generateMetaForRoute } from '../../utils/seo';
import ResumeModal from "./helpers/ResumeModel";
import FlipProfileCard from "../../components/Cards/FipCard/FlipCard";
import ProfileGeneratorModal from "../../components/Modals/ProfileGeneratorModal";
import { FiCpu } from "react-icons/fi";
import { ScrollAnimation } from "../../hooks/useScrollAnimation";
import { AnimatedTooltip } from "../../components";
import { clientData } from "../../utils/Data/HeroData";


import { useAI } from "../../context/AIContext";

const HomePage: React.FC = () => {
  const navigation = useNavigate();
  const { worker, generateText } = useAI();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [workExpData, setWorkExpData] = useState<any[]>([]);
  const [selectedWorkExp, setSelectedWorkExp] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "cssVarsPerTheme": { "light": { "cal-brand": "#5315FC" }, "dark": { "cal-brand": "#5315FC" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
    fetchWorkExperience();
  }, [])

  // Listen to worker messages for summary updates
  useEffect(() => {
    if (worker) {
      const onMessage = (e: MessageEvent) => {
        const { status, output, id } = e.data;

        // Check if this message is for a work experience summary
        if (status === 'complete' && id?.startsWith('work_summary_')) {
          setAiSummary(output);
          setIsGeneratingSummary(false);
        }
      };

      worker.addEventListener('message', onMessage);
      return () => worker.removeEventListener('message', onMessage);
    }
  }, [worker]);

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

      // Sort by date (newest first)
      const sortedData = result.sort((a: any, b: any) => {
        const dateA = new Date(a.duration?.[0]?.from || 0).getTime();
        const dateB = new Date(b.duration?.[0]?.from || 0).getTime();
        return dateB - dateA; // Descending order (newest first)
      });

      setWorkExpData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  const summarizeWorkExp = (exp: any) => {
    setSelectedWorkExp(exp);
    setIsGeneratingSummary(true);
    setAiSummary("");

    const expText = `Company: ${exp.company}\nRole: ${exp.title}\nLocation: ${exp.location}\nTags: ${exp.tags.join(', ')}`;

    // We need to pass a type or ID to know this is a work summary
    // But generateText signature is (text, context, id).
    // We can encode type in ID or just rely on state.
    // Let's modify generateText to accept a custom message object or just use postMessage directly on worker if needed.
    // Actually, let's just use generateText and listen for the ID.

    if (worker) {
      worker.postMessage({
        type: 'generate',
        text: `Summarize this work experience in 2-3 sentences:\n\n${expText}`,
        context: '',
        id: `work_summary_${exp.company}`, // Custom ID
        // We can add a custom property to the message if we update the worker type definition, 
        // but for now let's rely on the ID or just the fact that we are waiting for a summary.
      });
      // Hack: The worker echoes back 'type' and 'id' if we send them? 
      // Our worker update in step 268 echoes 'id' and 'type' (which is 'generate').
      // It doesn't echo custom fields.
      // So we should rely on ID.
    }
  };


  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const encoded = "KzkxOTE1MDUwNzUzOA=="; // Base64 for +919150507538
    window.location.href = `tel:${atob(encoded)}`;
  };

  return (
    <React.Fragment>
      {/* Use generated site meta for home */}
      <SEO
        title={generateMetaForRoute('/').title}
        description={generateMetaForRoute('/').description}
        keywords={generateMetaForRoute('/').keywords}
        route='/'
        url='/'
        structuredData={generateMetaForRoute('/').structuredData}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        resumeUrl={ResumeLink}
      />

      {/* AI Profile Generator Modal */}
      <ProfileGeneratorModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        workExperience={workExpData}
      />

      {/* Hero Section */}
      <div className={styles.container}>
        <div className={styles.backgroundGlow} />

        <div className={styles.heroContentContainer}>
          <div>
            <h1>
              Your Vision, Our <span>
                Expertise
                <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
              <br />
              Let's Build Together
            </h1>
            <p className={styles.heroSubtitle}>
              Turn your idea into a thriving <strong>Digital project</strong>. <br className="hidden md:block" />
              With hands-on support in <span>strategy, design, and development</span>, <br className="hidden md:block" />
              we'll craft a platform that ensures your launch is nothing short of remarkable.
            </p>
          </div>

          <div className="flex flex-row items-center justify-center mb-8 md:mb-12 mt-8 md:mt-12 w-full px-4">
            <AnimatedTooltip items={clientData} />
          </div>

          {/* cta button */}
          <ScrollAnimation animation="animate-fade-in-up z-50" delay={400}>
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
          </ScrollAnimation>
        </div>
      </div>

      {/*  services session */}
      <div className={ServiceStyle.serviceContainer}>
        {/* title */}
        <div
          className={ServiceStyle.serviceinnerContainer}
        >
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <h1>The <span>Stack I Bring ⚡️</span></h1>
          </div>
        </div>

        {/* card */}
        <div className={ServiceStyle.serviceCardContainer}>
          {serviceData.map((data, index) => (
            <div
              key={`service-${index}`}
            >
              <ServiceCard Icon={data.icon} title={data.title} description={data.des} />
            </div>
          ))}
        </div>
      </div>

      {/* about me session */}
      <div className={`${AboutStyle.aboutContainer} px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-12 md:pb-20 flex flex-col lg:flex-row flex-wrap justify-center gap-6 lg:gap-0`}>
        {/* left */}
        <div
          className="w-full lg:w-[40%] lg:mr-5 h-auto flex justify-center items-center"
        >
          <FlipProfileCard />
        </div>

        {/* right */}
        <div
          className={`${AboutStyle.right} w-full lg:w-[55%]`}
        >
          <div className="relative text-center pb-12 md:pb-20">
            {/* Background large text */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-gray-300 opacity-20 whitespace-nowrap select-none pointer-events-none">
              About Me
            </span>

            {/* Foreground content */}
            <h1 className="relative z-20 text-left text-2xl sm:text-3xl md:text-4xl font-bold font-secondary transition-transform duration-300 ease-in-out px-2">
              Who is{" "}
              <span className="text-primary hover:underline">
                DhineshKumar<br />Thirupathi ?
              </span>
            </h1>
          </div>

          <div className="px-2">
            {about.split("\n").map((line, index) => (
              <p className="text-justify text-base md:text-lg mb-2" key={index}>{line}</p>
            ))}
          </div>

          {/* button */}
          <div className="flex flex-row flex-wrap mt-6 md:mt-10 px-2 gap-4">
            <CtaButton title="View My Resume 😊" onPress={() => setIsResumeModalOpen(true)} />
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className={AboutStyle.aiButton}
            >
              <FiCpu size={20} /> Ask AI About Me
            </button>
          </div>
        </div>
      </div>

      {/* education & work */}
      <div className={`${EduStyle.Educontainer} pb-12 md:pb-20`}>
        {/* title */}
        <div
          className={EduStyle.title}
        >
          <h1>
            My <span>Work Experience</span>
          </h1>
        </div>

        {/* horizontal scroll container */}
        <div
          className="flex px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 gap-6 md:gap-10 overflow-x-auto overflow-y-hidden py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full"
        >
          {workExpData.map((data, index) => (
            <div key={`work-exp-${index}`} className="shrink-0">
              <WorkExpCard
                data={data}
                onSummarize={summarizeWorkExp}
                aiSummary={selectedWorkExp?.company === data.company ? aiSummary : ""}
                isGenerating={selectedWorkExp?.company === data.company && isGeneratingSummary}
                progress={null}
              />
            </div>
          ))}
        </div>
      </div>

      {/* my latest projects */}
      <div className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-[#050505] to-[#0a0a0f]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-secondary text-white mb-2">
              Discover My <span className="text-[#5315FC]">Digital Solutions</span>
            </h2>
            <div className="w-20 h-1 bg-[#5315FC] mt-4"></div>
          </div>
          <div className="mt-6 md:mt-0">
            <CtaButton title="View All Projects" onPress={() => navigation('/project')} />
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {ProjectData?.map((data, index) => (
            <div
              key={`project-${index}`}
              className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 hover:border-[#5315FC]/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(83,21,252,0.2)]"
            >
              {/* Number Badge */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#5315FC] to-[#7B47FF] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">0{index + 1}</span>
              </div>

              <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                {/* Content */}
                <div className="flex-1 pt-4">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-secondary group-hover:text-[#A99DFF] transition-colors duration-300">
                    {data.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {data.catagrees?.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/20 hover:bg-[#5315FC]/30 hover:border-[#5315FC]/50 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                    {data.des}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => window.open(data.link)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5315FC] hover:bg-[#7B47FF] text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(83,21,252,0.4)] hover:scale-105 group/btn"
                  >
                    <span>Learn More</span>
                    <AiOutlineArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" size={18} />
                  </button>
                </div>

                {/* Image */}
                <div className="lg:w-[400px] flex-shrink-0">
                  <div className="relative rounded-2xl overflow-hidden aspect-video">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start a Conversation - Screenshot Design */}
      <div className="relative w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24">
        {/* Title */}
        <div className="relative text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-secondary text-white mb-4">
            Start a <span className="text-[#5315FC]">Conversation</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's build something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quick Contact Card */}
          <div className="bg-[#0A0A0F] border border-white/5 rounded-3xl p-8 hover:border-[#5315FC]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(83,21,252,0.1)] group">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Contact</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Email */}
              <button
                onClick={() => window.open("mailto:dhinesh4668@outlook.com")}
                className="h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-[#5315FC] hover:border-[#5315FC] transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </button>
              {/* WhatsApp */}
              <button
                onClick={() => window.open("https://wa.me/919150507538")}
                className="h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
              </button>
              {/* Calendar */}
              <button
                data-cal-namespace="30min"
                data-cal-link="dhidroid/30min"
                data-cal-config='{"layout":"month_view"}'
                onClick={(e) => {
                  e.preventDefault();
                  const cal = getCalApi({ "namespace": "30min" });
                  cal.then(api => api("ui", { "styles": { "branding": { "brandColor": "#5315FC" } }, "hideEventTypeDetails": false, "layout": "month_view" }));
                }}
                className="h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-[#5315FC] hover:border-[#5315FC] transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
              </button>
            </div>
            {/* Phone */}
            <button
              onClick={() => window.open("tel:+919150507538")}
              className="w-1/3 h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-[#5315FC] hover:border-[#5315FC] transition-all duration-300 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </button>
          </div>

          {/* Connect on Social Card */}
          <div className="bg-[#0A0A0F] border border-white/5 rounded-3xl p-8 hover:border-[#5315FC]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(83,21,252,0.1)] group">
            <h3 className="text-xl font-semibold text-white mb-6">Connect on Social</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* LinkedIn */}
              <button
                onClick={() => window.open("https://www.linkedin.com/in/dhidroid-rndev")}
                className="h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </button>
              {/* Instagram */}
              <button
                onClick={() => window.open("https://instagram.com/dhidroid")}
                className="h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </button>
              {/* GitHub */}
              <button
                onClick={() => window.open("https://github.com/dhidroid")}
                className="h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-[#333] hover:border-[#333] transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </button>
            </div>
            {/* X (Twitter) */}
            <button
              onClick={() => window.open("https://x.com/@dhidroid")}
              className="w-1/3 h-16 rounded-2xl bg-[#141420] border border-white/5 flex items-center justify-center text-white hover:bg-black hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* blogs */}
      <div className={BlogStyle.container}>
        <div>
          {/* title */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-secondary text-white mb-2">
                My <span className="text-[#5315FC]">Blog Posts</span>
              </h1>
              <p className="text-gray-400 text-lg">Latest thoughts and insights</p>
            </div>
            <div className="mt-4 md:mt-0">
              <CtaButton title="View All Blogs" onPress={() => navigation('/bloglist')} />
            </div>
          </div>

          {/* Horizontal Scroll Blog Posts */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-8 scrollbar-thin scrollbar-thumb-[#5315FC]/50 scrollbar-track-transparent">
              {BlogData?.map((data, index) => (
                <HomeBlogCard
                  key={`blog-${index}`}
                  BlogImage={data.blogImage}
                  BlogTitle={data.blogTitle}
                  Category={data.categoree}
                  author="DhineshKumar"
                  date={new Date()}
                  onPress={() => window.open(`${data.link}`)}
                  onSummarize={() => {
                    setAiSummary("");
                    setIsGeneratingSummary(true);
                    // Scroll to work experience section or show a modal? 
                    // For now, let's reuse the existing summary display or just log it.
                    // Actually, we should probably show a toast or a modal.
                    // Let's use the ChatBot to display the summary!
                    generateText(
                      `Summarize this blog post titled "${data.blogTitle}" in 2 sentences.`,
                      `Blog Title: ${data.blogTitle}\nCategory: ${data.categoree}\nLink: ${data.link}`,
                      `blog_summary_${index}`
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  );
};

export default HomePage;