import { makeAutoObservable } from "mobx";

export default class BodyStyleStore {
  constructor() {
    this._bodystyles = [];
    this._selectedBodyStyle = {};
    makeAutoObservable(this);
  }

  get bodystyles() {
    return this._bodystyles;
  }

  get selectedBodyStyle() {
    return this._selectedBodyStyle;
  }

  setBodyStyles(bodystyles) {
    this._bodystyles = bodystyles;
  }

  setSelectedBodyStyle(bodyStyle) {
    this._selectedBodyStyle = bodyStyle;
  }
}
