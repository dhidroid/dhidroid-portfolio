import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader2 } from "lucide-react";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";

// Lazy load Components
const HomeScreen = React.lazy(() => import("../pages/HeroPage/index"));
const BlogPage = React.lazy(() => import("../pages/BlogPage/index"));
const BlogList = React.lazy(() => import("../pages/BlogPage/BlogList"));
const AboutPage = React.lazy(() => import("../pages/AboutPage"));
const SkillsPage = React.lazy(() => import("../pages/SkillsPage"));
const ServicesPage = React.lazy(() => import("../pages/ServicesPage"));
const PricingPage = React.lazy(() => import("../pages/PricingPage"));
const SchedulePage = React.lazy(() => import("../pages/SchedulePage"));
// const Projects = React.lazy(() => import("../pages/Projects"));
const WorksPage = React.lazy(() => import("../pages/WorksPage"));
const ProjectDetailPage = React.lazy(() => import("../pages/ProjectDetailPage"));
const PageNotFound = React.lazy(() => import("../components/404Page/PageNotFound"));
const StyleGuide = React.lazy(() => import("../pages/StyleGuide"));
const Licenses = React.lazy(() => import("../pages/Licenses"));
const Changelog = React.lazy(() => import("../pages/Changelog"));

// Helper for loading state
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
}

function BlogCreate() {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://dhidroid.sanity.studio/";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
      <p className="text-gray-500">Redirecting to CMS...</p>
    </div>
  );
}

export function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/project" element={<WorksPage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/:slug" element={<ProjectDetailPage />} />

            {/* Blog Routes */}
            <Route path="/bloglist" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/createblog" element={<BlogCreate />} />

            {/* Utility Pages */}
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="/licenses" element={<Licenses />} />
            <Route path="/changelog" element={<Changelog />} />

            {/* 404 / Fallback */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
