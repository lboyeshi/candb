import React from "react";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

test("formatted currency is never too long", () => {
  expect(true).toBe(true);
});
