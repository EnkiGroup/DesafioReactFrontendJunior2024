import { Input } from "../Input";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <h1>todos</h1>
      <Input placeholder="What needs to be done?" />
    </HeaderContainer>
  );
}
