import React from 'react';
import styles from "../../styles/FarkopItem.module.css"
import {Card, Col, Image} from "react-bootstrap";
import rating from "../../images/rating.png"
import {useHistory} from "react-router-dom"
import {FARKOP_ROUTE} from "../../utils/const";

const FarkopItem = ({farkop}) => {
  const history = useHistory()
  return (
    <Col md={2} className={"mt-3"} onClick={() => history.push(FARKOP_ROUTE + '/' + farkop.id)}>
      <Card style={{width: 250, cursor: "pointer" }} border={"light"} mr={6}>
        <Image width={250} height={250} src={process.env.REACT_APP_API_URL + farkop.img}/>
        <div className="mt-1 d-flex justify-content-between align-content-center">
          <div className="text-danger">{farkop.brandF}</div>
          <div className="d-flex align-items-center">
            <div>{farkop.rating}</div>
            <Image className={styles.rating} src={rating}/>
          </div>
        </div>
        <div>Фаркоп {farkop.brandF} {farkop.vendor_code} </div>
      </Card>
    </Col>
  );
};

export default FarkopItem;