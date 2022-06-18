import { Container } from "@pixi/display";
import { gameSize } from "app/Main";
import SpineControl from "app/controls/SpineControl";
import Reel from "./reel/Reel";
import { config } from "app/slotMachine/config/config";
import { TInitResponse, TReel, TReelWindow, TSymbols } from "app/service/typing";
import LinesContainer from "./LinesContainer";
const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;

export default class ReelContainer extends Container {
    private spineSymbols: SpineControl[] = [];
    public reels: Reel[];
    public linesContainer:LinesContainer;
   
    constructor(symbols:TSymbols[]) {
        super();
        this.reels = [];
        this.x = gameSize.centerPosition.x - symbolSize * 2.5;
        this.y = 250;
        this.buildReels([1, 1, 1], symbols);

        this.linesContainer = new LinesContainer(this);
        this.addChild(this.linesContainer);
        // this.linesContainer.display([1,0,0,0,1],);
    }

    public buildReels(reel:TReel, symbols:TSymbols[]): void {  
        for (let i = 0; i < reelsCount; i++) {
            const rc = new Container();
            rc.x = i * reelWidth + reelWidth / 2;
            this.addChild(rc);

            const reel = new Reel(rc, symbols);
            
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

    public fadeAll(){
        for (const reel of this.reels) {
            for (const symbol of reel.symbols) {
                symbol.scale.set(0.5);
            } 
        }
    }

    public resetAll(){
        for (const reel of this.reels) {
            for (const symbol of reel.symbols) {
                symbol.scale.set(1);
            } 
        }
    }

}


