import { Button, Col, ListGroup, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { Context } from "../../index";

const BodyStyleFilter = ({ show, onHide }) => {
  const { body_style } = useContext(Context);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Выберите тип кузова авто
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <ListGroup>
            {body_style.bodystyles.map((bs) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={bs.id === body_style.selectedBodyStyle.id}
                onClick={() => body_style.setSelectedBodyStyle(bs)}
                key={bs.id}
              >
                {bs.name}
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
export default BodyStyleFilter;
