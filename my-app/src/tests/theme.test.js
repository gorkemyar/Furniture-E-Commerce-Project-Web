/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@emotion/react";


import themeOptions from '../components/style/theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
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
    render(<BrowserRouter><ThemeProvider theme={themeOptions}><Box></Box></ThemeProvider> </BrowserRouter>, container);
  });
    
  
  expect(container).toBeTruthy();

});
