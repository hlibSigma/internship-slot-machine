import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";
import BetPanel from "app/slotMachine/betPanel/BetPanel";
import { TScatterWin, TSpinResponse, TWin } from "app/service/typing";
import gameModel from "app/model/GameModel";

const colors = [0xAEAEAE, 0x3A66B1, 0xD7090B, 0x10AEC9, 0xF6B900, 0xEF7D9E, 0xFFF, 0x000];



export default class WinPresentationControl {
    private lines:number[][];
    private reelContainer: ReelContainer;
    private betPanel: BetPanel;
    constructor(reelContainer: ReelContainer, betPanel: BetPanel) {
        this.reelContainer = reelContainer;
        this.betPanel = betPanel;
        this.lines = gameModel.initResponse!.lines;
    }

    async displayAllWins(spinResponse: TSpinResponse): Promise<void> {
        
        const { wins: lineWins, scatterWins } = spinResponse;
        await sleep(1000);
        for (const lineWin of lineWins) {
            await this.displayLineWin(lineWin);
            await sleep(1000);
        }

        for (const scatterWin of scatterWins) {
            await this.displayScatterWin(scatterWin);
            await sleep(1000);
        }

        
    }
    async displayLineWin(lineWin: TWin): Promise<void> {
        if (this.lines !== undefined) {
            this.reelContainer.fadeAll();
            for (let i = 0; i < lineWin.symbolsAmount; i++) {
                this.reelContainer.reels[i].highlight(this.lines[lineWin.lineId][i]);
                await sleep(300);
            }
            this.betPanel.winAmount.createWinCounterAnimation(lineWin.win * this.betPanel.betList[this.betPanel.selectedBetId - 1].value, sleep);
            await sleep(1500);
            this.reelContainer.linesContainer.display(this.lines[lineWin.lineId], colors[lineWin.lineId]);        
            
            await sleep(1500);
            this.reelContainer.linesContainer.removeChildren();
            this.reelContainer.resetAll(); //test
            console.log(lineWin);
        }

    }

    async displayScatterWin(scatterWin: TScatterWin): Promise<void> {
        this.reelContainer.fadeAll();
        for (let i = 0; i < scatterWin.symbols.length; i++) {
            this.reelContainer.reels[scatterWin.symbols[i].x].highlight(scatterWin.symbols[i].y);
            await sleep(300);
        }
        await sleep(2500);
        // this.betPanel.winAmount.createWinCounterAnimation(scatterWin.win * this.betPanel.betList[this.betPanel.selectedBetId - 1].value);
        this.betPanel.winAmount.createWinCounterAnimation(scatterWin.win * this.betPanel.betList[this.betPanel.selectedBetId - 1].value, sleep);
        this.reelContainer.resetAll();  //test
    }


}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}