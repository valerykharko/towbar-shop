import { makeAutoObservable } from "mobx";

export default class AccessoryStore {
  constructor() {
    this._accessories = [];
    this._accessories_infos = [];
    this._selectedAccessory = {};
    this._selectedAccessoryInfo = {};
    this._pageA = 1;
    this._totalCountA = 0;
    this._limitA = 3;
    makeAutoObservable(this);
  }

  get accessories() {
    return this._accessories;
  }

  get selectedAccessory() {
    return this._selectedAccessory;
  }

  get accessories_infos() {
    return this._accessories_infos;
  }

  get selectedAccessoryInfo() {
    return this._selectedAccessoryInfo;
  }

  get pageA() {
    return this._pageA;
  }

  get limitA() {
    return this._limitA;
  }

  get totalCountA() {
    return this._totalCountA;
  }

  setSelectedAccessory(accessory) {
    this._selectedAccessory = accessory;
  }

  setAccessoriesInfo(accessories_infos) {
    this._accessories_infos = accessories_infos;
  }

  setSelectedAccessoryInfo(accessoryInfo) {
    this._selectedAccessoryInfo = accessoryInfo;
  }

  setAccessories(accessories) {
    this._accessories = accessories;
  }

  setPageA(pageA) {
    this._pageA = pageA;
  }

  setTotalCountA(count) {
    this._totalCountA = count;
  }


}