import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";
import BetPanel from "app/slotMachine/betPanel/BetPanel";
import { TScatterWin, TWin } from "app/service/typing";

const lines = [[0,0,0,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,1,1,1,1],[0,1,1,1,2],[2,1,1,1,1],[2,1,0,1,2],[0,1,2,1,0]];
const colors = [0xAEAEAE, 0x3A66B1, 0xD7090B, 0x10AEC9, 0xF6B900, 0xEF7D9E, 0xFFF, 0x000];

export default class WinPresentationControl {
    private reelContainer: ReelContainer;
    private betPanel: BetPanel;
    constructor(reelContainer: ReelContainer, betPanel:BetPanel) {
        this.reelContainer = reelContainer;
        this.betPanel = betPanel;
    }

    async displayAllWins(scatterWins:TScatterWin[], lineWins:TWin[] ): Promise<void>{
        await sleep(1000);
        for (const lineWin of lineWins) {
            await this.displayLineWin(lineWin);
        }
        
        for (const scatterWin of scatterWins) {
            await this.displayScatterWin(scatterWin);
        }
    }
    async displayLineWin(lineWin:TWin): Promise<void>{
        this.reelContainer.fadeAll();
        for (let i = 0; i < lineWin.symbolsAmount; i++) {
            this.reelContainer.reels[i].highlight(lines[lineWin.lineId][i]);
            await sleep(50);
        }
        this.reelContainer.linesContainer.display(lines[lineWin.lineId], colors[lineWin.lineId]);
        this.betPanel.winAmount.setWinAmount(lineWin.win * this.betPanel.betList[this.betPanel.selectedBetId-1].value);

        await sleep(1000);
        this.reelContainer.linesContainer.removeChildren();
        this.reelContainer.resetAll();
        
        console.log(lineWin);
        
    }

    async displayScatterWin(scatterWin:TScatterWin): Promise<void>{
        this.reelContainer.fadeAll();        
        for (let i = 0; i < scatterWin.symbols.length; i++) {
            this.reelContainer.reels[scatterWin.symbols[i].x].highlight(scatterWin.symbols[i].y);
            await sleep(50);
        }
        this.betPanel.winAmount.setWinAmount(scatterWin.win * this.betPanel.betList[this.betPanel.selectedBetId-1].value);
        this.reelContainer.resetAll();
    }
  
  
}

function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}