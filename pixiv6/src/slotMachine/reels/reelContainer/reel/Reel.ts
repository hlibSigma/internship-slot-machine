import { Container } from '@pixi/display';
import Timeline from "gsap/gsap-core";
import SpineLoader from "app/loader/SpineLoader";
import { Spine } from "@pixi-spine/all-4.0";
import { TReel, TSymbols } from 'app/service/typing';
import { config } from "app/slotMachine/config/config";
import { Main } from 'app/Main';

const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;


export default class Reel extends Container {

    public symbols: Spine[];
    private container: Container;
    private symbolsInfo: TSymbols[];
    private strip: number[];
    private speed: number;
    private stripeindex:number;
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
        this.speed = 0;
        this.stripeindex = Math.floor(Math.random()*this.strip.length);
        Main.APP.ticker.add(dt => {
            this.Spin(dt, this.speed);
        });
    }

    

    public buildReel(reel: TReel): void {
        
        for (let i = 0; i < 4; i++) {
            this.addNewSymbol(i * symbolSize * 1.2);            
        }
        
    }

    addNewSymbol(ypos:number):void {
        this.nextStripeIndex();
        const symbol = this.getSpineSymbol(0, ypos);
        const symbolName = this.getSymbolNameById(this.strip[this.stripeindex]);
        symbol.skeleton.setSkinByName(symbolName);
        this.symbols.push(symbol);
        this.container.addChild(symbol);
    }

    public updateReels(reel: TReel): void {
        for (let i = 0; i < reel.length; i++) {
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

    nextStripeIndex():void {
        this.stripeindex++;
        if (this.stripeindex>=this.strip.length) {
            this.stripeindex = 0;
        }
    }

    StartSpin():void  {
        this.speed = 10;
    }

    async Stopreel():Promise<void> {
        this.speed = 0;

    }

    Spin(delta:number, speed:number):void {
        //console.log(this.symbols[0].position);
        
        for (const symbol of this.symbols) {
            symbol.position.y -= delta*speed;
        }
        const difference = 1.2 * symbolSize + this.symbols[0].position.y

        
        if ( difference <= 0) {
            this.container.removeChild(this.symbols[0]);
            this.symbols.splice(0,1);
            if (this.symbols.length < 4) {
                this.addNewSymbol(3 * symbolSize* 1.2 + difference);
            } 
            
        }
    }
}

function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}