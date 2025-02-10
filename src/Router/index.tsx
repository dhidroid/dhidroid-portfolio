import { A, Route, Router } from "@solidjs/router";
import { Component, createSignal, lazy, onCleanup, onMount, Suspense } from "solid-js";
import { BallTriangle, SpinnerType } from "solid-spinner";
import { socialLinks } from "../utils/data/navData.js";
import { BsLinkedin as LinkedIn } from "solid-icons/bs";
import { TbBrandGithubCopilot as Github } from "solid-icons/tb";
import { ImStackoverflow as StackOverFlow } from "solid-icons/im";
import { SiBuymeacoffee as BuyMeCoffee } from "solid-icons/si";
import NavStyle from "./Nav.module.scss";
import { FiMenu, FiX } from "solid-icons/fi";

// Lazy loading pages
const Home = lazy(() => import("../Pages/Home/HomePage"));
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));

const Footer = () => {
  const socialIcons: any = {
    linkedin: LinkedIn,
    github: Github,
    stackoverflow: StackOverFlow,
    buymeacoffee: BuyMeCoffee,
  };

  return (
    <footer
      style={{
        display: "flex",
        "justify-content": "space-between",
        "align-items": "center",
        padding: "16px 32px",
        "font-size": "14px",
        "margin-top": "auto",
      }}
    >
      <span>© {new Date().getFullYear()} dhidroid. All rights reserved.</span>
      <div style={{ display: "flex", gap: "15px" }}>
        {Object.entries(socialLinks).map(([key, url]) => {
          const Icon = socialIcons[key];
          return url ? (
            <A
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "black",
              }}
            >
              <Icon size={24} />
            </A>
          ) : null;
        })}
      </div>
    </footer>
  );
};

const Nav = (props: any) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <>
      <nav class={`${NavStyle.navbar} ${scrolled() ? NavStyle.blur : ""}`}>
        <A href="/" class={NavStyle.logo}>
          dhidroid
        </A>

        {/* Mobile Menu Button */}
        <button class={NavStyle.menubtn} onClick={() => setIsOpen(!isOpen())}>
          {isOpen() ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Desktop & Mobile Navigation */}
        <div class={`${NavStyle.navLinks} ${isOpen() ? NavStyle.active : ""}`}>
          <A href="/project" onClick={() => setIsOpen(false)}>Project</A>
          <A href="/blog" onClick={() => setIsOpen(false)}>Blog</A>
          <A href="/about" onClick={() => setIsOpen(false)}>About</A>
        </div>
      </nav>
      {props.children}
      <Footer />
    </>
  );
};

const RouterPage: Component = () => {
  return (
    // <Suspense
    //   fallback={
    //     <div
    //         style={{
    //         display: "flex",
    //         "align-items": "center",
    //         "justify-content": "center",
    //         height: "100vh",
    //         width: "100vw",
    //       }}
    //     >
    //       <BallTriangle type={SpinnerType.puff} color="#5F28FD" />
    //     </div>
    //   }
    // >
      <Router root={Nav}>
        <Route path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Router>
    // </Suspense>
  );
};

export default RouterPage;
