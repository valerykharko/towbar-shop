import React, { useContext } from "react";
import { Row, Table } from "react-bootstrap";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";

const AccessoryRoster = observer(() => {
  const { accessory } = useContext(Context);
  return (
    <Row className="d-flex ml-2">
      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Бренд</th>
            <th>Страна</th>
            <th>Артикул</th>
            <th>Цена</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        {accessory.accessories.map((a) => (
          <tbody>
            <tr>
              <td>{a.name}</td>
              <td>{a.brand}</td>
              <td>{a.country}</td>
              <td>{a.vendor_code}</td>
              <td>{a.price} р.</td>
              <td>{a.rating}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Row>
  );
});

export default AccessoryRoster;
