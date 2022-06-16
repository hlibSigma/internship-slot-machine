import { Container } from "@pixi/display";
import { gameSize } from "app/Main";
import SpineControl from "app/controls/SpineControl";
import Reel from "./reel/Reel";
import { config } from "app/slotMachine/config/config";
import { TReel, TReelWindow } from "app/service/typing";
const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;

export default class ReelContainer extends Container {
    private spineSymbols: SpineControl[] = [];
    private reels: Reel[];
   
    constructor() {
        super();
        this.reels = [];
        this.x = gameSize.centerPosition.x - symbolSize * 2.5;
        this.y = 250;
        this.buildReels([1, 1, 1]);
    }

    public buildReels(reel:TReel): void {  
        for (let i = 0; i < reelsCount; i++) {
            const rc = new Container();
            rc.x = i * reelWidth;
            this.addChild(rc);

            const reel = new Reel(rc);
            
            reel.buildReel([1, 7, 3]);

            this.reels.push(reel);
        }
    }

    public updateReels(reelWindow:TReelWindow): void {
        for (let i = 0; i < reelWindow.length; i += 1) {
            const reel = reelWindow[i];
            this.reels[i].updateReels(reel);
        }
    }

    protected getSpineSymbol(x:number = 0, y:number = 0):SpineControl {
        let spineControl = new SpineControl("symbols");
        spineControl.container.position.set(x, y);
        return spineControl;
    }

}


