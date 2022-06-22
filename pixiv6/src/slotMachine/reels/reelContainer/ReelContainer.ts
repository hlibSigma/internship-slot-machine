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
        this.buildReels(symbols);

        this.linesContainer = new LinesContainer(this);
        this.addChild(this.linesContainer);
        // this.linesContainer.display([1,0,0,0,1],);
    }

    public buildReels(symbols:TSymbols[]): void {  
        for (let i = 0; i < reelsCount; i++) {
            const rc = new Container();
            rc.x = i * (reelWidth * 1.1);
            this.addChild(rc);

            const reel = new Reel(rc, symbols, this.strips[i]);
            
            reel.buildReel(this.getRandomReelFromStrip(this.strips[i]));

            this.reels.push(reel);
        }
    }

    public updateReels(reelWindow:TReelWindow): void {
        for (let i = 0; i < reelWindow.length; i++) {
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
            for (let i = 0; i < reel.symbols.length; i++) {
                reel.setSymbolAnimation(i, 3);
            } 
        }
    }

    public resetAll():void{
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i++) {
                reel.setSymbolAnimation(i, 0);
            } 
        }
    }

    startSpin():void {
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i++) {
                reel.StartSpin();
            } 
        }
        
    }

    getRandomReelFromStrip(strip: number[]): TReel {
        const firstSymbolPosition = randomInteger(0, strip.length);

        if (firstSymbolPosition >= strip.length - 1) {
            return [
                strip[firstSymbolPosition],
                strip[0],
                strip[1]
            ];
        } else if (firstSymbolPosition >= strip.length - 2){
            return [
                strip[firstSymbolPosition],
                strip[firstSymbolPosition + 1],
                strip[0]
            ];
        } else {
            return [
                strip[firstSymbolPosition],
                strip[firstSymbolPosition + 1],
                strip[firstSymbolPosition + 2]
            ];
        }
    }

    async stopSpin():Promise<void> {
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i++) {
                await sleep(200);
                reel.stopReel();
            } 
        }
    }

}

function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInteger(min: number, max: number): number {
    //max not included
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

