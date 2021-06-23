import React from "react";
import { observer } from "mobx-react-lite";
import ABrandFilter from "./ABrandFilter";
import AModelFilter from "./AModelFilter";
import AGenerationFilter from "./AGenerationFilter";
import ABodyStyleFilter from "./ABodyStyleFilter";

const ACarBar = observer(() => {
  return (
    <>
      <ABrandFilter />
      <AModelFilter />
      <AGenerationFilter />
      <ABodyStyleFilter />
    </>
  );
});

export default ACarBar;
