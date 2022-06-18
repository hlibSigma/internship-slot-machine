import { Container } from '@pixi/display';
import SpineLoader from "app/loader/SpineLoader";
import { Spine } from "@pixi-spine/all-4.0";
import { TReel, TSymbols } from 'app/service/typing';
import { config } from "app/slotMachine/config/config";

const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;


export default class Reel extends Container {

    public symbols: Spine[];
    private container: Container;
    private symbolsInfo:TSymbols[];
    constructor(container: Container, symbols:TSymbols[]) {
        super();
        this.symbols = [];
        this.symbolsInfo = symbols;
        this.container = container;
    }

    public buildReel(reel: TReel): void {
        for (let i = 0; i < reel.length; i += 1) {
            const symbol = this.getSpineSymbol(0, i * symbolSize + symbolSize / 2);
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

    protected getSpineSymbol(x: number = 0, y: number = 0):Spine  {
        const spineSymbol = SpineLoader.getSpine('symbols');
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
        this.symbols[symbolId].scale.set(1.5);
        await sleep(1000);
        this.symbols[symbolId].scale.set(1);
    }
   

}

function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}