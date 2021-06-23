import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import FarkopStore from "./store/FarkopStore";
import WiringKitStore from "./store/WiringKitStore";
import BrandStore from "./store/BrandStore";
import ModelStore from "./store/ModelStore";
import BodyStyleStore from "./store/BodyStyleStore";
import GenerationStore from "./store/GenerationStore";
import AccessoryStore from "./store/AccessoryStore";
import TypeAccessoryStore from "./store/TypeAccessoryStore";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      farkop: new FarkopStore(),
      wiring_kit: new WiringKitStore(),
      accessory: new AccessoryStore(),
      accessory_type: new TypeAccessoryStore(),
      brand: new BrandStore(),
      model: new ModelStore(),
      generation: new GenerationStore(),
      body_style: new BodyStyleStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
