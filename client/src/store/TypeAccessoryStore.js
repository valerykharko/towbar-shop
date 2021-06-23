import { makeAutoObservable } from "mobx";

export default class TypeAccessoryStore {
  constructor() {
    this._type_accessories = [];
    this._selectedType = {};
    makeAutoObservable(this);
  }

  get type_accessories() {
    return this._type_accessories;
  }

  get selectedType() {
    return this._selectedType;
  }

  setTypes(types) {
    this._type_accessories = types;
  }

  setSelectedType(accessoryType) {
    this._selectedType = accessoryType;
  }
}
