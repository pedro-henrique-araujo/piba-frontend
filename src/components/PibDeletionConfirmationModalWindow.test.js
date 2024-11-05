import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PibDeletionConfirmationModalWindow from "./PibDeletionConfirmationModalWindow";

describe("PibDeletionConfirmationModalWindow", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly when visible", () => {
    render(
      <PibDeletionConfirmationModalWindow
        visible={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByAltText("Fechar")).toBeInTheDocument();
    expect(screen.getByAltText("Alerta")).toBeInTheDocument();
    expect(screen.getByText("Atenção")).toBeInTheDocument();
    expect(
      screen.getByText("Tem certeza que você queresse registro?"),
    ).toBeInTheDocument();
    expect(screen.getByText("remover")).toBeInTheDocument();
    expect(screen.getByText("Sim")).toBeInTheDocument();
    expect(screen.getByText("Não")).toBeInTheDocument();
  });

  test("does not render when not visible", () => {
    const { container } = render(
      <PibDeletionConfirmationModalWindow
        visible={false}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  test("calls onClose when clicking outside the modal", () => {
    render(
      <PibDeletionConfirmationModalWindow
        visible={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByRole("dialog").parentElement);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when clicking the close button", () => {
    render(
      <PibDeletionConfirmationModalWindow
        visible={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByAltText("Fechar"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onConfirm when clicking the confirm button", () => {
    render(
      <PibDeletionConfirmationModalWindow
        visible={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByText("Sim"));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when clicking the cancel button", () => {
    render(
      <PibDeletionConfirmationModalWindow
        visible={true}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByText("Não"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
