import React, { useContext } from "react";
import { Image, Row, Table} from "react-bootstrap";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import {FARKOP_ROUTE} from "../../../utils/const";
import {useHistory} from "react-router-dom";
import goto from "../../../images/element.svg"
import arrowR from "../../../images/arrowR.svg"
import ballver from "../../../images/ballver.svg"
import ballgor from "../../../images/ballgor.svg"

const FarkopRoster = observer(() => {
  const { farkop } = useContext(Context);

  const history = useHistory();
  return (
    <Row className="d-flex ml-2">
      <Table size="sm" striped bordered hover>
        <thead>
        <tr>
          <th>Бренд</th>
          <th>Страна</th>
          <th>Артикул</th>
          <th>Нагрузка <Image src={ballgor}/></th>
          <th>Нагрузка <Image src={ballver}/></th>
          <th>Тип шара</th>
          <th>Вырез</th>
          <th>Цена</th>
          <th>Ссылка</th>
        </tr>
        </thead>
      {farkop.farkops.map((farkop) => (
          <tbody>
          <tr>
            <td>{farkop.brandF}</td>
            <td>{farkop.country}</td>
            <td>{farkop.vendor_code}</td>
            <td>{farkop.max_hor} кг</td>
            <td>{farkop.max_ver} кг</td>
            <td>тип шара {farkop.ball_type}</td>
            <td>{farkop.cutout}</td>
            <td>{farkop.price} р.</td>
            <td
              style={{ cursor: "pointer" }}
              onClick={() => history.push(FARKOP_ROUTE + "/" + farkop.id)}
            >
              <Image src={arrowR}/>
              <Image src={goto}/>
            </td>
          </tr>
          </tbody>
      ))}
      </Table>
    </Row>
  );
});

export default FarkopRoster;
