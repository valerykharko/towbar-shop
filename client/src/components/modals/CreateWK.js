import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBrands} from "../../http/brandAPI";
import {fetchModels} from "../../http/modelAPI";
import {fetchGenerations} from "../../http/generationAPI";
import {fetchBodyStyles} from "../../http/bodystyleAPI";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createWK, fetchWKInfo} from "../../http/wiringkitAPI";

const CreateWK = observer(({show, onHide}) => {
  const { wiring_kit, brand, model, generation, body_style } = useContext(Context);

  const [brandWK, setBrandWK] = useState("");
  const [country, setCountry] = useState("");
  const [vendor_code, setVendorCode] = useState("");
  const [pin, setPin] = useState("");
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
    fetchWKInfo(wiring_kit.selectedWKInfo.id).then((data) =>
      wiring_kit.setWKInfo(data)
    );
  }, [
    wiring_kit,
    brand,
    model,
    generation,
    body_style,
    brand.selectedBrand,
    model.selectedModel,
    generation.selectedGeneration,
    body_style.selectedBodyStyle,
    wiring_kit.selectedWKInfo,
  ]);

  const selectImg = (e) => {
    setImg(e.target.files[0]);
  };

  const selectDoc = (e) => {
    setDoc(e.target.files[0]);
  };

  const addWK = () => {
    const formData = new FormData();
    formData.append("brandWK", brandWK);
    formData.append("country", country);
    formData.append("vendor_code", vendor_code);
    formData.append("pin", pin);
    formData.append("price", `${price}`);
    formData.append("rating", `${rating}`);
    formData.append("img", img);
    formData.append("doc", doc);
    formData.append("wiringKitInfoId", wiring_kit.selectedWKInfo.id);
    formData.append("brandId", brand.selectedBrand.id);
    formData.append("modelId", model.selectedModel.id);
    formData.append("generationId", generation.selectedGeneration.id);
    formData.append("bodyStyleId", body_style.selectedBodyStyle.id);
    createWK(formData).then((data) => onHide());
  };


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          ???????????????? ?????????????? ??????????????????
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className={"mb-2"}>
            <Dropdown.Toggle>
              {brand.selectedBrand.name || "???????????????? ?????????? ????????"}
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
              {model.selectedModel.name || "???????????????? ???????????? ????????"}
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
              {generation.selectedGeneration.name || "???????????????? ?????????????????? ????????"}
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
              {body_style.selectedBodyStyle.name || "???????????????? ?????????? ????????"}
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
              {wiring_kit.selectedWKInfo.id || "???????????????? ???????????????? ?????? ?????????????? ??????????????????"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {wiring_kit.wk_infos.map((wk_info) => (
                <Dropdown.Item
                  onClick={() => wiring_kit.setSelectedWKInfo(wk_info)}
                  key={wk_info.id}
                >
                  {wk_info.description}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={brandWK}
            onChange={(e) => setBrandWK(e.target.value)}
            className={"mt-3"}
            placeholder="?????????????? ?????????? ?????????????? ??????????????????"
          />
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={"mt-3"}
            placeholder="?????????????? ???????????? ????????????"
          />
          <Form.Control
            value={vendor_code}
            onChange={(e) => setVendorCode(e.target.value)}
            className={"mt-3"}
            placeholder="?????????????? ?????????????? ?????????????? ??????????????????"
          />
          <Form.Control
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={"mt-3"}
            placeholder="?????????????? ???????????????????? ??????????????????? (7/13)"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={"mt-3 mb-3"}
            placeholder="?????????????? ?????????????????? ?????????????? ??????????????????"
          />
          <Form.Control
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={"mt-3 mb-3"}
            placeholder="?????????????? ?????????????? ?????????????? ??????????????????"
            type="number"
          />
          <hr />
          ???????????????? ????????:
          <Form.Control
            className={"mt-3 mb-3"}
            type="file"
            onChange={selectImg}
          />
          ???????????????? ????????????????????????:
          <Form.Control
            className={"mt-3 mb-3"}
            type="file"
            onChange={selectDoc}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"success"} onClick={addWK}>
          ????????????????
        </Button>
        <Button variant={"danger"} onClick={onHide}>
          ??????????????
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateWK;