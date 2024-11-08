import { render, screen, fireEvent } from "@testing-library/react";
import PibSelectPanel from "./PibSelectPanel";

describe("PibSelectPanel", () => {
  const items = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ];
  const label = "Select Item";
  const title = "Select an item";
  const placeholder = "Search items";

  test("renders PibSelectPanel with label and title", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={null}
        onSelectedChange={() => {}}
        label={label}
        title={title}
        placeholder={placeholder}
      />,
    );

    const button = screen.getByText(title);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("when item is selected its name is the button text", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={items[0]}
        onSelectedChange={() => {}}
        label={label}
        title={title}
        placeholder={placeholder}
      />,
    );

    const button = screen.getByText("Item 1");

    expect(button).toBeInTheDocument();
  });

  test("opens and closes the dropdown on button click", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={null}
        onSelectedChange={() => {}}
        label={label}
        title={title}
        placeholder={placeholder}
      />,
    );

    const button = screen.getByText(title);
    fireEvent.click(button);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByPlaceholderText(placeholder)).not.toBeInTheDocument();
  });

  test("filters items based on search input", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={null}
        onSelectedChange={() => {}}
        label={label}
        title={title}
        placeholder={placeholder}
      />,
    );

    const button = screen.getByText(title);
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText(placeholder);
    fireEvent.change(searchInput, { target: { value: "ITém 2" } });

    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();
  });

  test("calls onSelectedChange with the selected item", () => {
    const onSelectedChange = jest.fn();
    render(
      <PibSelectPanel
        items={items}
        selected={null}
        onSelectedChange={onSelectedChange}
        label={label}
        title={title}
        placeholder={placeholder}
      />,
    );

    const button = screen.getByText(title);
    fireEvent.click(button);

    const item = screen.getByText("Item 1");
    fireEvent.click(item);

    expect(onSelectedChange).toHaveBeenCalledWith(items[0]);
  });

  test("closes the dropdown when clicking outside", () => {
    render(
      <PibSelectPanel
        items={items}
        selected={null}
        onSelectedChange={() => {}}
        label={label}
        title={title}
        placeholder={placeholder}
      />,
    );

    const button = screen.getByText(title);
    fireEvent.click(button);

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByPlaceholderText(placeholder)).not.toBeInTheDocument();
  });
});
