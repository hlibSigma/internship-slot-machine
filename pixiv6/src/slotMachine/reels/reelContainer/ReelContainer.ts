import { Container } from "@pixi/display";
import { gameSize } from "app/Main";
import SpineControl from "app/controls/SpineControl";
import Reel from "./reel/Reel";
import { config } from "app/slotMachine/config/config";
import { TInitResponse, TReel, TReelWindow, TSpinResponse, TSymbols } from "app/service/typing";
import LinesContainer from "./LinesContainer";
import { Graphics, LINE_CAP } from "@pixi/graphics";
const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;

export default class ReelContainer extends Container {
    private spineSymbols: SpineControl[] = [];
    private strips: number[][];
    public reels: Reel[];
    public reelsParentContainer = new Container();
    public linesContainer:LinesContainer;
    running: Boolean;
    public border:Graphics;
    constructor(symbols:TSymbols[], strips: number[][]) {
        super();
        let obj = new Graphics();
        obj.lineStyle(20, 0xE2F5EF, 1);
        obj.beginFill(0xE2F5EF);
        obj.drawRoundedRect(-symbolSize*1.2/2, -symbolSize*1.2/2, symbolSize*4*1.2 + symbolSize*1.2, symbolSize*2*1.2 + symbolSize*1.2, 16);
        this.addChild(obj);
        this.reels = [];
        this.strips = strips;
        this.running = false;
        this.x = gameSize.centerPosition.x - symbolSize * 2.5;
        this.y = 200;
        this.buildReels(symbols);
        this.border = new Graphics()
        this.linesContainer = new LinesContainer(this);

        this.border.lineStyle(20, 0xFEEB77, 1);
        this.border.beginFill(0xFFF, 0);
        this.border.drawRoundedRect(-symbolSize*1.2/2-10, -symbolSize*1.2/2-10, symbolSize*4*1.2 + symbolSize*1.2 +20, symbolSize*2*1.2 + symbolSize*1.2+20, 16);
        this.addChild(this.border);
        this.addChild(this.reelsParentContainer);
    }

    public buildReels(symbols:TSymbols[]): void {  
        for (let i = 0; i < reelsCount; i++) {
            const rc = new Container();
            rc.x = i * (reelWidth * 1.1);
            this.reelsParentContainer.addChild(rc);

            const reel = new Reel(rc, symbols, this.strips[i]);
            
            reel.buildReel(this.getRandomReelFromStrip(this.strips[i]));

            this.reels.push(reel);
        }
    }

    borderBack():void {
        this.removeChild(this.border);
        this.removeChild(this.linesContainer);
        this.removeChild(this.reelsParentContainer);
        this.addChild(this.border);
        this.addChild(this.reelsParentContainer);
        this.addChild(this.linesContainer);
        
    }

    protected getSpineSymbol(x:number = 0, y:number = 0):SpineControl {
        let spineControl = new SpineControl("symbols");
        spineControl.container.position.set(x, y);
        return spineControl;
    }

    public fadeAll():void{
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i++) {
                if (i<3) {
                    reel.setSymbolAnimation(i, 3, false);
                    reel.symbols[i].scale.set(0.7);
                }
                
            } 
        }
    }

    public resetAll():void{
        for (const reel of this.reels) {
            for (let i = 0; i < reel.symbols.length; i++) {
                if (i<3) {
                    reel.setSymbolAnimation(i, 4, false);
                    reel.symbols[i].scale.set(1);
                }
                
            } 
        }
    }

    startSpin():void {
        this.removeChild(this.border);
        this.addChild(this.border);
        for (const reel of this.reels) {
            reel.startSpin();
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

    async stopSpin(stops:number[]):Promise<void> {
        for (let i = 0; i < this.reels.length; i++) {
            await sleep(500);
            this.reels[i].stopReel(stops[i]); 
        }
        
    }

    createMask():void {
		let mask = new Graphics();
        const width = reelWidth * 5 + 60;
        const height = symbolSize * 3 * 1.2;
		mask.clear();
		mask.drawRect(-reelWidth/2, -symbolSize/2, width, height);
		
		this.mask = mask;
		this.addChild(mask);
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

