import { makeAutoObservable } from "mobx";

export default class GenerationStore {
  constructor() {
    this._generations = [];
    this._selectedGeneration = {};
    makeAutoObservable(this);
  }

  get generations() {
    return this._generations;
  }

  get selectedGeneration() {
    return this._selectedGeneration;
  }

  setGenerations(generations) {
    this._generations = generations;
  }

  setSelectedGeneration(generation) {
    this._selectedGeneration = generation;
  }
}