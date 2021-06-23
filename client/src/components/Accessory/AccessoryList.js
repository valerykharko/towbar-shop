import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import AccessoryItem from "./AccessoryItem";

const AccessoryList = observer(() => {
  const { accessory } = useContext(Context);
  return (
    <Row className="d-flex">
      {accessory.accessories.map((a) => (
        <AccessoryItem key={a.id} a={a} />
      ))}
    </Row>
  );
});

export default AccessoryList;
