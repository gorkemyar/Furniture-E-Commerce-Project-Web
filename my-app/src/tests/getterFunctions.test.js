/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@emotion/react";


import createShoppingDict from '../components/recoils/getterFunctions';
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


it('theme activates correctly', () => {
  act(() => {
    var cartdict = createShoppingDict();
  });
    
  
  expect(container).toBeTruthy();

});
