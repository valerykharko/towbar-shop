import { Button, Col, ListGroup, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { Context } from "../../index";

const GenerationFilter = ({ show, onHide }) => {
  const { generation } = useContext(Context);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Выберите поколение авто
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <ListGroup>
            {generation.generations.map((g) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={g.id === generation.selectedGeneration.id}
                onClick={() => generation.setSelectedGeneration(g)}
                key={g.id}
              >
                {g.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"danger"} onClick={onHide}>
          Зыкрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default GenerationFilter;
