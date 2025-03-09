import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../components/loader/Loader";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";
import PageNotFound from "../components/404Page/PageNotFound";
import { BlogPage } from "../pages";

// Lazy load the HomePage component
const HomeScreen = React.lazy(() => import("../pages/HeroPage/index"));


function BlogCreate() {
  React.useEffect(() => {
    window.location.href = "https://dhidroid.sanity.studio/"
  })

  return (
    <center>
      <Loader />
    </center>
  )
}
export const Router = () => {

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="*" element={<Suspense fallback={<Loader />}><PageNotFound /></Suspense>} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/createblog" element={<BlogCreate />} />
        </Routes>
        <Footer />
      </div>
    </Suspense>
  );
};
