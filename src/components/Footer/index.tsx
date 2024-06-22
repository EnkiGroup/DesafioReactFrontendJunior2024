import FooterConteiner from "./styled";

const Footer = () => {
  return (
    <FooterConteiner>
      <p>Double-click para editar a tarefa</p>
      <p>Desenvolvido por</p>
      <a
        href="https://github.com/matheusleite01"
        target="_blank"
        rel="noreferrer"
      >
        @Matheus Leite
      </a>
    </FooterConteiner>
  );
};

export default Footer;
