/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from "recoil";
import PaymentSuccessPage from "../components/payment/paymentSuccess/paymentSuccessPage";

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

it("Payment Success Page renders correctly", () => {
  act(() => {
    render(<BrowserRouter><RecoilRoot><PaymentSuccessPage /></RecoilRoot></BrowserRouter>, container);
  });
  expect(container.textContent).toMatch(/Your order is complete/);
  expect(container.textContent).toMatch(/email/);
  expect(container.textContent).toMatch(/Get Invoice/);
  expect(container.textContent).toMatch(/Explore/);
});
