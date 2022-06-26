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
import ShoppingCard from "../components/shoppingBasket/ShoppingCard";

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


it('Shopping Card Component renders correctly', () => {
  
  act(() => {
    render(<BrowserRouter><RecoilRoot><ShoppingCard 
        imageId={""}
          model={"model"}
          number={"number"}
          cost={"price"}
          description={"description"}
          title={"title"}
          id={"id"}
          delete={() => {}}
          stock={10}
          count={20}
          dec={() => {
            
          }}
          inc={() => {
            
          }}
    /></RecoilRoot></BrowserRouter>, container);
  });
  expect(container.textContent).toContain("titlenumberPrice");
  expect(container.textContent).toContain("price$Modelmodel");
  expect(container.textContent).toContain("Item");
  expect(container.textContent).toContain("Count20Total");
  expect(container.textContent).toContain("PriceNaN");
  

  
});


it('Shopping Card Component with  empty values', () => {
  
    act(() => {
      render(<BrowserRouter><RecoilRoot><ShoppingCard 
         
      /></RecoilRoot></BrowserRouter>, container);
    });
    expect(container.textContent).toContain("Price");
    expect(container.textContent).toContain("$Model");
    expect(container.textContent).toContain("Item");
    expect(container.textContent).toContain("CountTotal");
    expect(container.textContent).toContain("PriceNaN");
    
  
    
  });