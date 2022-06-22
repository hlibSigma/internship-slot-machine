import { Container } from '@pixi/display';
import { TUserLoginData } from 'app/service/typing';
import StyledText from 'app/slotMachine/styledText/StyledText';
import BetPanel from '../BetPanel';

export default class LinesView extends Container {
    private linesCount: number;
    private linesText: StyledText;
    private lines: number[][];
    constructor(betPanel: BetPanel, lines:number[][]) {
        super();
        this.lines = lines;
        this.linesCount = this.lines.length;
        this.linesText = new StyledText(`Lines: ${this.linesCount}`);
        this.setup(betPanel);
    }
    

    private setup(betPanel: BetPanel):void {
        this.addChild(this.linesText);
        this.x = betPanel.width - 2 * this.width;
        this.y = betPanel.y + Math.round((BetPanel.MARGIN - this.linesText.height) / 2);
    }
    
}