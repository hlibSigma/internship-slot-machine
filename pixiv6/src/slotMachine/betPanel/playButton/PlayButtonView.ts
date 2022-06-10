import { Graphics } from '@pixi/graphics';
import BetPanel from '../BetPanel';
import StyledText from 'app/slotMachine/styledText/StyledText';

export default class PlayButtonView extends Graphics {
  private _playText: StyledText;

  constructor(betPanel:BetPanel) {
    super();
    this._playText = new StyledText("Spin");
    this.setupPlayText(betPanel);
  }

  setupPlayText(betPanel:BetPanel): void {
    this.x = Math.round(betPanel.width - this._playText.width);
    this.y = betPanel.y + Math.round((BetPanel.MARGIN - this._playText.height) / 2);
    this.setActive();
    this.buttonMode = true;
    this.addChild(this._playText);
  }

  setActive():void {
    this.interactive = true;
  }

  setInactive():void {
    this.interactive = false;
  }
}