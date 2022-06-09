import { Graphics } from '@pixi/graphics';
import BetPanel from '../BetPanel';
import StyledText from 'app/slotMachine/styledText/StyledText';
const margin = (1080 - 150 * 3) / 2

export default class PlayButton extends Graphics {
  private playText: StyledText;

  constructor(betPanel:BetPanel) {
    super();
    this.playText = new StyledText("Spin");
    this.setupPlayText(betPanel);
  }

  setupPlayText(betPanel:BetPanel): void {
    this.x = Math.round(betPanel.width - this.playText.width);
    this.y = 1080 - margin + Math.round((margin - this.playText.height) / 2);
    this.setActive();
    this.buttonMode = true;
    this.addChild(this.playText);
  }

  setActive():void {
    this.interactive = true;
  }

  setInactive():void {
    this.interactive = false;
  }
}