import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HeroImage } from "./assets/HeroImage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    
      <BrowserRouter><HeroImage>
        <App /> </HeroImage>
      </BrowserRouter>
   
  </React.StrictMode>
);
