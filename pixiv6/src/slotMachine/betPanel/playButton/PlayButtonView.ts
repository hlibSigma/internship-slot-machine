import { Graphics } from '@pixi/graphics';
import BetPanel from '../BetPanel';
import StyledText from 'app/slotMachine/styledText/StyledText';
import { textStyle, disabled } from 'app/slotMachine/styledText/textStyle';

export default class PlayButtonView extends Graphics {
  private playText: StyledText;

  constructor(betPanel:BetPanel) {
    super();
    this.playText = new StyledText("Spin");
    this.setupPlayText(betPanel);
  }

  setupPlayText(betPanel:BetPanel): void {
    this.pivot.set(0.5);
    this.x = Math.round(betPanel.width - this.playText.width) / 2;
    this.y = betPanel.y + Math.round((BetPanel.MARGIN - this.playText.height) - 20);
    this.setActive();

    this.buttonMode = true;
    this.addChild(this.playText);
  }

  setActive(newInput:string = this.playText.text):void {
    this.interactive = true;
    //newInput:string = this._playText.text
    
    this.playText.style = textStyle;
    this.playText.text = newInput;
    
  }

  setInactive(newInput:string = this.playText.text):void {
    //
    this.interactive = false;
    this.playText.style = disabled;
    this.playText.text = newInput;
  }
}