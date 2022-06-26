/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import DiscountItem from '../components/header/categories/DiscountItem';
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


it('Discount Item renders correctly', () => {
  act(() => {
    render(<BrowserRouter><DiscountItem img={"furn1.jpg"} /></BrowserRouter>, container);
  });
    
  
  expect(container).toBeTruthy();
});

it('Discount Item with empty image', () => {
  act(() => {
    render(<BrowserRouter><DiscountItem/></BrowserRouter>, container);
  });
    
  
  expect(container).toBeTruthy();
});