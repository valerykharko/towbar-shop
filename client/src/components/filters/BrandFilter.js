import { Button, Col, ListGroup, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { Context } from "../../index";

const BrandFilter = ({ show, onHide }) => {
  const { brand } = useContext(Context);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Выберите марку авто
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <ListGroup className={"mb-2"}>
            <ListGroup.Item
              style={{
                cursor: "pointer",
                backgroundColor: "#B0C4DE",
                fontWeight: "bold",
              }}
              onClick={() => window.location.reload()}
            >
              Выбрать все
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            {brand.brands.map((b) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={b.id === brand.selectedBrand.id}
                onClick={() => brand.setSelectedBrand(b)}
                key={b.id}
              >
                {b.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"danger"} onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default BrandFilter;
