import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PibGoogleLogin from "./PibGoogleLogin";
import { GoogleLogin } from "@react-oauth/google";

jest.mock("@react-oauth/google", () => ({
  GoogleLogin: jest.fn(({ onSuccess, onError }) => (
    <button onClick={() => onSuccess("success")}>Login</button>
  )),
}));

describe("PibGoogleLogin", () => {
  test("renders GoogleLogin component", () => {
    render(<PibGoogleLogin onSuccess={jest.fn()} onError={jest.fn()} />);
    expect(GoogleLogin).toHaveBeenCalled();
  });

  test("calls onSuccess when login is successful", () => {
    GoogleLogin.mockImplementationOnce(({ onSuccess, onError }) => (
      <button onClick={() => onSuccess("success")}>Login</button>
    ));
    const onSuccess = jest.fn();
    render(<PibGoogleLogin onSuccess={onSuccess} onError={jest.fn()} />);
    userEvent.click(screen.getByText("Login"));
    expect(onSuccess).toHaveBeenCalledWith("success");
  });

  test("calls onError when login fails", () => {
    GoogleLogin.mockImplementationOnce(({ onSuccess, onError }) => (
      <button onClick={() => onError("error")}>Login</button>
    ));
    const onError = jest.fn();
    render(<PibGoogleLogin onSuccess={jest.fn()} onError={onError} />);
    userEvent.click(screen.getByText("Login"));
    expect(onError).toHaveBeenCalledWith("error");
  });
});
