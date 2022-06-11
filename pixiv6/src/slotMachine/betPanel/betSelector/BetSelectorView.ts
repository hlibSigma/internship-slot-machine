import { Container } from "@pixi/display";
import BetPanel from "../BetPanel";
import StyledText from "app/slotMachine/styledText/StyledText";
import { betList } from "./betList";
import { config } from "app/slotMachine/config/config";
const {symbolSize} = config

export default class BetSelectorView extends Container {
    private _lowBet: StyledText;
    private _raiseBet: StyledText;
    private _betList: number[];
    private _betIndex: number;
    private _betCount: StyledText;
    constructor(betPanel: BetPanel) {
        super();        
        this._lowBet = new StyledText('-');
        this._raiseBet = new StyledText('+');
        this._betList = betList;
        this._betIndex = 4;
        this._betCount = new StyledText(this._betList[this._betIndex].toString());
        this.setup(betPanel);
        this.makeTextInteractive();
    }

    setup(betPanel: BetPanel): void {
        this.addChild(this._lowBet);
        this.addChild(this._betCount);
        this.addChild(this._raiseBet);
        this._lowBet.x = betPanel.x + symbolSize * 2;
        this._lowBet.y = betPanel.y + Math.round((BetPanel.MARGIN - this._lowBet.height) / 2);
        this._betCount.x = this._lowBet.x + this._lowBet.width + 5;
        this._betCount.y = betPanel.y + Math.round((BetPanel.MARGIN - this._betCount.height) / 2);
        this._raiseBet.x = this._betCount.x + this._betCount.width + 5;
        this._raiseBet.y = betPanel.y + Math.round((BetPanel.MARGIN - this._raiseBet.height) / 2);
        
    }

    makeTextInteractive(): void {
        this._lowBet.interactive = true;
        this._lowBet.buttonMode = true;

        this._raiseBet.interactive = true;
        this._raiseBet.buttonMode = true;
    }
}