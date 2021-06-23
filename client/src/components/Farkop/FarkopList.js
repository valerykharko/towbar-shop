import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Row } from "react-bootstrap";
import FarkopItem from "./FarkopItem";

const FarkopList = observer(() => {
  const { farkop } = useContext(Context);
  console.log(farkop.farkops)
  return (
    <Row className="d-flex">
      {farkop.farkops.map((farkop) => (
        <FarkopItem key={farkop.id} farkop={farkop} />
      ))}
    </Row>
  );
});

export default FarkopList;
