import { Container } from "@pixi/display";
import BetPanel from "../BetPanel";
import StyledText from "app/slotMachine/styledText/StyledText";
import { config } from "app/slotMachine/config/config";
const { symbolSize } = config;

export default class BetSelectorView extends Container {
    private lowBet: StyledText;
    private raiseBet: StyledText;
    private betPanel: BetPanel;
    
    private _betCount: StyledText;
    constructor(betPanel: BetPanel) {
        super();        
        this.betPanel = betPanel;
        this.lowBet = new StyledText('-');
        this.raiseBet = new StyledText('+');
        this.lowBet.on("click", () => {
            if (this.betPanel.selectedBetId > 1) {
                console.log("lowbet");
                this.betPanel.selectedBetId --;
                this._betCount.text = this.betPanel.getBetValue().toString();
            }
        })
        this.raiseBet.on("click", () => {
            if (this.betPanel.selectedBetId < 8) {
                console.log("raiseBet");
                this.betPanel.selectedBetId ++;
                this._betCount.text = this.betPanel.getBetValue().toString();
            }
        })
        this._betCount = new StyledText(this.betPanel.getBetValue().toString());
        this.setup(betPanel);
        this.makeTextInteractive();
    }

    setup(betPanel: BetPanel): void {
        this.addChild(this.lowBet);
        this.addChild(this._betCount);
        this.addChild(this.raiseBet);
        this.lowBet.x = (betPanel.width - 40 - this._betCount.width - this.lowBet.width) / 2;
        this.lowBet.y = betPanel.y + Math.round((BetPanel.MARGIN - this.lowBet.height) / 2);
        this._betCount.x = this.lowBet.x + this.lowBet.width + 5;
        this._betCount.y = betPanel.y + Math.round((BetPanel.MARGIN - this._betCount.height) / 2);
        this.raiseBet.x = this._betCount.x + this._betCount.width + 20;
        this.raiseBet.y = betPanel.y + Math.round((BetPanel.MARGIN - this.raiseBet.height) / 2);
    }

    makeTextInteractive(): void {
        this.lowBet.interactive = true;
        this.lowBet.buttonMode = true;

        this.raiseBet.interactive = true;
        this.raiseBet.buttonMode = true;
    }

    

}