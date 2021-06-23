import {Button, Col, ListGroup, Modal} from "react-bootstrap";
import React, { useContext } from "react";
import { Context } from "../../index";

const ModelFilter = ({ show, onHide }) => {
  const { model } = useContext(Context);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Выберите модель авто
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <ListGroup>
            {model.models.map((m) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={m.id === model.selectedModel.id}
                onClick={() => model.setSelectedModel(m)}
                key={m.id}
              >
                {m.name}
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
export default ModelFilter;
