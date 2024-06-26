import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../helper/renderWithTheme";
import Toast from ".";

const buttons = [<button>Sim</button>, <button>Não</button>];

describe("Toast component", () => {
  it("Should render componente", () => {
    renderWithTheme(<Toast toastButtons={buttons} />);

    const yesButton = screen.getByRole("button", { name: /sim/i });
    const noButton = screen.getByRole("button", { name: /não/i });

    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
  });

  it("Should render message when toastMessage is passed", () => {
    renderWithTheme(<Toast toastButtons={buttons} toastMessage="message" />);

    const message = screen.getByText(/message/i);
    expect(message).toBeInTheDocument();
  });

  it("Should not render message when toasMessage is not passed", () => {
    renderWithTheme(<Toast toastButtons={buttons} />);

    const message = screen.queryByText(/message/i);

    expect(message).not.toBeInTheDocument();
  });
});
