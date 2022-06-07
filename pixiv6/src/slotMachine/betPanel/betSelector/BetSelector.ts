import { Container } from "@pixi/display";
import { BitmapText } from "@pixi/text-bitmap";
import TextButtonControl from "app/controls/button/TextButtonControl";
import { betList } from "./betList";

export default class BetSelector extends Container {
    private lowBet: BitmapText;
    private raiseBet: BitmapText;
    private betList: number[];
    private betIndex: number;
    private betCount: BitmapText;
    constructor() {
        super();        
        this.lowBet = new BitmapText('-', {fontName:"sans-serif", fontSize:12});
        this.raiseBet = new BitmapText('+', {fontName:"sans-serif", fontSize:12});
        this.betList = betList;
        this.betIndex = 4;
        this.betCount = new BitmapText(this.betList[this.betIndex].toString(), {fontName:"sans-serif", fontSize:12})
        this.setup();
    }

    setup(): void {
        this.position.x = 900;
        this.position.y = 700;
        this.addChild(this.lowBet);
        this.addChild(this.betCount);
        this.addChild(this.raiseBet);
        this.width = 300;
        this.height = 100;
    }


}