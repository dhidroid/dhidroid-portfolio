import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ZoomIn, ZoomOut, Download, Globe } from "lucide-react";
import { Link } from "react-router";
import CredlyBadge from "../ui/CredlyBadge";
import { SectionWrapper } from "../layout/SectionWrapper";
import { fadeInUp, staggerContainer } from "../../utils/motion";
import { VoronoiStipplingAscii } from "./VoronoiStipplingAscii";

import { Modal } from "../ui/Modal";

import { Document, Page, pdfjs } from 'react-pdf';
import ResumePDF from "../../assets/Dhineshkumar_thirupathi.pdf";

// Styles for react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BADGE_DATA = [
  { id: "75ea1e14-e67a-4c03-b1c0-6c75e67c3f14", title: "Badge 1", url: "https://www.credly.com/badges/75ea1e14-e67a-4c03-b1c0-6c75e67c3f14/public_url" },
  { id: "1a762b61-e521-4e8f-8668-9554a3f51996", title: "Badge 2", url: "https://www.credly.com/badges/1a762b61-e521-4e8f-8668-9554a3f51996/public_url" }
];

// Custom Rotating Technical SVG Badge for Swiss precision visual tone
const TechCompassSVG = () => (
  <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center pointer-events-none select-none my-4">
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      className="text-slate-400 dark:text-zinc-600 opacity-50 dark:opacity-30"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.75" strokeDasharray="8 6" />
      <path d="M100 10 A90 90 0 0 1 190 100" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100 190 A90 90 0 0 1 10 100" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
    <motion.svg
      width="80%"
      height="80%"
      viewBox="0 0 200 200"
      fill="none"
      className="absolute text-slate-500 dark:text-zinc-500 opacity-70"
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" strokeDasharray="20 10" />
      <line x1="100" y1="25" x2="100" y2="175" stroke="currentColor" strokeWidth="0.5" />
      <line x1="25" y1="100" x2="175" y2="100" stroke="currentColor" strokeWidth="0.5" />
    </motion.svg>
    <div className="absolute w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
    </div>
  </div>
);

