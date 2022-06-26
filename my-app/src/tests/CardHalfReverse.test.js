/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CardHalfReverse from '../components/card/mediaMiddle/CardHalfReverse';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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


it('Card Half reverse component renders correctly', () => {
  act(() => {
    render(<BrowserRouter><CardHalfReverse /></BrowserRouter>, container);
  });
    
  
  expect(container.textContent).toContain("titleQuantity");
  expect(container.textContent).toContain("Price");

});
