import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PibTextarea from "./PibTextarea";

describe("PibTextarea Component", () => {
  test("renders the label correctly", () => {
    render(
      <PibTextarea
        label="Test Label"
        value=""
        onChange={() => {}}
        placeholder="Test Placeholder"
      />,
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders the textarea with the correct placeholder", () => {
    render(
      <PibTextarea
        label="Test Label"
        value=""
        onChange={() => {}}
        placeholder="Test Placeholder"
      />,
    );
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  test("calls onChange function when text is entered", () => {
    const handleChange = jest.fn();
    render(
      <PibTextarea
        label="Test Label"
        value=""
        onChange={handleChange}
        placeholder="Test Placeholder"
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Test Placeholder"), {
      target: { value: "New Text" },
    });
    expect(handleChange).toHaveBeenCalledWith("New Text");
  });

  test("displays the correct value in the textarea", () => {
    render(
      <PibTextarea
        label="Test Label"
        value="Initial Value"
        onChange={() => {}}
        placeholder="Test Placeholder"
      />,
    );
    expect(screen.getByDisplayValue("Initial Value")).toBeInTheDocument();
  });
});