const Hero = () => {
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);
  const [pageNumber] = React.useState<number>(1);
  const [scale, setScale] = React.useState<number>(1.0);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const modalBodyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isResumeOpen && modalBodyRef.current) {
      setContainerWidth(modalBodyRef.current.clientWidth);
    }
  }, [isResumeOpen]);

  const handleHireMe = () => {
    const user = "dhinesh4668";
    const domain = "outlook.com";
    const email = `${user}@${domain}`;
    const subject = encodeURIComponent("Project Inquiry: Hiring Request");
    const body = encodeURIComponent("Hi Dhinesh,\n\nI'm interested in hiring you for a project.\n\n[Please describe your project here]\n\nBest regards,");

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <SectionWrapper className="min-h-screen flex items-center pt-28 pb-12 relative overflow-hidden bg-background">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="w-full relative z-10"
      >
        {/* The Swiss/Editorial Grid Container */}
        <div className="relative w-full border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-md overflow-hidden rounded-md transition-colors duration-500">
          
          {/* Interactive D3 Voronoi Stippling ASCII Background layer */}
          <div className="absolute inset-0 z-0 opacity-85 pointer-events-none">
            <VoronoiStipplingAscii />
          </div>

          {/* Header Row */}
          <div className="relative z-10 border-b border-slate-200 dark:border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono tracking-wider text-slate-500 dark:text-zinc-400 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>[ DHIDROID PORTFOLIO V5.0 ]</span>
            </div>
            <div className="hidden lg:block text-slate-400 dark:text-zinc-500">
              CREATIVE TECHNOLOGIST // HUMAN-CENTRIC SYSTEMS // WEB & MOBILE
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>AVAILABLE FOR NEW WORK // GEOMETRIC SWISS LABS</span>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="relative z-10 grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-zinc-800">
            
            {/* Left Sidebar Column - Spans 4 cols */}
            <div className="lg:col-span-4 flex flex-col divide-y divide-slate-200 dark:divide-zinc-800">
              
              {/* Technical Specs Box */}
              <div className="p-6 md:p-8 flex flex-col justify-between items-start gap-6 select-none bg-white/20 dark:bg-transparent">
                <div className="w-full">
                  <span className="block text-xs font-mono text-slate-400 dark:text-zinc-500 mb-4">[ INDEX INDEX ]</span>
                  <div className="space-y-2 text-sm font-mono text-slate-600 dark:text-zinc-400">
                    <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-zinc-800 pb-1">
                      <span className="text-slate-400">ROLE:</span>
                      <span className="font-bold text-slate-800 dark:text-zinc-200">FULL-STACK & MOBILE</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-zinc-800 pb-1">
                      <span className="text-slate-400">EXP:</span>
                      <span className="font-bold text-slate-800 dark:text-zinc-200">1.5+ YEARS OF EXPERTISE</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-zinc-800 pb-1">
                      <span className="text-slate-400">ZONE:</span>
                      <span className="font-bold text-slate-800 dark:text-zinc-200">IST (UTC+05:30)</span>
                    </div>
                    <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-zinc-800 pb-1">
                      <span className="text-slate-400">LOC:</span>
                      <span className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                        SALEM, IN <Globe className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rotating SVG removed for minimal clean design */}
              </div>

              {/* Verification & Credentials Box */}
              <div className="p-6 md:p-8 select-none bg-white/20 dark:bg-transparent">
                <span className="block text-xs font-mono text-slate-400 dark:text-zinc-500 mb-4">[ VERIFICATION ]</span>
                <div className="flex flex-wrap gap-4 justify-start pointer-events-auto">
                  {BADGE_DATA.map((badge) => (
                    <CredlyBadge key={badge.id} badgeId={badge.id} />
                  ))}
                </div>
              </div>

            </div>

            {/* Right Main Typography Panel - Spans 8 cols */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              {/* Typography block */}
              <div className="p-8 md:p-12 lg:p-16 flex-grow flex flex-col justify-center">
                <div className="mb-6">
                  <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-zinc-700/50">
                    01 // ART DIRECTION WEB
                  </span>
                </div>

                <div className="relative font-display select-none">
                  {/* Heavy Swiss Typography mixed with beautiful Serif Italic */}
                  <h1 className="text-[10vw] lg:text-[5.8rem] font-extrabold text-slate-900 dark:text-white leading-[0.9] tracking-tighter uppercase">
                    Engineering
                    <span className="block italic font-serif font-light text-primary tracking-normal lowercase ml-[10%] text-[9vw] lg:text-[4.8rem] my-3">
                      with refined
                    </span>
                    Aesthetics
                  </h1>
                </div>

                <p className="mt-8 text-lg md:text-xl text-slate-600 dark:text-zinc-400 font-body leading-relaxed max-w-xl">
                  Crafting personal digital systems that merge clean structural integrity with deep visual character. Specializing in high-performance React, React Native apps, and design systems.
                </p>
              </div>

            </div>

          </div>

          {/* Action Row Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-t border-slate-200 dark:border-zinc-800 divide-slate-200 dark:divide-zinc-800 bg-white/40 dark:bg-zinc-950/20">
            
            <Link
              to="/works"
              className="group flex flex-row items-center justify-between p-6 md:p-8 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all duration-300 pointer-events-auto"
            >
              <div>
                <span className="block text-xs font-mono text-slate-400 dark:text-zinc-500 mb-1">02 / INDEX</span>
                <span className="text-lg font-bold font-display text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
                  Explore Projects
                </span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 rounded-md">
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </Link>

            <button
              onClick={handleHireMe}
              className="group flex flex-row items-center justify-between p-6 md:p-8 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all duration-300 pointer-events-auto text-left w-full cursor-pointer"
            >
              <div>
                <span className="block text-xs font-mono text-slate-400 dark:text-zinc-500 mb-1">03 / INQUIRY</span>
                <span className="text-lg font-bold font-display text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
                  Start a Project
                </span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 rounded-md">
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="group flex flex-row items-center justify-between p-6 md:p-8 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all duration-300 pointer-events-auto text-left w-full cursor-pointer"
            >
              <div>
                <span className="block text-xs font-mono text-slate-400 dark:text-zinc-500 mb-1">04 / PROFILE</span>
                <span className="text-lg font-bold font-display text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors">
                  Curriculum Vitae
                </span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 rounded-md">
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </button>

          </div>

        </div>
      </motion.div>

      {/* Resume Modal */}
      <Modal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        title="My Resume"
        className="max-w-5xl h-[90vh]"
        actions={
          <div className="flex items-center gap-2 mr-2">
            <button
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-mono text-muted-foreground min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-px h-4 bg-border/60 mx-1" />
            <a
              href={ResumePDF}
              download
              className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-sm rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Download size={14} />
              <span>Download</span>
            </a>
          </div>
        }
      >
        <div ref={modalBodyRef} className="w-full h-full bg-gray-50 flex flex-col items-center overflow-auto p-4 md:p-8">
          <Document
            file={ResumePDF}
            className="shadow-2xl"
            loading={
              <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }
            error={
              <div className="text-center p-8">
                <p className="text-red-500 mb-4">Error loading PDF.</p>
                <a href={ResumePDF} download className="text-primary hover:underline font-bold">
                  Download Instead
                </a>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth > 0 ? (Math.min(containerWidth - 64, 800) * scale) : 600}
              className="mb-4"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </Modal>

    </SectionWrapper>
  );
};

export default Hero;
