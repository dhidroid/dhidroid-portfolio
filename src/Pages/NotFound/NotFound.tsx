import { Component } from "solid-js";
import styles from "./notFound.module.scss";
import notFoundImage from "../../assets/image/notfound.png";

const NotFound: Component = () => {
  return (
    <div class={styles.notFoundContainer}>
      <div class={styles.content}></div>
      <div class={styles.textContent}>
        <h1>[404]</h1>
        <p>PAGE NOT FOUND</p>
        <a href="/" class={styles.returnHome}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
