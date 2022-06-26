/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import OrderItem from '../components/account/order/OrderItem';
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


it('Payment page renders correctly', () => {
  act(() => {
    var order = {product: { title: "title", id: "1", model: "model" , photos: [{photo_url: "furn1.jpg"}]}};
    render(<BrowserRouter><OrderItem key={0} data={order} /></BrowserRouter>, container);
  });
    
  
  expect(container.textContent).toContain("titleQuantity");
  expect(container.textContent).toContain("Price");

});
