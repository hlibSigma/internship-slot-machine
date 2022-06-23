import { Graphics } from '@pixi/graphics';
import Balance from "./balance/BalanceView";
import PlayButton from './playButton/PlayButtonView';
import BetSelector from './betSelector/BetSelectorView';
import Lines from './lines/LinesView';
import WinAmountView from './winAmountView/WinAmountView';
import { config } from '../config/config';
import ReelContainer from '../reels/reelContainer/ReelContainer';
import { TBet, TInitResponse, TUserData, TUserStatsData } from "app/service/typing";
import { gameSize } from 'app/Main';
// 
const { gameHeight, gameWidth, reelWidth, symbolSize, betPanelColor } = config

export default class BetPanel extends Graphics {
    static MARGIN: number = (gameHeight - symbolSize * 3)/3*2;
    public balance: Balance;
    private betSelector: BetSelector;
    public playButton: PlayButton;
    private lines: Lines;
    public winAmount: WinAmountView;
    public betList: TBet[];
    public selectedBetId: number = 3;
    private userBalance: string = '10000';
   
    constructor(reelContainer: ReelContainer, bets: TBet[], userStats: TUserStatsData, lines: number[][]) {
        super();
        this.beginFill(betPanelColor, 0.9);
        this.drawRect(0, 0, gameWidth, BetPanel.MARGIN);

        this.betList = bets;
        this.userBalance = userStats.balance.toFixed(2);        
        this.balance = new Balance(Number(this.userBalance), this);
        this.betSelector = new BetSelector(this);
        this.lines = new Lines(this, lines);
        this.winAmount = new WinAmountView(this);
        this.playButton = new PlayButton(this);
        this.setup(reelContainer);
    }

    setup(reelContainer: ReelContainer):void {
        this.addChild(this.balance);
        this.addChild(this.betSelector);
        this.addChild(this.lines)
        this.addChild(this.winAmount)
        this.addChild(this.playButton);
        this.x = reelContainer.x - symbolSize / 3;
        this.y = reelContainer.y + symbolSize * 3 * 1.2;
        this.lineStyle(20, 0xFEEB77, 1);
        this.beginFill(0xFFF, 0);
        this.drawRoundedRect(0, 0, gameWidth, BetPanel.MARGIN, 16);
    }

    addListenerToPlayButton(fn:any, context:any) {
        this.playButton.on('click', fn, context);
    }

    updateBalance(newBalance:number):void {
        this.balance.updateBalance(newBalance);
    }

    public getBetValue(): number {
        const betIndex = this.betList.findIndex(bet => bet.id === this.selectedBetId);
        return this.betList[betIndex].value;
    }


}
