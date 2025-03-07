import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../components/loader/Loader";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";
import PageNotFound from "../components/404Page/PageNotFound";

// Lazy load the HomePage component
const HomeScreen = React.lazy(() => import("../pages/HeroPage/index"));

export const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen />
            }
          />
          <Route path="*" element={
            <Suspense fallback={<Loader />}>
              <PageNotFound />
            </Suspense>
          } />
        </Routes>
        <Footer />
      </div>
    </Suspense>
  );
};
