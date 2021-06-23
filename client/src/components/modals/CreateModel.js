import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { createModel } from "../../http/modelAPI";

import { Context } from "../../index";
import { fetchBrands } from "../../http/brandAPI";
import { observer } from "mobx-react-lite";

const CreateModel = observer(({ show, onHide }) => {
  const { brand } = useContext(Context);

  const [name, setName] = useState("");

  useEffect(() => {
    fetchBrands().then((data) => brand.setBrands(data));
  }, [brand]);

  const addModel = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", brand.selectedBrand.id);
    createModel(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новую модель авто
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {brand.selectedBrand.name || "Выберите марку авто"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brand.brands.map((b) => (
                <Dropdown.Item
                  onClick={() => {
                    brand.setSelectedBrand(b);
                  }}
                  key={b.id}
                >
                  {b.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className={"mt-2"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Введите модель авто"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={addModel}>
          Добавить
        </Button>
        <Button variant={"danger"} onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateModel;
