import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PibPrimaryButton from "./PibPrimaryButton";

describe("PibPrimaryButton", () => {
  test("renders the button with children text", () => {
    render(<PibPrimaryButton>Click Me</PibPrimaryButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<PibPrimaryButton onClick={handleClick}>Click Me</PibPrimaryButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick handler when disabled", () => {
    const handleClick = jest.fn();
    render(
      <PibPrimaryButton onClick={handleClick} disabled>
        Click Me
      </PibPrimaryButton>,
    );
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("has the correct class when disabled", () => {
    render(<PibPrimaryButton disabled>Click Me</PibPrimaryButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveClass("disabled:opacity-50");
  });

  test("has the correct class when enabled", () => {
    render(<PibPrimaryButton>Click Me</PibPrimaryButton>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveClass("cursor-pointer");
  });
});
