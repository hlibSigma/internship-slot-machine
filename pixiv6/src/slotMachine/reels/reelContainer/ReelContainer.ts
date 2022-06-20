import { Container } from "@pixi/display";
import { gameSize } from "app/Main";
import SpineControl from "app/controls/SpineControl";
import Reel from "./reel/Reel";
import { config } from "app/slotMachine/config/config";
import { TInitResponse, TReel, TReelWindow, TSpinResponse, TSymbols } from "app/service/typing";
import LinesContainer from "./LinesContainer";
const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;

export default class ReelContainer extends Container {
    private spineSymbols: SpineControl[] = [];
    private strips: number[][];
    public reels: Reel[];
    public linesContainer:LinesContainer;
    running: Boolean;
    constructor(symbols:TSymbols[], strips: number[][]) {
        super();
        this.reels = [];
        this.strips = strips;
        this.running = false;
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
            rc.x = i * (reelWidth * 1.1);
            this.addChild(rc);

            const reel = new Reel(rc, symbols, this.strips[i]);
            
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

    public fadeAll():void{
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i += 1) {
                reel.setSymbolAnimation(i, 3);
            } 
        }
    }

    public resetAll():void{
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i += 1) {
                reel.setSymbolAnimation(i, 0);
            } 
        }
    }

    startSpin():void {
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i += 1) {
                reel.setSymbolAnimation(i, 1);
            } 
        }
        
    }

}


