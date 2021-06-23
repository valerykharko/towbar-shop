import React from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import styles from "../../styles/FarkopItem.module.css";
import rating from "../../images/rating.png";
import basketplus from "../../images/cart-plus.svg";
import { useHistory } from "react-router-dom";
import { MAIL_SENDER_ROUTE } from "../../utils/const";

const AccessoryItem = ({ a }) => {
  const history = useHistory();
  return (
    <Col md={3} className={"mt-3 d-flex justify-content-center"}>
      <Card style={{ width: 300 }} border={"light"} mr={5}>
        <Image
          width={300}
          height={250}
          src={process.env.REACT_APP_API_URL + a.img}
        />
        <div className="mt-1 d-flex justify-content-between align-content-center">
          <div className="text-danger">{a.brand}</div>
          <div className="d-flex align-items-center">
            <div>{a.rating}</div>
            <Image className={styles.rating} src={rating} />
          </div>
        </div>
        <div>
          {a.name} {a.vendor_code}
        </div>
        <div className={"text-center text-primary bg-light"}>
          <Button
            variant="success"
            size={"sm"}
            block
            onClick={() => history.push(MAIL_SENDER_ROUTE)}
          >
            Добавить в корзину <Image src={basketplus} />
          </Button>
          <div className=" "> {a.price} BYN</div>
        </div>
      </Card>
    </Col>
  );
};

export default AccessoryItem;
