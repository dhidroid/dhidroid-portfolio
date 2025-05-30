import React, { Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Footer, Header } from "../components";
import Lottie from "lottie-react";
import { LoaderAnimation } from "../assets";

// Lazy load the HomePage component
const HomeScreen = React.lazy(() => import("../pages/HeroPage/index"));
const BlogPage = React.lazy(() => import("../pages/BlogPage/index"));
const UndertheDev = React.lazy(() => import("../components/404Page/UndertheDev"));
const Projects = React.lazy(() => import("../pages/Projects"));
const BlogList = React.lazy(() => import("../pages/BlogPage/BlogList"));
const Loader = React.lazy(() => import("../components/loader/Loader"));
const PageNotFound = React.lazy(() => import("../components/404Page/PageNotFound"));
const AboutPage = React.lazy(() => import("../pages/AboutPage"));

// Enhanced Loader with minimum display time
function EnhancedLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Set minimum loader display time (adjust as needed)
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // 2 seconds minimum loading time

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return null;
}

function BlogCreate() {
  const [isRedirecting, setIsRedirecting] = useState(true);

  React.useEffect(() => {
    // Add delay before redirect to show loader longer
    const timer = setTimeout(() => {
      window.location.href = "https://dhidroid.sanity.studio/";
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <center>
      <Lottie animationData={LoaderAnimation} loop={true} />
      <p style={{ marginTop: '20px', color: '#666' }}>
        Redirecting to blog creation...
      </p>
    </center>
  );
}

export function Router() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Global initial loading delay
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<EnhancedLoader />}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/createblog" element={<BlogCreate />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={
            <Suspense fallback={<Loader />}>
              <UndertheDev />
            </Suspense>
          } />
        </Routes>
        <Footer />
      </div>
    </Suspense>
  );
}