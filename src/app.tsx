import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Container from "./components/ui/container/Container";
import "./index.css";

export default function App() {
  return (
    <Container>
      <section className="w-[35%]">
        <Header />
        <Main />
        <Footer />
      </section>
    </Container>
  );
}
