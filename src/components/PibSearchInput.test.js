import { render, screen, fireEvent } from "@testing-library/react";
import PibSearchInput from "./PibSearchInput";

describe("PibSearchInput", () => {
  const defaultProps = {
    isSearchSelected: false,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    value: "",
    setValue: jest.fn(),
    placeholder: "Search...",
  };

  it("renders the input with the correct placeholder", () => {
    render(<PibSearchInput {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onFocus when the input is focused", () => {
    render(<PibSearchInput {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.focus(inputElement);
    expect(defaultProps.onFocus).toHaveBeenCalled();
  });

  it("calls onBlur when the input loses focus", () => {
    render(<PibSearchInput {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.blur(inputElement);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it("calls setValue when the input value changes", () => {
    render(<PibSearchInput {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(defaultProps.setValue).toHaveBeenCalledWith("test");
  });

  it("applies the outline class when isSearchSelected is true", () => {
    render(<PibSearchInput {...defaultProps} isSearchSelected={true} />);
    const containerElement = screen.getByRole("textbox").parentElement;
    expect(containerElement).toHaveClass("outline");
  });

  it("does not apply the outline class when isSearchSelected is false", () => {
    render(<PibSearchInput {...defaultProps} isSearchSelected={false} />);
    const containerElement = screen.getByRole("textbox").parentElement;
    expect(containerElement).not.toHaveClass("outline");
  });

  it("renders the search icon", () => {
    render(<PibSearchInput {...defaultProps} />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
  });
});
