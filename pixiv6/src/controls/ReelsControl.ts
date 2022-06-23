import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";
import BetPanel from "app/slotMachine/betPanel/BetPanel";
import {  TSpinResponse } from "app/service/typing";
import { GameController } from "app/controllers/GameControllerRestController";
import WinPresentationControl from "./WinPresentationControl";

export default class ReelsControl {
    private reelContainer: ReelContainer;
    private status:string;
    private betPanel: BetPanel;
    private apiService: GameController;
    private response:TSpinResponse | null = null;
    private winPresentation:WinPresentationControl;

    constructor(reelContainer: ReelContainer, betPanel:BetPanel) {
        this.betPanel = betPanel;
        this.status = "ready";
        this.reelContainer = reelContainer;
        this.apiService = new GameController();
        this.winPresentation = new WinPresentationControl(this.reelContainer, this.betPanel);
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
        this.betPanel.hideWin();
        this.reelContainer.resetAll();
        this.betPanel.winAmountView.resetWinAmountText();
        this.reelContainer.linesContainer.removeChildren();
        
        
        this.reelContainer.startSpin();
        this.betPanel.playButton.setInactive("Stop");
        this.status = "getting server info"
        const betId =  this.betPanel.selectedBetId;
        this.response = await this.apiService.spin(betId);
        this.betPanel.playButton.setActive();
        console.log("got response");
        this.status = "spinning";
        
        await sleep(3000);
        this.stopSpin(this.response)
    }

    
    async stopSpin(response:TSpinResponse): Promise<void> {
        //stopping the all reels and show final reel view
        if (this.status == "spinning" && response !== null) {     
            this.betPanel.playButton.setInactive();      
            this.status = "win-presentation";

            await this.reelContainer.stopSpin(response.userStats.reelStops);
            await sleep(400);
            this.reelContainer.borderBack();
            if (response.totalWin > 0) {
                await this.winPresentation.displayAllWins(response);
            }
            this.betPanel.playButton.setActive("Spin");   
            this.status = "ready";
            const currentBalance = response.userStats.balance;
            const totalWinAmount = response.totalWin;
            this.betPanel.updateBalance(currentBalance);
            this.betPanel.winAmountView.setWinAmount(totalWinAmount);
           
            console.log("end");
            
        }
        
    }
    
}


function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}