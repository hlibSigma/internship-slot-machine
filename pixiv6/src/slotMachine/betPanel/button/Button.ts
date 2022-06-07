import { Sprite, Texture } from 'pixi.js';

export default class Button extends Sprite {
  protected activeTexture: Texture;
  protected inactiveTexture: Texture;
  protected disabledTexture: Texture;

  constructor(params: ButtonConstructorParams) {
    super();
    this.activeTexture = params.activeTexture;
    this.inactiveTexture = params.inactiveTexture;
    this.disabledTexture = params.disabledTexture;
    this.buttonMode = true;
    this.setInactive();
  }

  setActive() {
    this.texture = this.activeTexture;
    this.interactive = true;
  }

  setInactive() {
    this.texture = this.inactiveTexture;
    this.interactive = true;
  }

  setDisabled() {
    this.texture = this.disabledTexture;
    this.interactive = false;
  }
}


export interface ButtonConstructorParams {
  inactiveTexture: Texture;
  activeTexture: Texture;
  disabledTexture: Texture;
}