import { Container } from '@pixi/display';
import StyledText from 'app/slotMachine/styledText/StyledText';
import BetPanel from '../BetPanel';

export default class WinAmountView extends Container {
    public winamount: number;
    private _linesText: StyledText;
    constructor(betPanel: BetPanel) {
        super();
        this.winamount = 0;
        this._linesText = new StyledText(`Last Win: ${this.winAmount}`);
        this.setup(betPanel);
    }
    
    public set winAmount(newValue : number) {
        this.winamount = newValue;
    }
    public setWinAmount(newValue : number) {
        this.winamount = newValue;
        this._linesText.text = `Last Win: ${this.winAmount.toFixed(1)}`;
    }
    
    public get winAmount() : number {
        return this.winamount;
    }

    private setup(betPanel: BetPanel):void {
        this.addChild(this._linesText);
        this.x = betPanel.width / 2;
        this.y = betPanel.y + Math.round((BetPanel.MARGIN - this._linesText.height) / 2);
    }
    
}