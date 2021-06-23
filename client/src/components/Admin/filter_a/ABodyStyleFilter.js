import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";

const ABodyStyleFilter = observer(() => {
  const { body_style } = useContext(Context);
  return (
    <Dropdown className={"mr-2"}>
      <Dropdown.Toggle variant="info">
        {body_style.selectedBodyStyle.name || "Выберите кузов авто"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {body_style.bodystyles.map((bS) => (
          <Dropdown.Item
            onClick={() => body_style.setSelectedBodyStyle(bS)}
            key={bS.id}
          >
            {bS.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});

export default ABodyStyleFilter;
