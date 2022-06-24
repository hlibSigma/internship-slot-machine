import { Container } from '@pixi/display';
import BetPanel from '../BetPanel';
import StyledText from 'app/slotMachine/styledText/StyledText';

export default class BalanceView extends Container {
    private balanceValue: number;
    private balanceText: StyledText;
    public balanceValueText: StyledText;
    constructor(initialValue: number, betPanel: BetPanel) {
        super();
        this.balanceValue = initialValue;
        this.balanceText = new StyledText('Balance:');
        this.balanceValueText = new StyledText(this.balanceValue.toString());
        this.setup(betPanel);
    }

    private setup(betPanel: BetPanel) {
        this.addChild(this.balanceText);
        this.addChild(this.balanceValueText)
        this.balanceValueText.x = this.balanceText.width + 5;
        this.x = (betPanel.width - this.width ) / 20;
        this.y = betPanel.y + Math.round((BetPanel.MARGIN - this.balanceText.height) / 2);
    }

    public updateBalance(newBalance: number): void {
        this.balanceValue = newBalance;
        this.balanceValueText.text = newBalance.toFixed(2);
    }
}