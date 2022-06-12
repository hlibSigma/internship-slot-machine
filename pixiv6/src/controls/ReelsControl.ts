import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";
import BetPanel from "app/slotMachine/betPanel/BetPanel";
// import RequestService from "app/service/RequestService";

export default class ReelsControl {
    private reelContainer: ReelContainer;
    private status:string;
    private betPanel:BetPanel;
    constructor(reelContainer: ReelContainer, betPanel:BetPanel) {
        this.betPanel = betPanel;
        this.status = "ready";
        this.reelContainer = reelContainer;
    }

    buttonClick(): void{ 
        //just changes the symbols to test it out
        
        console.log(this.status,"---");
        
        if (this.status == "spinning") {
            this.stopSpin();
        } else if (this.status == "ready") {
            this.startSpin();
        }
    }

    async startSpin(): Promise<void>{
        this.status = "getting server info"
        console.log("start");
        await sleep(1000);
        console.log("got response");
        this.status = "spinning"
        await sleep(2000);
        this.stopSpin()
    }

    
    stopSpin(): void{
        //stopping the all reels 
        if (this.status == "spinning") {
            this.reelContainer.buildReels();
            this.status = "ready"
            this.betPanel.updateBalance(1234234);
            console.log(this.betPanel.selectedBetId);
            
            console.log("end");
        }
        
    }
    
}

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
