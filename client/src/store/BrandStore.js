import { makeAutoObservable } from "mobx";

export default class BrandStore {
  constructor() {
    this._brands = [];
    this._selectedBrand = {};
    makeAutoObservable(this);
  }

  get brands() {
    return this._brands;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
}
