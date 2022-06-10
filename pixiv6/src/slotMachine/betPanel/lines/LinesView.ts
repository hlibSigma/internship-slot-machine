import { Container } from '@pixi/display';
import StyledText from 'app/slotMachine/styledText/StyledText';
import BetPanel from '../BetPanel';

export default class LinesView extends Container {
    private _linesCount: number;
    private _linesText: StyledText;
    constructor(betPanel: BetPanel) {
        super();
        this._linesCount = 10;
        this._linesText = new StyledText(`Lines: ${this.linesCount}`);
        this.setup(betPanel);
    }
    
    public set linesCount(newValue : number) {
        this._linesCount = newValue;
    }
    
    public get linesCount() : number {
        return this._linesCount;
    }

    private setup(betPanel: BetPanel):void {
        this.addChild(this._linesText);
        this.x = betPanel.width - 2 * this.width;
        this.y = 900 - BetPanel.MARGIN + Math.round((BetPanel.MARGIN - this._linesText.height) / 2);
    }
    
}