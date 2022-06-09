import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";

export default class ReelsControl {
    private _isRunning: boolean;
    private _reelContainer: ReelContainer;
    constructor(reelContainer: ReelContainer) {
        this._isRunning = false;
        this._reelContainer = reelContainer;
    }

    spin(): void{ 
        //just changes the symbols to test it out
        this._reelContainer.buildReels();
        this._isRunning = true;
    }
    
    stopSpin(): void{}
    
}