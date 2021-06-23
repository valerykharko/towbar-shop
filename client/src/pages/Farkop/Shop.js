import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CarBar from "../../components/CarBar";
import FarkopList from "../../components/Farkop/FarkopList";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchFarkopsByFullFilter } from "../../http/farkopAPI";
import PagesF from "./PagesF";
import FarkopFilter from "../../components/filters/FarkopFilter";
import { fetchBrands } from "../../http/brandAPI";
import { fetchModels } from "../../http/modelAPI";
import { fetchGenerations } from "../../http/generationAPI";
import { fetchBodyStyles } from "../../http/bodystyleAPI";

const Shop = observer(() => {
  const { farkop, brand, model, generation, body_style } = useContext(Context);

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
    brand,
    model,
    generation,
    body_style,
    farkop.pageF,
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
            <FarkopFilter />
          </Col>
          <Col md={11}>
            <FarkopList />
            <PagesF />
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default Shop;
