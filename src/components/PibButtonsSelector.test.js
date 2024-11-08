import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PibButtonsSelector from "./PibButtonsSelector";

describe("PibButtonsSelector", () => {
  const items = [
    { value: "1", label: "Button 1" },
    { value: "2", label: "Button 2" },
    { value: "3", label: "Button 3" },
  ];

  test("renders buttons correctly", () => {
    const { getByText } = render(
      <PibButtonsSelector items={items} value="1" onChange={() => {}} />,
    );
    items.forEach((item) => {
      expect(getByText(item.label)).toBeInTheDocument();
    });
  });

  test("applies correct class to selected button", () => {
    const { getByText } = render(
      <PibButtonsSelector items={items} value="2" onChange={() => {}} />,
    );
    expect(getByText("Button 2")).toHaveClass("bg-green-100 text-primary");
    expect(getByText("Button 1")).toHaveClass("bg-gray-100 text-gray-700");
    expect(getByText("Button 3")).toHaveClass("bg-gray-100 text-gray-700");
  });

  test("calls onChange with correct value when button is clicked", () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <PibButtonsSelector items={items} value="1" onChange={handleChange} />,
    );
    fireEvent.click(getByText("Button 2"));
    expect(handleChange).toHaveBeenCalledWith("2");
  });
});
