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
import AddressListSummary from '../components/payment/addressList/addressListSummary';

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


it('Address List Summary renders correctly', () => {
  act(() => {
    render(<BrowserRouter><RecoilRoot><AddressListSummary totalCost={1000} isAddress={true} buttonText={"Go To Payment"} link={"/payment"}/></RecoilRoot></BrowserRouter>, container);

  });
  expect(container.textContent).toContain("Go To Payment");
  expect(container.textContent).toContain("Order");
  expect(container.textContent).toContain("Summary");
  expect(container.textContent).toContain("Product");
  expect(container.textContent).toContain("Delivery Fee");
  

  
  
});