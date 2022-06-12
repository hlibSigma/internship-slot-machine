import { Container } from '@pixi/display';
import BetPanel from '../BetPanel';
import StyledText from 'app/slotMachine/styledText/StyledText';

export default class BalanceView extends Container {
    private _balanceValue: number;
    private _balanceText: StyledText;
    private _balanceValueText: StyledText;
    constructor(initialValue: number, betPanel: BetPanel) {
        super();
        this._balanceValue = initialValue;
        this._balanceText = new StyledText('Balance:');
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
        this.addChild(this._balanceText);
        this.addChild(this._balanceValueText)
        this._balanceValueText.x = this._balanceText.width + 5;
        this.x = betPanel.x;
        this.y = betPanel.y + Math.round((BetPanel.MARGIN - this._balanceText.height) / 2);
    }

    public updateBalance(newBalance:number):void {
        this.balanceValue = newBalance;
        this._balanceValueText.text = this.balanceValue.toString();
    }

    
    
}