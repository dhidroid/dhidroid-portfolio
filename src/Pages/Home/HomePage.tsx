import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Component } from "solid-js";

const HomePage: Component = () => {
  return (
    <div>
      <MetaProvider>
        <Title>DhiDroi</Title>
        <Meta
          name="description"
          content="Expert in React, React Native, Node.js, Firebase, and cloud technologies. I build scalable web and mobile applications with seamless performance. Explore my portfolio and get in touch!"
        />
        <Meta
          name="keywords"
          content="Full-Stack Developer, React Developer, React Native Developer, Node.js, Firebase, Mobile App Developer, Web Developer, Scalable Applications, DhineshKumar Thirupathi Portfolio"
        />
        <Meta name="author" content="DhineshKumar Thirupathi" />
      </MetaProvider>
      <div>Home</div>
    </div>
  );
};

export default HomePage;
