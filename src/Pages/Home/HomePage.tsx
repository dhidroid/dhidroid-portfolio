import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Component } from "solid-js";
import styles from './Home.module.scss';
import MySelfImage from '../../assets/image/myimage.jpg'

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
        <Meta property="og:description" content="Experienced full-stack developer specializing in React, React Native, and modern web technologies. Passionate about building scalable, high-performance applications." />
        <Meta property="og:image" content={MySelfImage} />
        <Meta property="og:url" content="https://dhidroid.web.app" />
        <Meta property="og:type" content="website" />
      </MetaProvider>
      <div class={styles.container}>
        <div class={styles.heroContainer}>
          {/* hero container */}
          {/* <img style={{
            height: '100px',
            width: "100px",
            "border-radius": '100px',
          }} src={MySelfImage} alt="my-image" /> */}

          {/* hero content */}
          <div class={styles.heroContent}>
            <h1>🚀 Crafting Scalable & Performant Apps</h1>
            <br />
            <p>Building modern <span class={styles.bold}>web & mobile</span> applications with React, <span class={styles.rotate}>React Native</span> <bold>&</bold> cutting-edge technologies.<br /> Passionate about clean code, intuitive UI, and seamless user experiences.</p>
          </div>
          {/* hero cta button */}

        </div>
      </div>
    </div>
  );
};

export default HomePage;
