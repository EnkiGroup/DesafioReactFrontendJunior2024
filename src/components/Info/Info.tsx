import React from "react";
import styles from "./Info.module.css";

export const Info = () => (
  <footer className={styles.info}>
    <p className={styles.infoText}>Double-click to edit a todo</p>
    <p className={styles.infoText}>
      Created by{" "}
      <a href="https://github.com/pedrovs3" className={styles.infoLink}>
        Pedro Silva
      </a>
    </p>
    <p className={styles.infoText}>
      Part of{" "}
      <a href="http://todomvc.com" className={styles.infoLink}>
        TodoMVC
      </a>
    </p>
  </footer>
);
