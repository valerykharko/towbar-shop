import React, { useContext } from "react";
import { Context } from "../../index";
import { Button, Col, ListGroup, Modal } from "react-bootstrap";

const AccessoryFilter = ({ show, onHide }) => {
  const { accessory_type } = useContext(Context);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Выберите тип аксессуара
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <ListGroup>
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
            {accessory_type.type_accessories.map((t) => (
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={t.id === accessory_type.selectedType.id}
                onClick={() => accessory_type.setSelectedType(t)}
                key={t.id}
              >
                {t.name}
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

export default AccessoryFilter;
