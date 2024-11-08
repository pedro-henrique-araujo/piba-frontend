import React from "react";
import { render } from "@testing-library/react";
import PibLocationIcon from "./PibLocationIcon";

test("renders an SVG element", () => {
  const { container } = render(<PibLocationIcon />);
  const svgElement = container.querySelector("svg");
  expect(svgElement).toBeInTheDocument();
});
