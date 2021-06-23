import React, { useContext, useEffect } from "react";
import { Context } from "../../index";
import { Col, Container, Row } from "react-bootstrap";
import CarBar from "../../components/CarBar";
import { observer } from "mobx-react-lite";
import WiringKitsList from "../../components/WiringKit/WiringKitsList";
import PagesWK from "./PagesWK";
import WKFilter from "../../components/filters/WKFilter";
import {fetchBrands} from "../../http/brandAPI";
import {fetchModels} from "../../http/modelAPI";
import {fetchGenerations} from "../../http/generationAPI";
import {fetchBodyStyles} from "../../http/bodystyleAPI";
import {fetchWKByFullFilter} from "../../http/wiringkitAPI";

const WiringKit = observer(() => {
  const { wiring_kit, brand, model, generation, body_style  } = useContext(Context);

  useEffect(() => {
    fetchBrands().then((data) => brand.setBrands(data));
    fetchModels(brand.selectedBrand.id).then((data) => model.setModels(data));
    fetchGenerations(model.selectedModel.id).then((data) =>
      generation.setGenerations(data)
    );
    fetchBodyStyles(generation.selectedGeneration.id).then((data) =>
      body_style.setBodyStyles(data)
    );
  });

  useEffect(() => {
    fetchWKByFullFilter(
      brand.selectedBrand.id,
      model.selectedModel.id,
      generation.selectedGeneration.id,
      body_style.selectedBodyStyle.id,
      wiring_kit.pageWK,
      5
    ).then((data) => {
      wiring_kit.setWiringKits(data.rows);
      wiring_kit.setTotalCountWK(data.count);
    });
  }, [
    wiring_kit,
    wiring_kit.pageWK,
    brand.selectedBrand,
    model.selectedModel,
    generation.selectedGeneration,
    body_style.selectedBodyStyle,
  ]);

  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <Col className={"d-flex justify-content-md-center"}>
            <CarBar />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <WKFilter />
          </Col>
          <Col md={11}>
            <WiringKitsList />
            <PagesWK />
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default WiringKit;
