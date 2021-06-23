import React, {useContext} from 'react';
import {Dropdown} from "react-bootstrap";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const AGenerationFilter = observer(() => {
  const { generation } = useContext(Context);
  return (
    <Dropdown className={"mr-2"}>
      <Dropdown.Toggle variant="info">
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
  );
});

export default AGenerationFilter;