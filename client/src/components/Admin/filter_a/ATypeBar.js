import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Dropdown } from "react-bootstrap";
import { Context } from "../../../index";

const ATypeBar = observer(() => {
  const { accessory_type } = useContext(Context);
  return (
    <Dropdown className={"mr-2 mt-2"}>
      <Dropdown.Toggle variant="success">
        {accessory_type.selectedType.name || "Выберите тип аксессуара"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {accessory_type.type_accessories.map((typeA) => (
          <Dropdown.Item
            onClick={() => {
              accessory_type.setSelectedType(typeA);
            }}
            key={typeA.id}
          >
            {typeA.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default ATypeBar;
