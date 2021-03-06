import React, { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";

import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import styles from "../../styles/FarkopPage.module.css";
import bigStar from "../../images/ratingBig.png";
import instrIcon from "../../images/instr.png";
import pdfIcon from "../../images/pdf-icon.svg";
import { fetchOneBrand } from "../../http/brandAPI";
import { fetchOneModel } from "../../http/modelAPI";
import { fetchOneGeneration } from "../../http/generationAPI";
import { fetchOneBodyStyle } from "../../http/bodystyleAPI";
import { fetchOneWK, fetchOneWKInfo } from "../../http/wiringkitAPI";
import {MAIL_SENDER_ROUTE} from "../../utils/const";

const WKPage = () => {
  const [wiringKit, setWiringKit] = useState({});
  const [brand, setBrand] = useState({});
  const [model, setModel] = useState({});
  const [generation, setGeneration] = useState({});
  const [body_style, setBodyStyle] = useState({});
  const [wk_info, setWKInfo] = useState({});
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    fetchOneWK(id).then((data) => {
      setWiringKit(data);
    });
  }, [id]);

  useEffect(() => {
    if (!!wiringKit.brandId) {
      fetchOneBrand(wiringKit.brandId).then((data) => setBrand(data));
      fetchOneModel(wiringKit.modelId).then((data) => setModel(data));
      fetchOneGeneration(wiringKit.generationId).then((data) =>
        setGeneration(data)
      );
      fetchOneBodyStyle(wiringKit.bodyStyleId).then((data) =>
        setBodyStyle(data)
      );
      fetchOneWKInfo(wiringKit.wiringKitInfoId).then((data) => setWKInfo(data));
    }
  }, [
    wiringKit.brandId,
    wiringKit.modelId,
    wiringKit.generationId,
    wiringKit.bodyStyleId,
    wiringKit.wiringKitInfoId,
  ]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Carousel>
            <Carousel.Item>
              <div style={{ cursor: "pointer" }}>
                <a
                  href={process.env.REACT_APP_API_URL + wiringKit.img}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className={styles.forImg}
                    src={process.env.REACT_APP_API_URL + wiringKit.img}
                    alt={"????????1"}
                  />
                </a>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{ cursor: "pointer" }}>
                <a
                  href={process.env.REACT_APP_API_URL + wiringKit.img}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className={styles.forImg}
                    src={process.env.REACT_APP_API_URL + wiringKit.img}
                    alt={"????????2"}
                  />
                </a>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h3>?????????????? ??????????????????</h3>
            <h3>
              {wiringKit.brandWK} {wiringKit.vendor_code}
            </h3>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 150,
                height: 150,
                backgroundSize: "cover",
                fontSize: 32,
              }}
            >
              {wiringKit.rating}
            </div>
          </Row>
          <Row className="d-flex justify-content-end">
            <div style={{ cursor: "pointer" }}>
              <a
                href={process.env.REACT_APP_API_URL + wiringKit.doc}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.instruction}
                  src={instrIcon}
                  alt={"????????????????????"}
                />
              </a>
            </div>
            <div style={{ cursor: "pointer" }}>
              <a
                href={process.env.REACT_APP_API_URL + wiringKit.doc}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.document}
                  src={pdfIcon}
                  alt={"???????????????? ?????? ????????????????????"}
                />
              </a>
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              width: 350,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>{wiringKit.price} BYN</h3>
            <Button variant={"success"} size={"lg"} className={"mt-5"} onClick={() => history.push(MAIL_SENDER_ROUTE)}>
              ????????????????
            </Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>????????????????????????</th>
                <th>??????????</th>
                <th>???????????? ??????????????????????????</th>
                <th>??????????????</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  ?????????????? ?????????????????? ?????? {brand.name} {model.name}{" "}
                  {generation.name} || {body_style.name}
                </td>
                <td>{wiringKit.brandWK}</td>
                <td>{wiringKit.country}</td>
                <td>{wiringKit.vendor_code}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Table className="mt-4" striped hover>
            <thead>
              <tr>
                <th className="table-info">?????????????????????? ????????????????????????????</th>
                <th className="table-info" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>???????????????????? ????????????????</td>
                <td>{wiringKit.pin} ??????</td>
              </tr>
              <tr>
                <td>???????? ????????????????????????:</td>
                <td>????</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={8}>
          <Table className="mt-4" striped hover>
            <thead>
              <tr>
                <th className="table-success">????????????????</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{wk_info.description}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default WKPage;
