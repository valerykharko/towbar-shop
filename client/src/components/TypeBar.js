import React, {useContext, useState} from "react";
import { observer } from "mobx-react-lite";
import {Button,} from "react-bootstrap";
import {Context} from "../index";
import AccessoryFilter from "./filters/AccessoryFilter";

const TypeBar = observer(() => {
  const { accessory_type } = useContext(Context);
  const [TypeVisible, setTypeVisible] = useState(false);
  return (
    <>
      <Button
        className="mt-4 mr-2 p-2"
        variant="secondary"
        size="lg"
        onClick={() => setTypeVisible(true)}
      >
        {accessory_type.selectedType.name || "Выбрать тип аксессуара"}
      </Button>
      <AccessoryFilter show={TypeVisible} onHide={() => setTypeVisible(false)} />
    </>
  );
});

export default TypeBar;
