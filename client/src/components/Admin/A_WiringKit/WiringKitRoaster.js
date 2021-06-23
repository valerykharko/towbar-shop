import React, { useContext } from "react";
import { Context } from "../../../index";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Image, Row, Table } from "react-bootstrap";
import { WK_ROUTE } from "../../../utils/const";
import arrowR from "../../../images/arrowR.svg";
import goto from "../../../images/element.svg";

const WiringKitRoaster = observer(() => {
  const { wiring_kit } = useContext(Context);
  const history = useHistory();
  return (
    <Row className="d-flex ml-1">
      <Table size="sm" striped bordered hover>
        <thead>
          <tr>
            <th>Бренд</th>
            <th>Страна</th>
            <th>Артикул</th>
            <th>Пин</th>
            <th>Рейтинг</th>
            <th>Цена</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        {wiring_kit.wiring_kits.map((wk) => (
          <tbody>
            <tr>
              <td>{wk.brandWK}</td>
              <td>{wk.country}</td>
              <td>{wk.vendor_code}</td>
              <td>{wk.pin} пин</td>
              <td>{wk.rating}</td>
              <td>{wk.price} р.</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => history.push(WK_ROUTE + "/" + wk.id)}
              >
                <Image src={arrowR} />
                <Image src={goto} />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Row>
  );
});

export default WiringKitRoaster;
