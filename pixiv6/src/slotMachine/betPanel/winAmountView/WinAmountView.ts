import { Container } from '@pixi/display';
import StyledText from 'app/slotMachine/styledText/StyledText';
import BetPanel from '../BetPanel';

export default class WinAmountView extends Container {
    public winamount: number;
    private winAmountText: StyledText;
    constructor(betPanel: BetPanel) {
        super();
        this.winamount = 0;
        this.winAmountText = new StyledText(`Last Win:`);
        this.setup(betPanel);
    }
    
    public set winAmount(newValue : number) {
        this.winamount = newValue;
    }
    public get winAmount(): number {
        return this.winamount;
    }

    public setWinAmount(newValue: number):void {
        this.winamount = newValue;
        if (newValue === 0) {
            this.resetWinAmountText();
            return;
        };
        this.winAmountText.text = `Win: ${this.winAmount.toFixed(1)}`;
    } 
    
    public resetWinAmountText() {
        this.winAmountText.text = `Win:`;
    }
   

    private setup(betPanel: BetPanel):void {
        this.addChild(this.winAmountText);
        this.x = betPanel.width / 2;
        this.y = betPanel.y + Math.round((BetPanel.MARGIN - this.winAmountText.height) / 2);
    }
    
    async createWinCounterAnimation(winAmount: number, callback:Function) {
        const step = winAmount / 100;
        for (let i = 0; i <= winAmount; i += step) {
            await callback(25);
            this.setWinAmount(i);
        }
        this.setWinAmount(winAmount);
    }
}