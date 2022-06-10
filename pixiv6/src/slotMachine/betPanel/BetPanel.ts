import { Graphics } from '@pixi/graphics';
import Balance from "./balance/BalanceView";
import { gameSize } from "app/Main";
import PlayButton from './playButton/PlayButtonView';
import BetSelector from './betSelector/BetSelectorView';
import Lines from './lines/LinesView';

export default class BetPanel extends Graphics { 
    static MARGIN: number = (800 - 150 * 3) / 2;
    private _balance: Balance;
    private _betSelector: BetSelector;
    private _playButton: PlayButton;
    private _lines: Lines;
    constructor() {
        super();
        this.beginFill(14919382, 0.9);
        this.drawRect(0, 550 + BetPanel.MARGIN, 800, BetPanel.MARGIN);
        this._balance = new Balance(10000, this);
        this._betSelector = new BetSelector(this);
        this._lines = new Lines(this);
        this._playButton = new PlayButton(this);
        this.setup();
    }

    setup():void {
        this.addChild(this._balance);
        this.addChild(this._betSelector);
        this.addChild(this._lines)
        this.addChild(this._playButton);
        this.x = gameSize.centerPosition.x - 160 * 2.5;
    }

    addListenerToPlayButton(fn:any) {
        this._playButton.on('click', fn);
    }
}
