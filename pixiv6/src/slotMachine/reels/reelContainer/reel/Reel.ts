import { Sprite } from '@pixi/sprite';
import { Container } from '@pixi/display';
import SpineLoader from "app/loader/SpineLoader";
import { Spine } from "@pixi-spine/all-4.0";
import { TReel } from 'app/service/typing';
import SpineControl from 'app/controls/SpineControl';
import { symbols } from '../symbols';
import { config } from "app/slotMachine/config/config";

const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;


export default class Reel extends Container {
    private symbols: Spine[];
    private _position: number;
    private previousPosition: number;
    private container: Container;
    constructor(container: Container) {
        super();
        this.symbols = [];
        this.container = container;
        this._position = 0;
        this.previousPosition = 0;
    }

    public buildReel(reel: TReel): void {
        for (let i = 0; i < reel.length; i += 1) {
            const symbol = this.getSpineSymbol(0, i * symbolSize);
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

    protected getSpineSymbol(x: number = 0, y: number = 0)  {
        const spineSymbol = SpineLoader.getSpine('symbols');
        spineSymbol.position.set(x, y);
        return spineSymbol;
    }

    protected getSymbolNameById(id: number):string {
        const symbolIndex = symbols.findIndex(symbol => symbol.id === id);
        const symbol = symbols[symbolIndex];
        
            const { name } = symbol;
            return name.toLowerCase();
        

    }
}