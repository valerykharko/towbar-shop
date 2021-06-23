import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PagesF from "../Farkop/PagesF";
import ACarBar from "../../components/Admin/filter_a/ACarBar";
import { Context } from "../../index";
import styles from "../../styles/Admin1.module.css";
import { fetchBrands } from "../../http/brandAPI";
import { fetchModels } from "../../http/modelAPI";
import { fetchGenerations } from "../../http/generationAPI";
import { fetchBodyStyles } from "../../http/bodystyleAPI";
import { fetchFarkopsByFullFilter } from "../../http/farkopAPI";
import { observer } from "mobx-react-lite";
import { fetchWKByFullFilter } from "../../http/wiringkitAPI";
import PagesWK from "../WiringKit/PagesWK";
import FarkopRoster from "../../components/Admin/A_Farkop/FarkopRoster";
import WiringKitRoaster from "../../components/Admin/A_WiringKit/WiringKitRoaster";
import ATypeBar from "../../components/Admin/filter_a/ATypeBar";
import AccessoryRoster from "../../components/Admin/A_Accessory/AccessoryRoster";
import PagesA from "../Accessory/PagesA";
import {
  fetchAccessoriesByFilter,
  fetchAccessoryTypes,
} from "../../http/accessoryAPI";

const Admin1Page = observer(() => {
  const {
    farkop,
    brand,
    model,
    generation,
    body_style,
    wiring_kit,
    accessory,
    accessory_type,
  } = useContext(Context);

  useEffect(() => {
    fetchBrands().then((data) => brand.setBrands(data));
    fetchModels(brand.selectedBrand.id).then((data) => model.setModels(data));
    fetchGenerations(model.selectedModel.id).then((data) =>
      generation.setGenerations(data)
    );
    fetchBodyStyles(generation.selectedGeneration.id).then((data) =>
      body_style.setBodyStyles(data)
    );
  }, [
    farkop,
    brand,
    model,
    generation,
    body_style,
    brand.selectedBrand,
    model.selectedModel,
    generation.selectedGeneration,
    body_style.selectedBodyStyle,
  ]);

  useEffect(() => {
    fetchFarkopsByFullFilter(
      brand.selectedBrand.id,
      model.selectedModel.id,
      generation.selectedGeneration.id,
      body_style.selectedBodyStyle.id,
      farkop.pageF,
      5
    ).then((data) => {
      farkop.setFarkops(data.rows);
      farkop.setTotalCountF(data.count);
    });
  }, [
    farkop,
    farkop.pageF,
    brand.selectedBrand,
    model.selectedModel,
    generation.selectedGeneration,
    body_style.selectedBodyStyle,
  ]);

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

  useEffect(() => {
    fetchAccessoryTypes().then((data) => accessory_type.setTypes(data));
  }, [accessory_type]);

  useEffect(() => {
    fetchAccessoriesByFilter(
      accessory_type.selectedType.id,
      accessory.pageA,
      3
    ).then((data) => {
      accessory.setAccessories(data.rows);
      accessory.setTotalCountA(data.count);
    });
    return () => {};
  }, [accessory, accessory.pageA, accessory_type.selectedType]);
  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <Col className={"d-flex justify-content-md-center"}>
            <ACarBar />
            <button
              className={styles.drop}
              onClick={() => window.location.reload()}
            >
              Сброс
            </button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-md-center mt-5">
          <Col md={5}>
            <FarkopRoster />
          </Col>
          <Col md={5} className="ml-3">
            <WiringKitRoaster />
          </Col>
        </Row>
        <Row className="d-flex justify-content-md-between">
          <Col md={5} className="ml-auto">
            <PagesF />
          </Col>
          <Col md={5} className="mr-auto">
            <PagesWK />
          </Col>
        </Row>
        <hr />
        <hr />
        <Row className="d-flex justify-content-md-between mt-3">
          <Col className={"d-flex justify-content-md-center"}>
            <ATypeBar />
          </Col>
        </Row>
        <Row className="d-flex justify-content-md-center mt-5">
          <Col md={6}>
            <AccessoryRoster />
            <PagesA />
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default Admin1Page;
