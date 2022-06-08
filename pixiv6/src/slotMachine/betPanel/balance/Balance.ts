import { Container } from '@pixi/display';
import { Graphics } from '@pixi/graphics';
import BetPanel from '../BetPanel';
import StyledText from 'app/slotMachine/styledText/StyledText';
const margin = (1080 - 150 * 3) / 2

export default class Balance extends Container {
    private _balanceValue: number;
    private balanceText: StyledText;
    private _balanceValueText: StyledText;
    constructor(initialValue: number, betPanel: BetPanel) {
        super();
        this._balanceValue = initialValue;
        this.balanceText = new StyledText('Balance:');
        this._balanceValueText = new StyledText(this.balanceValue.toString());
        this.setup(betPanel);
    }
    
    public set balanceValue(newValue : number) {
        this._balanceValue = newValue;
    }
    
    public get balanceValue() : number {
        return this._balanceValue;
    }

    private setup(betPanel: BetPanel) {
        this.addChild(this.balanceText);
        this.addChild(this._balanceValueText)
        this._balanceValueText.x = this.balanceText.width + 5;
        this.x = betPanel.x;
        this.y = 1080 - margin + Math.round((margin - this.balanceText.height) / 2);
    }
    
}