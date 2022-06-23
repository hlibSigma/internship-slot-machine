import { Container, DisplayObject } from '@pixi/display';
import Timeline from "gsap/gsap-core";
import SpineLoader from "app/loader/SpineLoader";
import { Spine } from "@pixi-spine/all-4.0";
import { TReel, TSymbols } from 'app/service/typing';
import { config } from "app/slotMachine/config/config";
import { Main } from 'app/Main';
import { log2 } from '@pixi/utils';
import { Graphics } from '@pixi/graphics';

const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;


export default class Reel extends Container {

    public symbols: Spine[];
    private container: Container;
    private symbolsInfo: TSymbols[];
    private strip: number[];
    private speed: number;
    private stripeindex:number;
    private status:number;
    private counter:number = 0;
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
        this.speed = 40;
        this.stripeindex = Math.floor(Math.random()*this.strip.length);
        this.status = 0;
        

        Main.APP.ticker.add(delta => {
            if (this.status == 1) {
                this.spin(delta, this.speed);
            } else if (this.status == 2) {
                this.spin(delta, this.speed);
            }
            
        });
       
        
        
        
        
    }

    createMask():void {
		let mask = new Graphics();
		mask.clear();
		mask.drawRect(-symbolSize*1.2/2,-symbolSize*1.21/2,symbolSize*1.2, symbolSize*3*1.21);        
		this.container.mask = mask;
		this.container.addChild(mask);
        for (const symbol of this.symbols) {
            symbol.scale.set(1);
        }
        
	}

    removeMask():void {
        this.container.removeChild(<DisplayObject>this.container.mask)
        
        this.container.mask  = null;
        for (let index = 0; index < this.symbols.length; index++) {
            if (index > 2) {
                this.symbols[index].scale.set(0);
            }
            
        }
    }

    public buildReel(reel: TReel): void {
        
        for (let i = 0; i < 4; i++) {
            this.addNewSymbol(i * symbolSize * 1.2); 
                       
        }
        this.removeMask();
        
    }

    addNewSymbol(ypos:number):void {
        const symbol = this.getSpineSymbol(0, ypos);
        const symbolName = this.getSymbolNameById(this.strip[this.stripeindex]);
        symbol.skeleton.setSkinByName(symbolName);
        symbol.state.setAnimation(0, this.animations[0], true);
        this.symbols.push(symbol);
        this.container.addChild(symbol);
        this.nextStripeIndex(1);
        
    }

    protected getSpineSymbol(x: number = 0, y: number = 0): Spine {
        const spineSymbol = SpineLoader.getSpine('symbols');
        spineSymbol.width = symbolSize;
        spineSymbol.height = symbolSize;
        spineSymbol.position.set(x, y);
        return spineSymbol;
    }

    protected getSymbolNameById(id: number):string {
        const symbolIndex = this.symbolsInfo.findIndex(symbol => symbol.id == id);
        const symbol = this.symbolsInfo[symbolIndex];
        try {
            const { name } = symbol;
            return name.toLowerCase();    
        } catch (error) {
            console.log(this);
            console.error(error);
            console.log("this.symbolsInfo:");
            console.log(this.symbolsInfo);
            console.log("symbolIndex:"+symbolIndex);
            console.log("id:"+id);
            console.log(this.strip);
            console.log(this.stripeindex);
            
            
            return "name.toLowerCase()"; 
        } 
        

           
    }

    async highlight(symbolId:number): Promise<void>{
        this.setSymbolAnimation(symbolId, 1, false);
        this.symbols[symbolId].scale.set(1.1);
        await sleep(1700);
        this.setSymbolAnimation(symbolId, 0, true);
    }

    setSymbolAnimation(symbolId:number, animationIndex:number, loop:boolean = true):void {
        this.symbols[symbolId].state.setAnimation(1, this.animations[animationIndex], loop);

    }

    nextStripeIndex(change:number):void {
        this.stripeindex += change;
        if (this.stripeindex >= this.strip.length) {
            this.stripeindex = 0;
        } else if (this.stripeindex < 0) {
            this.stripeindex = this.strip.length - 1;
        }
    }

    startSpin():void  {
        this.speed = 30;
        this.status = 1;
        this.createMask();
    }

    async stopReel(reelstopid:number):Promise<void> {
        this.status = 2;
        this.speed = 10;
        if (reelstopid == 0) {
            this.stripeindex = this.strip.length-1;
        } else {
            this.stripeindex = reelstopid-1;
        }
    }

    spin(delta:number, speed:number):void {      
        for (const symbol of this.symbols) {
            symbol.position.y -= delta*speed;
        }
        const difference = 1.2 * symbolSize + this.symbols[0].position.y

        //console.log(difference);
        
        if ( difference <= 0) {
            this.container.removeChild(this.symbols[0]);
            this.symbols.splice(0,1);
            if (this.symbols.length < 4) {
                this.addNewSymbol(3 * symbolSize* 1.2 + difference);
            } 
            if (this.status == 2) {
                this.counter++
                if (this.counter > 4) {
                    this.status = 0;
                    this.counter = 0;
                    for (const symbol of this.symbols) {
                        symbol.position.y -= difference;
                    }
                    this.removeMask();
                }
            }
            
        }
    }

    
}

function sleep(ms:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function easeOutQuint(x: number): number {
    return 1 - Math.pow(1 - x, 5);
}