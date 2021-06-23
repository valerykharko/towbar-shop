import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { createGeneration } from "../../http/generationAPI";
import { Context } from "../../index";
import { fetchModels } from "../../http/modelAPI";
import { observer } from "mobx-react-lite";

const CreateGeneration = observer(({ show, onHide }) => {
  const { brand, model } = useContext(Context);

  const [name, setName] = useState("");
  const [year_of_issue, setYearOfIssue] = useState("");
  const [smart, setSmart] = useState("");

  useEffect(() => {
    fetchModels(brand.selectedBrand.id).then((data) => model.setModels(data));
  }, [brand.selectedBrand.id, model]);

  const addGeneration = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("year_of_issue", year_of_issue);
    formData.append("smart", smart);
    formData.append("modelId", model.selectedModel.id);
    createGeneration(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новое поколение авто
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
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {model.selectedModel.name || "Выберите модель авто"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {model.models.map((m) => (
                <Dropdown.Item
                  onClick={() => model.setSelectedModel(m)}
                  key={m.id}
                >
                  {m.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className={"mt-3"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Введите поколение авто || (IV поколение (E39))"}
          />
          <Form.Control
            className={"mt-3"}
            value={year_of_issue}
            onChange={(e) => setYearOfIssue(e.target.value)}
            placeholder={"Введите год выпуска || (2015-2021)"}
          />
          <Form.Control
            className={"mt-3"}
            value={smart}
            onChange={(e) => setSmart(e.target.value)}
            placeholder={"Нужен ли блок? (Да/Нет)"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={addGeneration}>
          Добавить
        </Button>
        <Button variant={"danger"} onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateGeneration;
