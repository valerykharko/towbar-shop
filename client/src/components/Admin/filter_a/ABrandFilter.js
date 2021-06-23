import React, { useContext } from "react";
import { Context } from "../../../index";
import { Dropdown } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const ABrandFilter = observer(() => {
  const { brand } = useContext(Context);
  return (
    <Dropdown className={"mr-2"}>
      <Dropdown.Toggle variant="info">
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
  );
});

export default ABrandFilter;
