import { Container } from '@pixi/display';
import Balance from "./balance/Balance";
import BetSelector from './betSelector/betSelector';

export default class BetPanel extends Container { 
    private balance: Balance;
    private betSelector: BetSelector;
    constructor() {
        super();
        this.balance = new Balance(10000);
        this.betSelector = new BetSelector();
        this.setup();
    }

    setup() {
        this.addChild(this.balance);
        this.addChild(this.betSelector);

    }
}
