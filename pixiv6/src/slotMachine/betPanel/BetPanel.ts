import { Graphics } from '@pixi/graphics';
import Balance from "./balance/BalanceView";
import { gameSize } from "app/Main";
import PlayButton from './playButton/PlayButtonView';
import BetSelector from './betSelector/BetSelectorView';
import Lines from './lines/LinesView';
import { config } from '../config/config';
import ReelContainer from '../reels/reelContainer/ReelContainer';
import { TBet } from "app/service/typing";
import { betList } from "app/slotMachine/betPanel/betSelector/betList"

const { gameHeight, gameWidth, reelWidth, symbolSize, betPanelColor } = config

export default class BetPanel extends Graphics { 
    static MARGIN: number = (gameHeight - symbolSize * 3) / 2;
    public balance: Balance;
    private _betSelector: BetSelector;
    private _playButton: PlayButton;
    private _lines: Lines;
    public betList: TBet[];
    public selectedBetId:number = 3;
   
    constructor(reelContainer: ReelContainer) {
        super();
        this.betList = betList;
        this.beginFill(betPanelColor, 0.9);
        this.drawRect(0, 0, gameWidth, BetPanel.MARGIN);
        this.balance = new Balance(10000, this);
        this._betSelector = new BetSelector(this);
        this._lines = new Lines(this);
        this._playButton = new PlayButton(this);
        this.setup(reelContainer);
    }

    setup(reelContainer: ReelContainer):void {
        this.addChild(this.balance);
        this.addChild(this._betSelector);
        this.addChild(this._lines)
        this.addChild(this._playButton);
        this.x = reelContainer.x;
        this.y = reelContainer.y + reelContainer.height;
    }

    addListenerToPlayButton(fn:any, context:any) {
        this._playButton.on('click', fn, context);
    }

    updateBalance(newBalance:number):void {
        this.balance.updateBalance(newBalance);
    }




}
