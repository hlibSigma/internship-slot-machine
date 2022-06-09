import { Container } from '@pixi/display';
import StyledText from 'app/slotMachine/styledText/StyledText';
import BetPanel from '../BetPanel';
const margin = (1080 - 150 * 3) / 2

export default class Lines extends Container {
    private _linesCount: number;
    private linesText: StyledText;
    constructor(betPanel: BetPanel) {
        super();
        this._linesCount = 10;
        this.linesText = new StyledText(`Lines: ${this.linesCount}`);
        this.setup(betPanel);
    }
    
    public set linesCount(newValue : number) {
        this._linesCount = newValue;
    }
    
    public get linesCount() : number {
        return this._linesCount;
    }

    private setup(betPanel: BetPanel):void {
        this.addChild(this.linesText);
        this.x = betPanel.width - 2 * this.width;
        this.y = 1080 - margin + Math.round((margin - this.linesText.height) / 2);
    }
    
}