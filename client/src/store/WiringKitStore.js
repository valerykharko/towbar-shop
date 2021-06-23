import { makeAutoObservable } from "mobx";

export default class WiringKitStore {
  constructor() {
    this._wiring_kits = [];
    this._wiring_kit_infos = [];
    this._selectedWK = {};
    this._selectedWKInfo = {};
    this._pageWK = 1;
    this._totalCountWK = 0;
    this._limitWK = 5;
    makeAutoObservable(this);
  }

  get wiring_kits() {
    return this._wiring_kits;
  }

  get wk_infos() {
    return this._wiring_kit_infos;
  }

  get selectedWK() {
    return this._selectedWK;
  }

  get selectedWKInfo() {
    return this._selectedWKInfo;
  }

  get pageWK() {
    return this._pageWK;
  }

  get limitWK() {
    return this._limitWK;
  }

  get totalCountWK() {
    return this._totalCountWK;
  }

  setWiringKits(wiring_kits) {
    this._wiring_kits = wiring_kits;
  }

  setSelectedWK(wiring_kit) {
    this._selectedWK = wiring_kit;
  }

  setSelectedWKInfo(wiring_kit_info) {
    this._selectedWKInfo = wiring_kit_info;
  }

  setWKInfo(wiring_kit_info) {
    this._wiring_kit_infos = wiring_kit_info;
  }

  setPageWK(pageWK) {
    this._pageWK = pageWK;
  }

  setTotalCountWK(count) {
    this._totalCountWK = count;
  }
}