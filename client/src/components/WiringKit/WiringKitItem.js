import React from 'react';
import styles from "../../styles/FarkopItem.module.css"
import {Card, Col, Image} from "react-bootstrap";
import rating from "../../images/rating.png"
import {useHistory} from "react-router-dom"
import { WK_ROUTE} from "../../utils/const";

const WiringKitItem = ({wiring_kit}) => {
  const history = useHistory()
  return (
    <Col md={2} className={"mt-3"} onClick={() => history.push(WK_ROUTE + '/' + wiring_kit.id)}>
      <Card style={{width: 250, cursor: "pointer" }} border={"light"} ml={4} mr={8}>
        <Image width={250} height={250} src={process.env.REACT_APP_API_URL + wiring_kit.img}/>
        <div className="mt-1 d-flex justify-content-between align-content-center">
          <div className="text-danger">{wiring_kit.brandWK}</div>
          <div className="d-flex align-items-center">
            <div>{wiring_kit.rating}</div>
            <Image className={styles.rating} src={rating}/>
          </div>
        </div>
        <div>Штатная электрика {wiring_kit.brandWK} {wiring_kit.vendor_code} </div>
      </Card>
    </Col>
  );
};

export default WiringKitItem;