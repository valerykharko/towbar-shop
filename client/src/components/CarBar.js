import React, {useContext, useState} from "react";
import { observer } from "mobx-react-lite";
import {Button,} from "react-bootstrap";
import BrandFilter from "./filters/BrandFilter";
import ModelFilter from "./filters/ModelFilter";
import GenerationFilter from "./filters/GenerationFilter";
import BodyStyleFilter from "./filters/BodyStyleFilter";
import {Context} from "../index";

const CarBar = observer(() => {
  const { brand, model, generation, body_style } = useContext(Context);
  const [BrandVisible, setBrandVisible] = useState(false);
  const [ModelVisible, setModelVisible] = useState(false);
  const [GenerationVisible, setGenerationVisible] = useState(false);
  const [BodyStyleVisible, setBodyStyleVisible] = useState(false);
  return (
    <>
      <Button
        className="mt-4 mr-2 p-2"
        variant="secondary"
        size="lg"
        onClick={() => setBrandVisible(true)}
      >
        {brand.selectedBrand.name || "Выбрать марку"}
      </Button>
      <BrandFilter show={BrandVisible} onHide={() => setBrandVisible(false)} />
      <Button
        className="mt-4 mr-2 p-2"
        variant="secondary"
        size="lg"
        onClick={() => setModelVisible(true)}
      >
        {model.selectedModel.name || "Выбрать модель"}
      </Button>
      <ModelFilter show={ModelVisible} onHide={() => setModelVisible(false)} />
      <Button
        className="mt-4 mr-2 p-2"
        variant="secondary"
        size="lg"
        onClick={() => setGenerationVisible(true)}
      >
        {generation.selectedGeneration.name || "Выбрать поколение"}
      </Button>
      <GenerationFilter
        show={GenerationVisible}
        onHide={() => setGenerationVisible(false)}
      />
      <Button
        className="mt-4 mr-2 p-2"
        variant="secondary"
        size="lg"
        onClick={() => setBodyStyleVisible(true)}
      >
        {body_style.selectedBodyStyle.name || "Выбрать тип кузова"}
      </Button>
      <BodyStyleFilter
        show={BodyStyleVisible}
        onHide={() => setBodyStyleVisible(false)}
      />
    </>
  );
});

export default CarBar;
