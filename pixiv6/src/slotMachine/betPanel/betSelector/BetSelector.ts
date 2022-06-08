import { Container } from "@pixi/display";
import BetPanel from "../BetPanel";
import StyledText from "app/slotMachine/styledText/StyledText";
import { betList } from "./betList";
const margin = (1080 - 150 * 3) / 2

export default class BetSelector extends Container {
    private lowBet: StyledText;
    private raiseBet: StyledText;
    private betList: number[];
    private betIndex: number;
    private betCount: StyledText;
    constructor(betPanel: BetPanel) {
        super();        
        this.lowBet = new StyledText('-');
        this.raiseBet = new StyledText('+');
        this.betList = betList;
        this.betIndex = 4;
        this.betCount = new StyledText(this.betList[this.betIndex].toString());
        this.setup(betPanel);
        this.makeTextInteractive();
    }

    setup(betPanel: BetPanel): void {
        this.addChild(this.lowBet);
        this.addChild(this.betCount);
        this.addChild(this.raiseBet);
        this.lowBet.x = betPanel.x + 400;
        this.lowBet.y = 1080 - margin + Math.round((margin - this.lowBet.height) / 2);
        this.betCount.x = this.lowBet.x + this.lowBet.width + 5;
        this.betCount.y = 1080 - margin + Math.round((margin - this.betCount.height) / 2);
        this.raiseBet.x = this.betCount.x + this.betCount.width + 5;
        this.raiseBet.y = 1080 - margin + Math.round((margin - this.lowBet.height) / 2);
        
    }

    makeTextInteractive(): void {
        this.lowBet.interactive = true;
        this.lowBet.buttonMode = true;

        this.raiseBet.interactive = true;
        this.raiseBet.buttonMode = true;
    }
}