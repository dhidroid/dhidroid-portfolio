import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Link } from "react-router";
import HeroTerminal from "./HeroTerminal";
import { SectionWrapper } from "../layout/SectionWrapper";
import { fadeInUp, staggerContainer, textReveal } from "../../utils/motion";

import { Modal } from "../ui/Modal";


import { Document, Page, pdfjs } from 'react-pdf';
import ResumePDF from "../../assets/Dhineshkumar_thirupathi.pdf";

// Styles for react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
    // Simple obfuscation to prevent basic scrapers
    const user = "dhinesh4668";
    const domain = "outlook.com";
    const email = `${user}@${domain}`;
    const subject = encodeURIComponent("Project Inquiry: Hiring Request");
    const body = encodeURIComponent("Hi Dhinesh,\n\nI'm interested in hiring you for a project.\n\n[Please describe your project here]\n\nBest regards,");

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <SectionWrapper className="min-h-screen flex items-center pt-32 pb-12 lg:pt-48 relative">

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="w-full grid lg:grid-cols-12 gap-8 items-center relative z-20"
      >
        {/* Left Content: The "Hook" - Spans 8 cols */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Badge / Pill */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-600">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for new projects
            </span>
          </motion.div>

          {/* Massive Typography */}
          <div className="relative z-10 font-display uppercase leading-[0.85] tracking-tighter">
            <div className="overflow-hidden">
              <motion.h1
                variants={textReveal}
                className="text-[14vw] lg:text-[10rem] font-bold text-foreground block"
              >
                CREATIVE
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={textReveal}
                className="text-[14vw] lg:text-[10rem] font-light italic text-foreground block ml-[5vw] lg:ml-24"
              >
                DEVELOPER
              </motion.h1>
            </div>
          </div>

          <motion.p
            variants={fadeInUp}
            className="mt-8 text-lg md:text-xl text-gray-500 max-w-xl font-body leading-relaxed ml-2"
          >
            Crafting digital experiences that blend high-end aesthetics with robust engineering.
            Based in India, working globally.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-12 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 border border-border/60 divide-y md:divide-y-0 md:divide-x divide-border/60 bg-card shadow-lg">

              {/* 1. My Works */}
              <Link
                to="/works"
                className="group relative p-8 flex flex-row items-center gap-4 hover:bg-muted/5 transition-colors duration-500 text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-muted/10 text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors mb-1">
                    My Works
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    Explore my portfolio
                  </p>
                </div>
              </Link>

              {/* 2. Hire Me */}
              <button
                onClick={handleHireMe}
                className="group relative p-8 flex flex-row items-center gap-4 hover:bg-muted/5 transition-colors duration-500 text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-muted/10 text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors mb-1">
                    Hire Me
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    Start a project together
                  </p>
                </div>
              </button>

              {/* 3. View Resume */}
              <button
                onClick={() => setIsResumeOpen(true)}
                className="group relative p-8 flex flex-row items-center gap-4 hover:bg-muted/5 transition-colors duration-500 text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-muted/10 text-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors mb-1">
                    View Resume
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    See my qualifications
                  </p>
                </div>
              </button>

            </div>
          </motion.div>
        </div>

        {/* Right Content: Visual / Asymmetry - Spans 4 cols */}
        <div className="lg:col-span-4 relative h-full min-h-[400px] lg:min-h-[600px] hidden lg:block">
          <motion.div
            variants={fadeInUp}
            className="absolute top-1/2 -translate-y-1/2 right-0 w-full"
          >
            {/* Realtime AI Flow Terminal */}
            <div className="transform rotate-2 hover:rotate-0 transition-all duration-700 hover:scale-105">
              <HeroTerminal />
            </div>
          </motion.div>
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
            {/* Render the first page, scalable */}
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
