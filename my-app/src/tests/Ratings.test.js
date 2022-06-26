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
import Ratings from "../components/product/Comment/Ratings";

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


it('Ratings Component renders correctly', () => {
  
  act(() => {
    render(<BrowserRouter><RecoilRoot><Ratings 
        avgRating={4}
        rateCount={12}
        clickHandler={() => {}}
        ratingHandler={() => {}}
    /></RecoilRoot></BrowserRouter>, container);
  });
  expect(container.textContent).toContain("Customer Reviews");
  expect(container.textContent).toContain("Star");
  expect(container.textContent).toContain("Rate");
  
});