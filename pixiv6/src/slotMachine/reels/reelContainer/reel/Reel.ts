import { Container } from '@pixi/display';
import Timeline from "gsap/gsap-core";
import SpineLoader from "app/loader/SpineLoader";
import { Spine } from "@pixi-spine/all-4.0";
import { TReel, TSymbols } from 'app/service/typing';
import { config } from "app/slotMachine/config/config";

const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;


export default class Reel extends Container {

    public symbols: Spine[];
    private container: Container;
    private symbolsInfo: TSymbols[];
    private strip: number[];
    private readonly animations = [
        "idle",
        "win",
        "land",
        "dim",
        "undim",
    ];

    constructor(container: Container, symbols: TSymbols[], strip: number[]) {
        super();
        this.symbols = [];
        this.strip = strip;
        this.symbolsInfo = symbols;
        this.container = container;
    }

    public buildReel(reel: TReel): void {
        for (let i = 0; i < reel.length; i += 1) {
            const symbol = this.getSpineSymbol(0, i * (symbolSize * 1.2));
            const symbolName = this.getSymbolNameById(reel[i]);
            symbol.skeleton.setSkinByName(symbolName);
            this.symbols.push(symbol);
            this.container.addChild(symbol);
        }
    }

    public updateReels(reel: TReel): void {
        for (let i = 0; i < reel.length; i += 1) {
            const symbolName = this.getSymbolNameById(reel[i]);
            this.symbols[i].skeleton.setSkinByName(symbolName); 
        }
    }

    protected getSpineSymbol(x: number = 0, y: number = 0): Spine {
        const spineSymbol = SpineLoader.getSpine('symbols');
        spineSymbol.width = symbolSize;
        spineSymbol.height = symbolSize;
        spineSymbol.position.set(x, y);
        return spineSymbol;
    }

    protected getSymbolNameById(id: number):string {
        const symbolIndex = this.symbolsInfo.findIndex(symbol => symbol.id === id);
        const symbol = this.symbolsInfo[symbolIndex];
        const { name } = symbol;

        return name.toLowerCase();       
    }

    async highlight(symbolId:number): Promise<void>{
        this.setSymbolAnimation(symbolId, 1);
        await sleep(2000);
        this.setSymbolAnimation(symbolId, 0);
    }

    setSymbolAnimation(symbolId:number, animationIndex:number):void {
        this.symbols[symbolId].state.setAnimation(0, this.animations[animationIndex], true);

    }


}

function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}