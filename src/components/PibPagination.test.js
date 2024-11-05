import { render, screen, fireEvent } from "@testing-library/react";
import PibPagination from "./PibPagination";

describe("PibPagination", () => {
  const switchToNextPage = jest.fn();
  const switchToPreviousPage = jest.fn();

  beforeEach(() => {
    switchToNextPage.mockClear();
    switchToPreviousPage.mockClear();
  });

  test("renders correctly", () => {
    render(
      <PibPagination
        currentPage={1}
        switchToNextPage={switchToNextPage}
        switchToPreviousPage={switchToPreviousPage}
        totalNumberOfPages={5}
      />,
    );

    expect(screen.getByText("Página 1 de 5")).toBeInTheDocument();
    expect(screen.getByText("Anterior").parentElement).toBeDisabled();
    expect(screen.getByText("Próxima").parentElement).not.toBeDisabled();
  });

  test("calls switchToNextPage when Próxima button is clicked", () => {
    render(
      <PibPagination
        currentPage={1}
        switchToNextPage={switchToNextPage}
        switchToPreviousPage={switchToPreviousPage}
        totalNumberOfPages={5}
      />,
    );

    fireEvent.click(screen.getByText("Próxima"));
    expect(switchToNextPage).toHaveBeenCalled();
  });

  test("calls switchToPreviousPage when Anterior button is clicked", () => {
    render(
      <PibPagination
        currentPage={2}
        switchToNextPage={switchToNextPage}
        switchToPreviousPage={switchToPreviousPage}
        totalNumberOfPages={5}
      />,
    );

    fireEvent.click(screen.getByText("Anterior"));
    expect(switchToPreviousPage).toHaveBeenCalled();
  });

  test("disables Próxima button on last page", () => {
    render(
      <PibPagination
        currentPage={5}
        switchToNextPage={switchToNextPage}
        switchToPreviousPage={switchToPreviousPage}
        totalNumberOfPages={5}
      />,
    );

    expect(screen.getByText("Próxima").parentElement).toBeDisabled();
  });

  test("disables Anterior button on first page", () => {
    render(
      <PibPagination
        currentPage={1}
        switchToNextPage={switchToNextPage}
        switchToPreviousPage={switchToPreviousPage}
        totalNumberOfPages={5}
      />,
    );

    expect(screen.getByText("Anterior").parentElement).toBeDisabled();
  });
});
