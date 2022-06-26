/**
 * @jest-environment jsdom
 */
// hello.test.js
import React from "react";
import {atom} from "recoil" // in atom file
import {useRecoilState} from "recoil" // in component/s file/s

import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {getCookie, totalCost} from '../components/recoils/atoms';
import { BrowserRouter, Routes, Route } from "react-router-dom";
let container = null;
let cookie = null;

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


it('Get cookie runs correctly', () => {
  act(() => {
    cookie = getCookie("orderList");
});
    
  
expect(cookie).toBe("");

});



it('Add cookie runs correctly', () => {
    act(() => {
    var totalCost2 = 100;
    document.cookie = `totalCost=${totalCost2}`;
    cookie = getCookie("totalCost");
  });
      
    
  expect(cookie).toBe("100");
  
  });