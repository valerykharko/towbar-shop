import { makeAutoObservable } from "mobx";

export default class ModelStore {
  constructor() {
    this._models = [];
    this._selectedModel = {};
    makeAutoObservable(this);
  }

  get models() {
    return this._models;
  }

  get selectedModel() {
    return this._selectedModel;
  }

  setModels(models) {
    this._models = models;
  }

  setSelectedModel(model) {
    this._selectedModel = model;
  }
}
