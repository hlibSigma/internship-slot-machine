import { Graphics } from '@pixi/graphics';
import Balance from "./balance/Balance";
import PlayButton from './playButton/PlayButton';
import BetSelector from './betSelector/betSelector';
import Lines from './lines/Lines';

// import { config } from '../config/config';
const margin = (1080 - 150 * 3) / 2

export default class BetPanel extends Graphics { 
    private balance: Balance;
    private betSelector: BetSelector;
    private playButton: PlayButton;
    private lines: Lines;
    constructor() {
        super();
        this.beginFill(0, 1);
        this.drawRect(0, 150 * 3 + margin, 1920, margin);
        this.balance = new Balance(10000, this);
        this.betSelector = new BetSelector(this);
        this.lines = new Lines(this);
        this.playButton = new PlayButton(this);
        this.setup();
    }

    setup() {
        this.addChild(this.balance);
        this.addChild(this.betSelector);
        this.addChild(this.lines)
        this.addChild(this.playButton);
    }
}
