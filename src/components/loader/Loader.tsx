import Lottie from "lottie-react";
import React from "react";
import { LoaderAnimation } from "../../assets";

const Loader = (): React.JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "min(300px, 80vw)",
          height: "min(300px, 80vw)",
          maxWidth: "400px",
          maxHeight: "400px",
          padding: "clamp(20px, 5vw, 40px)",
          backgroundColor: "white",
          borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
        }}
      >
        <Lottie
          animationData={LoaderAnimation}
          style={{
            width: "100%",
            height: "100%",
          }}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Loader;