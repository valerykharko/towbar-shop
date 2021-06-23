import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateFarkop from "../../components/modals/CreateFarkop";
import CreateAccessory from "../../components/modals/CreateАccessory";
import WebSock from "../../chat/WebSocket";
import CreateModel from "../../components/modals/CreateModel";
import CreateGeneration from "../../components/modals/CreateGeneration";
import CreateWK from "../../components/modals/CreateWK";
import CreateBodyStyle from "../../components/modals/CreateBodyStyle";

import { useHistory } from "react-router-dom";
import { ADMIN_1_ROUTE } from "../../utils/const";

const Admin = () => {
  const history = useHistory();
  const [brandVisible, setBrandVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [generationVisible, setGenerationVisible] = useState(false);
  const [bodyStyleVisible, setBodyStyleVisible] = useState(false);
  const [farkopVisible, setFarkopVisible] = useState(false);
  const [wkVisible, setWKVisible] = useState(false);
  const [accessoryVisible, setAccessoryVisible] = useState(false);
  return (
    <Container fluid className="mt-2">
      <Row className={"d-flex justify-content-md-center"}>
        <Button
          className="mt-4 mr-2 p-2"
          variant="secondary"
          size="lg"
          onClick={() => setBrandVisible(true)}
        >
          Добавить марку авто
        </Button>
        <Button
          className="mt-4 mr-2 p-2"
          variant="secondary"
          size="lg"
          onClick={() => setModalVisible(true)}
        >
          Добавить модель авто
        </Button>
      </Row>
      <Row className={"d-flex justify-content-md-center"}>
        <Button
          className="mt-4 mr-2"
          variant="secondary"
          size="lg"
          onClick={() => setGenerationVisible(true)}
        >
          Добавить поколение авто
        </Button>
        <Button
          className="mt-4 mr-2 p-2"
          variant="secondary"
          size="lg"
          onClick={() => setBodyStyleVisible(true)}
        >
          Добавить тип кузова авто
        </Button>
      </Row>
      <Row className={"d-flex justify-content-md-center"}>
        <div>
          <Button
            className="mt-4 mr-2 p-2"
            variant="secondary"
            size="lg"
            onClick={() => setFarkopVisible(true)}
          >
            Добавить фаркоп
          </Button>
        </div>
        <div>
          <Button
            className="mt-4 mr-2 p-2"
            variant="secondary"
            size="lg"
            onClick={() => setWKVisible(true)}
          >
            Добавить штатную электрику
          </Button>
        </div>
        <Button
          className="mt-4 mr-2 p-2"
          variant="secondary"
          size="lg"
          onClick={() => setAccessoryVisible(true)}
        >
          Добавить аксессуар
        </Button>
      </Row>
      <Row className={"d-flex justify-content-md-center"}>
        <Button
          className="mt-4 mr-2 p-2"
          variant="info"
          size="lg"
          onClick={() => history.push(ADMIN_1_ROUTE + "/")}
        >
          Подбор заказа
        </Button>
      </Row>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateModel show={modalVisible} onHide={() => setModalVisible(false)} />
      <CreateGeneration
        show={generationVisible}
        onHide={() => setGenerationVisible(false)}
      />
      <CreateBodyStyle
        show={bodyStyleVisible}
        onHide={() => setBodyStyleVisible(false)}
      />
      <CreateFarkop
        show={farkopVisible}
        onHide={() => setFarkopVisible(false)}
      />
      <CreateWK show={wkVisible} onHide={() => setWKVisible(false)} />
      <CreateAccessory
        show={accessoryVisible}
        onHide={() => setAccessoryVisible(false)}
      />
      <div>
        <WebSock />
      </div>
    </Container>
  );
};

export default Admin;
