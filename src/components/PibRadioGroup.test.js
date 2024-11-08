import { render, screen, fireEvent, debug } from "@testing-library/react";
import PibRadioGroup from "./PibRadioGroup";

describe("PibRadioGroup", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  test("renders radio group with label", () => {
    render(<PibRadioGroup label="Test Label" options={options} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders all radio options", () => {
    render(<PibRadioGroup label="Test Label" options={options} />);
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  test("calls onChange when an option is selected", () => {
    const handleChange = jest.fn();
    render(
      <PibRadioGroup
        label="Test Label"
        options={options}
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByDisplayValue("option1"));
    expect(handleChange).toHaveBeenCalledWith("option1", expect.anything());

    fireEvent.click(screen.getByDisplayValue("option2"));
    expect(handleChange).toHaveBeenCalledWith("option2", expect.anything());
  });

  test("sets the correct option as checked based on value prop", () => {
    render(
      <PibRadioGroup label="Test Label" options={options} value="option2" />,
    );
    expect(screen.getByLabelText("Option 2")).toBeChecked();
    expect(screen.getByLabelText("Option 1")).not.toBeChecked();
  });
});
