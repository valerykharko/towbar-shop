import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../../index";
import { createFarkop, fetchFarkopInfo } from "../../http/farkopAPI";
import { observer } from "mobx-react-lite";
import { fetchBrands } from "../../http/brandAPI";
import { fetchModels } from "../../http/modelAPI";
import { fetchGenerations } from "../../http/generationAPI";
import { fetchBodyStyles } from "../../http/bodystyleAPI";

const CreateFarkop = observer(({ show, onHide }) => {
  const { farkop, brand, model, generation, body_style } = useContext(Context);

  const [brandF, setBrandF] = useState("");
  const [country, setCountry] = useState("");
  const [vendor_code, setVendorCode] = useState("");
  const [max_hor, setMaxHor] = useState();
  const [max_ver, setMaxVer] = useState();
  const [cutout, setCutout] = useState("");
  const [ball_type, setBallType] = useState("");
  const [price, setPrice] = useState();
  const [rating, setRating] = useState(0);
  const [img, setImg] = useState(null);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    fetchBrands().then((data) => brand.setBrands(data));
    fetchModels(brand.selectedBrand.id).then((data) => model.setModels(data));
    fetchGenerations(model.selectedModel.id).then((data) =>
      generation.setGenerations(data)
    );
    fetchBodyStyles(generation.selectedGeneration.id).then((data) =>
      body_style.setBodyStyles(data)
    );
    fetchFarkopInfo(farkop.selectedFarkopInfo.id).then((data) =>
      farkop.setFarkopInfo(data)
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
    farkop.selectedFarkopInfo,
  ]);

  const selectImg = (e) => {
    setImg(e.target.files[0]);
  };

  const selectDoc = (e) => {
    setDoc(e.target.files[0]);
  };

  const addFarkop = () => {
    const formData = new FormData();
    formData.append("brandF", brandF);
    formData.append("country", country);
    formData.append("vendor_code", vendor_code);
    formData.append("max_hor", `${max_hor}`);
    formData.append("max_ver", `${max_ver}`);
    formData.append("cutout", cutout);
    formData.append("ball_type", ball_type);
    formData.append("price", `${price}`);
    formData.append("rating", `${rating}`);
    formData.append("img", img);
    formData.append("doc", doc);
    formData.append("farkopInfoId", farkop.selectedFarkopInfo.id);
    formData.append("brandId", brand.selectedBrand.id);
    formData.append("modelId", model.selectedModel.id);
    formData.append("generationId", generation.selectedGeneration.id);
    formData.append("bodyStyleId", body_style.selectedBodyStyle.id);
    createFarkop(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить фаркоп
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {brand.selectedBrand.name || "Выберите марку авто"}
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
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {generation.selectedGeneration.name || "Выберите поколение авто"}
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
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {farkop.selectedFarkopInfo.id || "Выберите описание для фаркопа"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {farkop.farkop_infos.map((farkop_info) => (
                <Dropdown.Item
                  onClick={() => farkop.setSelectedFarkopInfo(farkop_info)}
                  key={farkop_info.id}
                >
                  {farkop_info.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={brandF}
            onChange={(e) => setBrandF(e.target.value)}
            className={"mt-3"}
            placeholder="Введите бренд фаркопа"
          />
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={"mt-3"}
            placeholder="Введите страну бренда"
          />
          <Form.Control
            value={vendor_code}
            onChange={(e) => setVendorCode(e.target.value)}
            className={"mt-3"}
            placeholder="Введите артикул фаркопа"
          />
          <Form.Control
            value={max_hor}
            onChange={(e) => setMaxHor(Number(e.target.value))}
            className={"mt-3"}
            placeholder="Введите максимальную горизонтальную нагрузку на шар"
          />
          <Form.Control
            value={max_ver}
            onChange={(e) => setMaxVer(Number(e.target.value))}
            className={"mt-3"}
            placeholder="Введите максимальную вертикальную нагрузку на шар"
          />
          <Form.Control
            value={cutout}
            onChange={(e) => setCutout(e.target.value)}
            className={"mt-3"}
            placeholder="Есть вырез? (Да/Нет)"
          />
          <Form.Control
            value={ball_type}
            onChange={(e) => setBallType(e.target.value)}
            className={"mt-3"}
            placeholder="Введите тип шара"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={"mt-3 mb-3"}
            placeholder="Введите стоимость фаркопа"
          />
          <Form.Control
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={"mt-3 mb-3"}
            placeholder="Введите рейтинг фаркопа"
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
        <Button variant={"success"} onClick={addFarkop}>
          Добавить
        </Button>
        <Button variant={"danger"} onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateFarkop;
