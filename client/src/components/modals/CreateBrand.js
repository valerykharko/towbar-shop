import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {createBrand} from "../../http/brandAPI";

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState("");
  const addBrand = () => {
    createBrand({
      name: value,
    }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новую марку авто
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className={"mt-2"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Введите марку авто"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={addBrand}>
          Добавить
        </Button>
        <Button variant={"danger"} onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
