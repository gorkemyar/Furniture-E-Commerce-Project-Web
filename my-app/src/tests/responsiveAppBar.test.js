/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ResponsiveAppBar from '../components/header/responsiveAppBar';
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


it('Appbar resonsive renders correctly', () => {
  act(() => {
    var order = {product: { title: "title", id: "1", model: "model" , photos: [{photo_url: "furn1.jpg"}]}};
    render(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>, container);
  });
    
  
  expect(container.textContent).toContain("VoidtureVoidtureLiving");
  expect(container.textContent).toContain("RoomDining");
  expect(container.textContent).toContain("RoomStudy");


});
