import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";
import BetPanel from "app/slotMachine/betPanel/BetPanel";
import { TInitResponse, TSpinResponse } from "app/service/typing";
import { GameController } from "app/controllers/GameControllerRestController";
import WinPresentatinControl from "./WinPresentatinControl";

export default class ReelsControl {
    private reelContainer: ReelContainer;
    private status:string;
    private betPanel: BetPanel;
    private apiService: GameController;
    private response:TSpinResponse | null = null;
    private winPresentatin:WinPresentatinControl;

    constructor(reelContainer: ReelContainer, betPanel:BetPanel) {
        this.betPanel = betPanel;
        this.status = "ready";
        this.reelContainer = reelContainer;
        this.apiService = new GameController();
        this.winPresentatin = new WinPresentatinControl(this.reelContainer, this.betPanel);
    }

    buttonClick(): void{         
        console.log(this.status,"---");
        
        if (this.status == "spinning" && this.response !== null) {
            this.stopSpin(this.response);
        } else if (this.status == "ready") {
            this.startSpin();
        }
    }

   

    async startSpin(): Promise<void>{
        this.betPanel.playButton.setInactive("Stop");
        this.betPanel.spinning.setSpin(true);
        this.status = "getting server info"
        const betId =  this.betPanel.selectedBetId;
        this.response = await this.apiService.spin(betId);
        this.betPanel.playButton.setActive();
        console.log("got response");
        this.status = "spinning"
        await sleep(3000);
        this.stopSpin(this.response)
        
    }

    
    async stopSpin(response:TSpinResponse): Promise<void> {
        //stopping the all reels and show final reel view
        if (this.status == "spinning" && response !== null) {     
            this.betPanel.playButton.setInactive();      
            this.reelContainer.updateReels(response.finalReelWindow);
            this.status = "win-presentation";
            this.betPanel.spinning.setSpin(false);
            if (response.totalWin > 0) {
                await this.winPresentatin.displayAllWins(response.scatterWins, response.wins);
            }
            this.betPanel.playButton.setActive("Spin");   
            this.status = "ready";
            const currentBalance = response.userStats.balance;
            const totalWinAmount = response.totalWin;
            this.betPanel.updateBalance(currentBalance);
            this.betPanel.winAmount.setWinAmount(totalWinAmount);
            
            console.log(this.betPanel.selectedBetId);
            console.log("end");
            
        }
        
    }
    
}

function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//just to spawn different symbols, should be deleted after 

function randomIntegerFromOneToEight():number {
    const rand = 1 + Math.random() * (8 + 1 - 1);
    
  return Math.floor(rand);
}
