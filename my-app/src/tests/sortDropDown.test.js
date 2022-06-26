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
import SortDropDown from '../components/search/sortDropDown';

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


it('Sort dropdown Component renders correctly', () => {
  const data = ["a", "c", "b"];
  let dataCopy = data;

  const setDynamicData = (data) => {
   dataCopy = data; 
  };

  const handleSort = (sort) => {
    if (sort === 0) {
      setDynamicData(dataCopy);
      console.log(dataCopy);
      console.log("sort 0");
    }

    if (sort === 1) {
      // Sort by price low to high
      data.sort((a, b) => a.price - b.price);
      setDynamicData(data);
    } else if (sort === 2) {
      // Sort by price high to low
      data.sort((a, b) => b.price - a.price);
      setDynamicData(data);
    } else if (sort === 3) {
      // Sort by popularity
      data.sort((a, b) => b.comment_count - a.comment_count);
      setDynamicData(data);
      console.log("sort 3");
    }  
  };
  
  act(() => {
    render(<BrowserRouter><RecoilRoot><SortDropDown handleSort={handleSort}/></RecoilRoot></BrowserRouter>, container);
  });
  expect(container.textContent).toContain("Sort");

  
});