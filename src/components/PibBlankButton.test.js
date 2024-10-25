import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PibBlankButton from "./PibBlankButton";

test("renders PibBlankButton with children", () => {
  render(<PibBlankButton>Click Me</PibBlankButton>);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = jest.fn();
  render(<PibBlankButton onClick={handleClick}>Click Me</PibBlankButton>);
  const buttonElement = screen.getByText(/Click Me/i);
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("button is disabled when disabled prop is true", () => {
  render(<PibBlankButton disabled={true}>Click Me</PibBlankButton>);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeDisabled();
});

test("button is not disabled when disabled prop is false", () => {
  render(<PibBlankButton disabled={false}>Click Me</PibBlankButton>);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).not.toBeDisabled();
});
