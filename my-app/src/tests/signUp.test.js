/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import SignUp from "../components/signIn/SignUp";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Sign Up Page renders correctly", () => {
  act(() => {
    render(<SignUp />, container);
  });
  expect(container.textContent).toMatch(/Sign up/);
  expect(container.textContent).toMatch(/Name/);
  expect(container.textContent).toMatch(/Email Address/);
  expect(container.textContent).toMatch(/Password/);
  expect(container.textContent).toMatch(/Sign in/);
});


// ok