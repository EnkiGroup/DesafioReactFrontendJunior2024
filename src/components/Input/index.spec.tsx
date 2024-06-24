import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../utils/renderWithTheme";
import Input from ".";

const mockHandleSubmit = jest.fn();
const mockHandleClickIcon = jest.fn();
const mockSetValue = jest.fn();

describe("Input component", () => {
  it("Should render component", () => {
    renderWithTheme(
      <Input
        placeholder="input element"
        value="input"
        setValue={mockSetValue}
        handleSubmit={mockHandleSubmit}
        handleClickIcon={mockHandleClickIcon}
      />,
    );

    const inputElemnt = screen.getByRole("textbox");

    expect(inputElemnt).toBeInTheDocument();
  });

  it("Should render placeholder", () => {
    renderWithTheme(
      <Input
        placeholder="input element"
        value="input"
        setValue={mockSetValue}
        handleSubmit={mockHandleSubmit}
        handleClickIcon={mockHandleClickIcon}
      />,
    );

    const placeholder = screen.getByPlaceholderText("input element");

    expect(placeholder).toBeInTheDocument();
  });

  it("Should update the input value when the user types", () => {
    renderWithTheme(
      <Input
        placeholder="input element"
        value="input"
        setValue={mockSetValue}
        handleSubmit={mockHandleSubmit}
        handleClickIcon={mockHandleClickIcon}
      />,
    );

    const placeholder = screen.getByPlaceholderText("input element");

    fireEvent.change(placeholder, { target: { value: "novo valor" } });

    expect(mockSetValue).toHaveBeenCalled();
  });

  it("Should render icon when enabledIcon is true", () => {
    renderWithTheme(
      <Input
        placeholder="input element"
        value="input"
        setValue={mockSetValue}
        handleSubmit={mockHandleSubmit}
        handleClickIcon={mockHandleClickIcon}
        enabledIcon={true}
      />,
    );

    const icon = screen.getByRole("chevronDownSolid");

    expect(icon).toBeInTheDocument();
  });

  it("Should not render icon when enabledIcon is false", () => {
    renderWithTheme(
      <Input
        placeholder="input element"
        value="input"
        setValue={mockSetValue}
        handleSubmit={mockHandleSubmit}
        handleClickIcon={mockHandleClickIcon}
        enabledIcon={false}
      />,
    );

    const icon = screen.queryByRole("chevronDownSolid");

    expect(icon).not.toBeInTheDocument();
  });

  it("Should call mockHandleClickIcon when svg was clicked", () => {
    renderWithTheme(
      <Input
        placeholder="input element"
        value="input"
        setValue={mockSetValue}
        handleSubmit={mockHandleSubmit}
        handleClickIcon={mockHandleClickIcon}
        enabledIcon={true}
      />,
    );

    const icon = screen.getByRole("chevronDownSolid");

    fireEvent.click(icon);

    expect(mockHandleClickIcon).toHaveBeenCalled();
  });

  it("Should call mockHandleSubmit", () => {
    renderWithTheme(
      <Input
        placeholder="input element"
        value="input"
        setValue={mockSetValue}
        handleSubmit={mockHandleSubmit}
        handleClickIcon={mockHandleClickIcon} 
        enabledIcon={true}
      />,
    );

    const formElement = screen.getByRole("form");

    fireEvent.submit(formElement);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
