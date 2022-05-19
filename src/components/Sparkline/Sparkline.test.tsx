import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Ticker from "./Sparkline";

afterEach(() => {
  cleanup();
});

test("renders valid svg when valid values are provided", () => {
  render(<Ticker color={"blue"} values={[1, 6, 3, 3, 8, 18, 3, 22]} />);
  const element = screen.getByTestId("valid-svg-path");
  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute("d", expect.stringContaining("M"));
});

test('returns an empty path when invalid "values" are provided', () => {
  render(<Ticker color={"blue"} values={[1, 6, 3, 3, 8, 18, 3, NaN, 22]} />);
  const element = screen.getByTestId("valid-svg-path");
  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute("d", "");
});

test('renders "No data" text when no values are provided', () => {
  render(<Ticker color={"green"} values={undefined} />);
  const element = screen.getByTestId("no-data-text");
  expect(element).toBeInTheDocument();
});
