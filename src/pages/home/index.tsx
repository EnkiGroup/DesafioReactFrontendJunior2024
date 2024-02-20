import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Presentation } from "../../components/Presentation";
import { Tasks } from "../../components/Tasks";
import { Container } from "./styles";

export function Home() {
  return (
    <div>
      <Container>
        <Header />
        <Tasks />
        <Footer />
      </Container>

      <Presentation />
    </div>
  );
}
