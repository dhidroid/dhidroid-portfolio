import Lottie from "lottie-react";
import React from "react";
// import { InfinitySpin } from "react-loader-spinner";
import { LoaderAnimation } from "../../assets";

const Loader = (): React.JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <InfinitySpin width="200" color="#5315FC" /> */}
      <center>
      {/* <Loader /> */}
      <div style={{      
      }}>
      <Lottie animationData={LoaderAnimation}  style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        padding: 40,
        backgroundColor: "white",
        borderRadius: 100
      }} loop={true}/>
</div>
    </center>
    </div>
  );
};

export default Loader;
