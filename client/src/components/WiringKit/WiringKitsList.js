import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../../index";
import WiringKitItem from "./WiringKitItem";
import { observer } from "mobx-react-lite";

const WiringKitsList = observer(() => {
  const { wiring_kit } = useContext(Context);
  return (
    <Row className="d-flex">
      {wiring_kit.wiring_kits.map((wk) => (
        <WiringKitItem key={wk.id} wiring_kit={wk} />
      ))}
    </Row>
  );
});

export default WiringKitsList;
