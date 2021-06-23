import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Col, Container, Row } from "react-bootstrap";
import AccessoryList from "../../components/Accessory/AccessoryList";
import { Context } from "../../index";
import {
  fetchAccessoriesByFilter,
  fetchAccessoryTypes,
} from "../../http/accessoryAPI";
import PagesA from "./PagesA";
import TypeBar from "../../components/TypeBar";

const Accessory = observer(() => {
  const { accessory, accessory_type } = useContext(Context);

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
          <Col className={"d-flex justify-content-center"}>
            <TypeBar />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>{}</Col>
          <Col md={10}>
            <AccessoryList />
            <div className={"d-flex justify-content-start ml-3"}>
              <PagesA />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default Accessory;
