import { makeAutoObservable } from "mobx";

export default class FarkopStore {
  constructor() {
    this._farkops = [];
    this._farkop_infos = [];
    this._selectedFarkop = {};
    this._selectedFarkopInfo = {};
    this._selectedFarkopBrand = {};
    this._pageF = 1;
    this._totalCountF = 0;
    this._limitF = 5;
    makeAutoObservable(this);
  }

  get farkops() {
    return this._farkops;
  }

  get farkop_infos() {
    return this._farkop_infos;
  }

  get totalCountF() {
    return this._totalCountF;
  }

  get pageF() {
    return this._pageF;
  }

  get limitF() {
    return this._limitF;
  }

  get selectedFarkop() {
    return this._selectedFarkop;
  }

  get selectedFarkopBrand() {
    return this._selectedFarkopBrand;
  }

  get selectedFarkopInfo() {
    return this._selectedFarkopInfo;
  }

  setFarkops(farkops) {
    this._farkops = farkops;
  }

  setSelectedFarkop(farkop) {
    this._selectedFarkop = farkop;
  }

  setFarkopInfo(farkop_infos) {
    this._farkop_infos = farkop_infos;
  }

  setSelectedFarkopInfo(farkopInfo) {
    this._selectedFarkopInfo = farkopInfo;
  }

  setSelectedFarkopBrand(brandF) {
    this._selectedFarkopBrand = brandF;
  }

  setPageF(pageF) {
    this._pageF = pageF;
  }

  setTotalCountF(count) {
    this._totalCountF = count;
  }
}
