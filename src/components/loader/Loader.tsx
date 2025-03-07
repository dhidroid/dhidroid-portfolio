import React from "react";
import { InfinitySpin } from "react-loader-spinner";

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
      <InfinitySpin width="200" color="#5315FC" />
    </div>
  );
};

export default Loader;
