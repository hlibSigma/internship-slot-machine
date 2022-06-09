import { Graphics } from '@pixi/graphics';
import Balance from "./balance/BalanceView";
import PlayButton from './playButton/PlayButtonView';
import BetSelector from './betSelector/BetSelectorView';
import Lines from './lines/LinesView';

export default class BetPanel extends Graphics { 
    static MARGIN: number = (1080 - 150 * 3) / 2;
    private _balance: Balance;
    private _betSelector: BetSelector;
    private _playButton: PlayButton;
    private _lines: Lines;
    constructor() {
        super();
        this.beginFill(0, 1);
        this.drawRect(0, 150 * 3 + BetPanel.MARGIN, 1920, BetPanel.MARGIN);
        this._balance = new Balance(10000, this);
        this._betSelector = new BetSelector(this);
        this._lines = new Lines(this);
        this._playButton = new PlayButton(this);
        this.setup();
    }

    setup() {
        this.addChild(this._balance);
        this.addChild(this._betSelector);
        this.addChild(this._lines)
        this.addChild(this._playButton);
    }

    addListenerToPlayButton(fn:any) {
        this._playButton.on('click', fn);
    }
}
