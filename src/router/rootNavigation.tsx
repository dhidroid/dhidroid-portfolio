import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../components/loader/Loader";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";

// Lazy load the HomePage component
const HomeScreen = React.lazy(() => import("../pages/HeroPage/index"));

export const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <HomeScreen />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Suspense>
  );
};
