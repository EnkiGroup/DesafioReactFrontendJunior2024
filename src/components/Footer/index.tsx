import FooterConteiner from "./styled";

const Footer = () => {
  return (
    <FooterConteiner>
      <p>Double-click to edit a todo</p>
      <p>
        Template by{" "}
        <a
          href="https://github.com/EnkiGroup/DesafioReactFrontendJunior2024"
          target="_blank"
        >
          EnkiGroup
        </a>
      </p>
      <p>Created by</p>
      <a
        href="https://github.com/matheusleite01"
        target="_blank"
        rel="noreferrer"
      >
        @Matheus Leite ❤️
      </a>
    </FooterConteiner>
  );
};

export default Footer;
