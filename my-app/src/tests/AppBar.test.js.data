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
import AppBar from '../components/header/AppBar';

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


it('Appbar renders correctly', () => {
  act(() => {
    render(<BrowserRouter><RecoilRoot><AppBar/></RecoilRoot></BrowserRouter>, container);

  });
    
  
  
  expect(container.textContent).toContain("Profile");
  expect(container.textContent).toContain("Favourites");
  expect(container.textContent).toContain("Basket");

  
});