import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PibSelectPanel from "./PibSelectPanel";
import { ThemeProvider, BaseStyles } from "@primer/react";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
//

describe("PibSelectPanel", () => {
  const items = [
    { text: "Apple" },
    { text: "Banana" },
    { text: "Cherry" },
    { text: "Date" },
  ];

  window.ResizeObserver = ResizeObserver;

  test("renders without crashing", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={[]}
        onSelectedChange={() => {}}
        label="Select Fruit"
        title="Fruits"
        placeholder="Choose a fruit"
      />,
    );
    expect(screen.getByLabelText("Select Fruit")).toBeInTheDocument();
  });

  test("opens select panel on button click", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={[]}
        onSelectedChange={() => {}}
        label="Select Fruit"
        title="Fruits"
        placeholder="Choose a fruit"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Fruits/i }));
    expect(screen.getByText("Choose a fruit")).toBeInTheDocument();
  });

  test("filters items correctly", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={[]}
        onSelectedChange={() => {}}
        label="Select Fruit"
        title="Fruits"
        placeholder="Choose a fruit"
      />,
    );
    screen.debug();
    fireEvent.click(screen.getByText(/Fruits/i).parentElement.parentElement);
    fireEvent.change(screen.getByPlaceholderText("Choose a fruit"), {
      target: { value: "ap" },
    });
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).toBeNull();
  });

  test("calls onSelectedChange when selection changes", () => {
    const onSelectedChange = jest.fn();
    render(
      <PibSelectPanel
        items={items}
        selected={[]}
        onSelectedChange={onSelectedChange}
        label="Select Fruit"
        title="Fruits"
        placeholder="Choose a fruit"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Fruits/i }));
    fireEvent.click(screen.getByText("Apple"));
    expect(onSelectedChange).toHaveBeenCalledWith(["Apple"]);
  });

  test("removes accents when filtering", () => {
    const accentedItems = [{ text: "Açaí" }, { text: "Banana" }];
    render(
      <PibSelectPanel
        items={accentedItems}
        selected={[]}
        onSelectedChange={() => {}}
        label="Select Fruit"
        title="Fruits"
        placeholder="Choose a fruit"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Fruits/i }));
    fireEvent.change(screen.getByPlaceholderText("Choose a fruit"), {
      target: { value: "Acai" },
    });
    expect(screen.getByText("Açaí")).toBeInTheDocument();
  });
});
