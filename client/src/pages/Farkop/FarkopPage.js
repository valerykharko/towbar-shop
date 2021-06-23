import React, { useEffect, useState } from "react";
import styles from "../../styles/FarkopPage.module.css";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import bigStar from "../../images/ratingBig.png";
import pdfIcon from "../../images/pdf-icon.svg";
import instrIcon from "../../images/instr.png";
import {useHistory, useParams} from "react-router-dom";
import { fetchOneFarkop, fetchOneFarkopInfo } from "../../http/farkopAPI";
import { fetchOneBrand } from "../../http/brandAPI";
import { fetchOneModel } from "../../http/modelAPI";
import { fetchOneGeneration } from "../../http/generationAPI";
import { fetchOneBodyStyle } from "../../http/bodystyleAPI";
import {MAIL_SENDER_ROUTE} from "../../utils/const";

const FarkopPage = () => {
  const [farkop, setFarkop] = useState({});
  const [brand, setBrand] = useState({});
  const [model, setModel] = useState({});
  const [generation, setGeneration] = useState({});
  const [body_style, setBodyStyle] = useState({});
  const [farkop_info, setFarkopInfo] = useState({});
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    fetchOneFarkop(id).then((data) => {
      setFarkop(data);
    });
  }, [id]);

  useEffect(() => {
    if (!!farkop.brandId) {
      fetchOneBrand(farkop.brandId).then((data) => setBrand(data));
      fetchOneModel(farkop.modelId).then((data) => setModel(data));
      fetchOneGeneration(farkop.generationId).then((data) =>
        setGeneration(data)
      );
      fetchOneBodyStyle(farkop.bodyStyleId).then((data) => setBodyStyle(data));
      fetchOneFarkopInfo(farkop.farkopInfoId).then((data) =>
        setFarkopInfo(data)
      );
    }
  }, [
    farkop.brandId,
    farkop.modelId,
    farkop.generationId,
    farkop.bodyStyleId,
    farkop.farkopInfoId,
  ]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Carousel>
            <Carousel.Item>
              <div style={{ cursor: "pointer" }}>
                <a
                  href={process.env.REACT_APP_API_URL + farkop.img}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className={styles.forImg}
                    src={process.env.REACT_APP_API_URL + farkop.img}
                    alt={"Фото1"}
                  />
                </a>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div style={{ cursor: "pointer" }}>
                <a
                  href={process.env.REACT_APP_API_URL + farkop.img}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className={styles.forImg}
                    src={process.env.REACT_APP_API_URL + farkop.img}
                    alt={"Фото2"}
                  />
                </a>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>
              Фаркоп {farkop.brandF} {farkop.vendor_code}
            </h2>
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
              {farkop.rating}
            </div>
          </Row>
          <Row className="d-flex justify-content-end">
            <div style={{ cursor: "pointer" }}>
              <a
                href={process.env.REACT_APP_API_URL + farkop.doc}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.instruction}
                  src={instrIcon}
                  alt={"Инструкция"}
                />
              </a>
            </div>
            <div style={{ cursor: "pointer" }}>
              <a
                href={process.env.REACT_APP_API_URL + farkop.doc}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={styles.document}
                  src={pdfIcon}
                  alt={"Документ для скачивания"}
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
            <h3>{farkop.price} BYN</h3>
            <Button variant={"success"} size={"lg"} className={"mt-5"} onClick={() => history.push(MAIL_SENDER_ROUTE)}>
              Заказать
            </Button>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Бренд</th>
                <th>Страна производитель</th>
                <th>Артикул</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Фаркоп на {brand.name} {model.name} {generation.name} ||{" "}
                  {body_style.name}
                </td>
                <td>{farkop.brandF}</td>
                <td>{farkop.country}</td>
                <td>{farkop.vendor_code}</td>
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
                <th className="table-info">Технические характеристики</th>
                <th className="table-info" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Тип шара:</td>
                <td>{farkop.ball_type}</td>
              </tr>
              <tr>
                <td>Горизонтальная нагрузка на шар:</td>
                <td>{farkop.max_hor} кг</td>
              </tr>
              <tr>
                <td>Вертикальная нагрузка на шар:</td>
                <td>{farkop.max_ver} кг</td>
              </tr>
              <tr>
                <td>Вырез бампера:</td>
                <td>{farkop.cutout}</td>
              </tr>
              <tr>
                <td>Блок согласования:</td>
                <td>{generation.smart}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={8}>
          <Table className="mt-4" striped hover>
            <thead>
              <tr>
                <th className="table-success">Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{farkop_info.description}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default FarkopPage;
