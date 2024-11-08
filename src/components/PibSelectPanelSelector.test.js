import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PibSelectPanelSelector from "./PibSelectPanelSelector";

describe("PibSelectPanelSelector", () => {
  const items = [{ text: "Item 1" }, { text: "Item 2" }, { text: "Item 3" }];

  const onSelectedChange = jest.fn();

  it("renders without crashing", () => {
    const { getByText } = render(
      <PibSelectPanelSelector
        selected={null}
        items={items}
        onSelectedChange={onSelectedChange}
      />,
    );

    items.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
  });

  it("calls onSelectedChange when an item is clicked", () => {
    const { getByText } = render(
      <PibSelectPanelSelector
        selected={null}
        items={items}
        onSelectedChange={onSelectedChange}
      />,
    );

    fireEvent.click(getByText("Item 1"));
    expect(onSelectedChange).toHaveBeenCalledWith(expect.any(Object), items[0]);
  });

  it("highlights the selected item", () => {
    const { getByText } = render(
      <PibSelectPanelSelector
        selected={items[1]}
        items={items}
        onSelectedChange={onSelectedChange}
      />,
    );

    const selectedItem = getByText("Item 2").parentElement;
    expect(selectedItem).toHaveClass("bg-gray-100");
  });

  it("displays check icon for the selected item", () => {
    const { getByText, container } = render(
      <PibSelectPanelSelector
        selected={items[1]}
        items={items}
        onSelectedChange={onSelectedChange}
      />,
    );

    const selectedItem = getByText("Item 2").parentElement;
    expect(selectedItem.querySelector("img")).toBeInTheDocument();
  });

  it("does not display check icon for non-selected items", () => {
    const { getByText } = render(
      <PibSelectPanelSelector
        selected={items[1]}
        items={items}
        onSelectedChange={onSelectedChange}
      />,
    );

    const nonSelectedItem = getByText("Item 1").parentElement;
    expect(nonSelectedItem.querySelector("img")).not.toBeInTheDocument();
  });
});
