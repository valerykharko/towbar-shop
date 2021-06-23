import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { createBodyStyle } from "../../http/bodystyleAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchGenerations } from "../../http/generationAPI";
import { fetchModels } from "../../http/modelAPI";

const CreateBodyStyle = observer(({ show, onHide }) => {
  const { brand, model, generation } = useContext(Context);

  const [name, setName] = useState("");

  useEffect(() => {
    fetchModels(brand.selectedBrand.id).then((data) => model.setModels(data));
    fetchGenerations(model.selectedModel.id).then((data) =>
      generation.setGenerations(data)
    );
  }, [brand, generation, model, brand.selectedBrand.id]);

  const addBodyStyle = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("generationId", generation.selectedGeneration.id);
    createBodyStyle(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новый кузов
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
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {generation.selectedGeneration.name || "Выберите поколение авто"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {generation.generations.map((g) => (
                <Dropdown.Item
                  onClick={() => generation.setSelectedGeneration(g)}
                  key={g.id}
                >
                  {g.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className={"mt-3"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Введите кузов авто"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={addBodyStyle}>
          Добавить
        </Button>
        <Button variant={"danger"} onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateBodyStyle;
