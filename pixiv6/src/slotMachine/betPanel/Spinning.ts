import { Container } from '@pixi/display';
import StyledText from 'app/slotMachine/styledText/StyledText';
import BetPanel from './BetPanel';

export default class Spinning extends Container {
    public isSpin: boolean;
    private _linesText: StyledText;
    constructor(betPanel: BetPanel) {
        super();
        this.isSpin = false;
        this._linesText = new StyledText(`Spinning...`);
        this.setup(betPanel);
    }
    
    
    public setSpin(newValue : boolean) {
        this.isSpin = newValue;
        if (this.isSpin) {
          this._linesText.text = `Spinning...`;
        } else {
          this._linesText.text = ``;
        }
        
    }
    
    private setup(betPanel: BetPanel):void {
        this.addChild(this._linesText);
        this.x = (betPanel.width - this.width) / 2;

        this._linesText.text = ``;
    }
    
}