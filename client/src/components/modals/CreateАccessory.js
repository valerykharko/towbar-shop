import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import {
  createAccessory,
  fetchAccessoryInfos,
  fetchAccessoryTypes,
} from "../../http/accessoryAPI";

const CreateAccessory = observer(({ show, onHide }) => {
  const { accessory, accessory_type } = useContext(Context);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("");
  const [vendor_code, setVendorCode] = useState("");
  const [price, setPrice] = useState();
  const [rating, setRating] = useState(0);
  const [img, setImg] = useState(null);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    fetchAccessoryInfos().then((data) => accessory.setAccessoriesInfo(data));
    fetchAccessoryTypes().then((data) => accessory_type.setTypes(data));
  }, [accessory, accessory_type]);

  const selectImg = (e) => {
    setImg(e.target.files[0]);
  };

  const selectDoc = (e) => {
    setDoc(e.target.files[0]);
  };

  const addAccessory = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("country", country);
    formData.append("vendor_code", vendor_code);
    formData.append("price", `${price}`);
    formData.append("rating", `${rating}`);
    formData.append("img", img);
    formData.append("doc", doc);
    formData.append("farkopInfoId", accessory.selectedAccessoryInfo.id);
    formData.append("typeAccessoryId", accessory_type.selectedType.id);
    createAccessory(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить аксессуар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {accessory.selectedAccessoryInfo.id ||
                "Выберите описание для аксессуара"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {accessory.accessories_infos.map((a_i) => (
                <Dropdown.Item
                  onClick={() => accessory.setSelectedAccessoryInfo(a_i)}
                  key={a_i.id}
                >
                  {a_i.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {accessory_type.selectedType.name || "Выберите тип аксессуара"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {accessory_type.type_accessories.map((type_accessory) => (
                <Dropdown.Item
                  onClick={() => accessory_type.setSelectedType(type_accessory)}
                  key={type_accessory.id}
                >
                  {type_accessory.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={"mt-3"}
            placeholder="Введите название аксессуара"
          />
          <Form.Control
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={"mt-3"}
            placeholder="Введите бренд аксессуара"
          />
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={"mt-3"}
            placeholder="Введите страну аксессуара"
          />
          <Form.Control
            value={vendor_code}
            onChange={(e) => setVendorCode(e.target.value)}
            className={"mt-3"}
            placeholder="Введите артикул аксессуара"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={"mt-3 mb-3"}
            placeholder="Введите стоимость аксессуара"
          />
          <Form.Control
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={"mt-3 mb-3"}
            placeholder="Введите рейтинг аксессуара"
            type="number"
          />
          <hr />
          Загрузка фото:
          <Form.Control
            className={"mt-3 mb-3"}
            type="file"
            onChange={selectImg}
          />
          Загрузка документации:
          <Form.Control
            className={"mt-3 mb-3"}
            type="file"
            onChange={selectDoc}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={addAccessory}>
          Добавить
        </Button>
        <Button variant={"danger"} onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateAccessory;
