import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <p className={styles.FooterTexto}>
        Criado por{" "}
        <a href="https://github.com/Herbertguarezi" target="blank">
          Herbert de Alencar Guarezi
        </a>
      </p>
    </div>
  );
};

export default Footer;
