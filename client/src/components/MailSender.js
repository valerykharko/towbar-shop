import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import { Context } from "../index";
import { sendMail } from "../http/mailAPI";
import { fetchBrands } from "../http/brandAPI";
import { fetchModels } from "../http/modelAPI";
import { fetchGenerations } from "../http/generationAPI";
import { fetchBodyStyles } from "../http/bodystyleAPI";
import { fetchFarkopsByFullFilter } from "../http/farkopAPI";
import { observer } from "mobx-react-lite";
import PagesF from "../pages/Farkop/PagesF";
import {
  fetchAccessoriesByFilter,
  fetchAccessoryTypes,
} from "../http/accessoryAPI";
import PagesA from "../pages/Accessory/PagesA";
import { fetchWKByFullFilter } from "../http/wiringkitAPI";
import PagesWK from "../pages/WiringKit/PagesWK";

const MailSender = observer(() => {
  const {
    user,
    farkop,
    wiring_kit,
    accessory_type,
    accessory,
    brand,
    model,
    generation,
    body_style,
  } = useContext(Context);
  const [mail, setEmail] = useState("");
  const [FIO, setFIO] = useState("");

  useEffect(() => {
    fetchBrands().then((data) => brand.setBrands(data));
    fetchModels(brand.selectedBrand.id).then((data) => model.setModels(data));
    fetchGenerations(model.selectedModel.id).then((data) =>
      generation.setGenerations(data)
    );
    fetchBodyStyles(generation.selectedGeneration.id).then((data) =>
      body_style.setBodyStyles(data)
    );
  }, [
    farkop,
    brand,
    model,
    generation,
    body_style,
    brand.selectedBrand,
    model.selectedModel,
    generation.selectedGeneration,
    body_style.selectedBodyStyle,
  ]);

  useEffect(() => {
    fetchFarkopsByFullFilter(
      brand.selectedBrand.id,
      model.selectedModel.id,
      generation.selectedGeneration.id,
      body_style.selectedBodyStyle.id,
      farkop.pageF,
      5
    ).then((data) => {
      farkop.setFarkops(data.rows);
      farkop.setTotalCountF(data.count);
    });
  }, [
    farkop,
    brand,
    model,
    generation,
    body_style,
    farkop.pageF,
    brand.selectedBrand,
    model.selectedModel,
    generation.selectedGeneration,
    body_style.selectedBodyStyle,
  ]);

  useEffect(() => {
    fetchWKByFullFilter(
      brand.selectedBrand.id,
      model.selectedModel.id,
      generation.selectedGeneration.id,
      body_style.selectedBodyStyle.id,
      wiring_kit.pageWK,
      5
    ).then((data) => {
      wiring_kit.setWiringKits(data.rows);
      wiring_kit.setTotalCountWK(data.count);
    });
  }, [
    wiring_kit,
    wiring_kit.pageWK,
    brand.selectedBrand,
    model.selectedModel,
    generation.selectedGeneration,
    body_style.selectedBodyStyle,
  ]);

  useEffect(() => {
    fetchAccessoryTypes().then((data) => accessory_type.setTypes(data));
  }, [accessory_type]);

  useEffect(() => {
    fetchAccessoriesByFilter(
      accessory_type.selectedType.id,
      accessory.pageA,
      3
    ).then((data) => {
      accessory.setAccessories(data.rows);
      accessory.setTotalCountA(data.count);
    });
    return () => {};
  }, [accessory, accessory.pageA, accessory_type.selectedType]);

  const addMail = () => {
    sendMail({
      fio: FIO,
      email: mail,
      brand: brand.selectedBrand.name,
      model: model.selectedModel.name,
      generation: generation.selectedGeneration.name,
      body_style: body_style.selectedBodyStyle.name,
      farkopBrand: farkop.selectedFarkop.brandF,
      farkop: farkop.selectedFarkop.vendor_code,
      wiringKitBrand: wiring_kit.selectedWK.brandWK,
      wiringKit: wiring_kit.selectedWK.vendor_code,
      accessoryBrand: accessory.selectedAccessory.brand,
      accessory: accessory.selectedAccessory.vendor_code,
    }).then((data) => {
      setEmail("");
      setFIO("");
    });
  };
  debugger;
  return (
    <Container className={"mt-5"}>
      <Row className="justify-content-md-center">
        <Col className="col-md-auto">
          <h2>Заявка на покупку товара</h2>
          <Form>
            <Form.Group className="mt-4">
              <Form.Label htmlFor="exampleInputFIO1">Введите ФИО</Form.Label>
              <Form.Control
                name="FIO"
                id="exampleInputFIO1"
                value={FIO}
                aria-describedby="emailHelp"
                onChange={(e) => setFIO(e.target.value)}
                placeholder="Пример: Кучеров Владимир Иванович"
                required
              />
            </Form.Group>
            <hr />
            <Form.Group className="mt-4">
              <Form.Label htmlFor="exampleInputEmail1">
                Введите Ваш почтовый адрес
              </Form.Label>
              <Form.Control
                type="email"
                name="mail"
                id="exampleInputEmail1"
                value={mail}
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Пример: vova@mail.ru"
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                Ваш текущий email адрес: <b>{user.users.email}</b>
              </small>
            </Form.Group>
            <hr />
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle>
                  {brand.selectedBrand.name || "Выберите Вашу марку авто"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {brand.brands.map((b) => (
                    <Dropdown.Item
                      onClick={() => {
                        brand.setSelectedBrand(b);
                      }}
                      key={b.id}
                    >
                      {b.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle>
                  {model.selectedModel.name || "Выберите модель авто"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {model.models.map((m) => (
                    <Dropdown.Item
                      onClick={() => model.setSelectedModel(m)}
                      key={m.id}
                    >
                      {m.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle>
                  {generation.selectedGeneration.name ||
                    "Выберите поколение авто"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {generation.generations.map((g) => (
                    <Dropdown.Item
                      onClick={() => generation.setSelectedGeneration(g)}
                      key={g.id}
                    >
                      {g.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle>
                  {body_style.selectedBodyStyle.name || "Выберите кузов авто"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {body_style.bodystyles.map((bS) => (
                    <Dropdown.Item
                      onClick={() => body_style.setSelectedBodyStyle(bS)}
                      key={bS.id}
                    >
                      {bS.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <hr />
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle variant="info">
                  {farkop.selectedFarkop.vendor_code || "Выберите фаркоп"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {farkop.farkops.map((f) => (
                    <Dropdown.Item
                      onClick={() => farkop.setSelectedFarkop(f)}
                      key={f.id}
                    >
                      {f.brandF} {f.vendor_code}
                    </Dropdown.Item>
                  ))}
                  <div className={"ml-2"}>
                    <PagesF />
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <hr />
            <hr />
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle variant="info">
                  {wiring_kit.selectedWK.vendor_code || "Выберите штатную электрику"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {wiring_kit.wiring_kits.map((wk) => (
                    <Dropdown.Item
                      onClick={() => wiring_kit.setSelectedWK(wk)}
                      key={wk.id}
                    >
                      {wk.brandWK} {wk.vendor_code}
                    </Dropdown.Item>
                  ))}
                  <div className={"ml-2"}>
                    <PagesWK />
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <hr />
            <hr />
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle>
                  {accessory_type.selectedType.name ||
                    "Выберите тип аксессуара"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {accessory_type.type_accessories.map((type_accessory) => (
                    <Dropdown.Item
                      onClick={() =>
                        accessory_type.setSelectedType(type_accessory)
                      }
                      key={type_accessory.id}
                    >
                      {type_accessory.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <hr />
            <Form.Group className="mt-2">
              <Dropdown className={"mb-2"}>
                <Dropdown.Toggle variant="info">
                  {accessory.selectedAccessory.vendor_code ||
                    "Выберите аксессуар"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {accessory.accessories.map((a) => (
                    <Dropdown.Item
                      onClick={() => accessory.setSelectedAccessory(a)}
                      key={a.id}
                    >
                      {a.brandF} {a.vendor_code}
                    </Dropdown.Item>
                  ))}
                  <div className={"ml-2"}>
                    <PagesA />
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <hr />
            <Button
              type="submit"
              variant={"success"}
              className={"d-flex justify-content-end"}
              onClick={addMail}
            >
              Отправить
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});

export default MailSender;
