import React, {useContext} from "react";
import { Dropdown } from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const AModelFilter = observer(() => {
  const { model } = useContext(Context);
  return (
    <Dropdown className={"mr-2"}>
      <Dropdown.Toggle variant="info">
        {model.selectedModel.name || "Выберите модель авто"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {model.models.map((m) => (
          <Dropdown.Item onClick={() => model.setSelectedModel(m)} key={m.id}>
            {m.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default AModelFilter;
