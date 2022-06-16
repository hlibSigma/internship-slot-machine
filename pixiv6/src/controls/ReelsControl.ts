import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";
import BetPanel from "app/slotMachine/betPanel/BetPanel";
import { TSpinResponse } from "app/service/typing";
import { GameController } from "app/controllers/GameControllerRestController";

// import RequestService from "app/service/RequestService";
export default class ReelsControl {
    private reelContainer: ReelContainer;
    private status:string;
    private betPanel: BetPanel;
    private apiService: GameController;
    constructor(reelContainer: ReelContainer, betPanel:BetPanel) {
        this.betPanel = betPanel;
        this.status = "ready";
        this.reelContainer = reelContainer;
        this.apiService = new GameController();
    }

    buttonClick(): void{         
        console.log(this.status,"---");
        
        if (this.status == "spinning") {
            // this.stopSpin();
        } else if (this.status == "ready") {
            this.startSpin();
        }
    }

    async startSpin(): Promise<void>{
       
        this.status = "getting server info"
        const betId =  this.betPanel.selectedBetId;
        const response = await this.apiService.spin(betId);
        console.log("start");
        await sleep(1000);
        console.log("got response");
        this.status = "spinning"
        // opportunity to imitate spinning
        // await sleep(2000);
        this.stopSpin(response)
    }

    
     stopSpin(response:TSpinResponse) {
        //stopping the all reels and show final reel view
        if (this.status == "spinning") {
            this.reelContainer.updateReels(response.finalReelWindow);
            this.status = "ready";
            const currentBalance = response.userStats.balance;
            this.betPanel.updateBalance(currentBalance);
            console.log(this.betPanel.selectedBetId);
            console.log("end");
        }
        
    }
    
}

function sleep(ms:number):Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}