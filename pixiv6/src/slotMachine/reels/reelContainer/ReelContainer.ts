import { Container } from "@pixi/display";
import { Sprite } from '@pixi/sprite';
import { gameSize } from "app/Main";
import Reel from "./reel/Reel";
import returnSlotTexture from "../returnSlotTexture/returnSlotTexture";
import { config } from "app/slotMachine/config/config";
const { reelsCount, symbolsCount, symbolSize, reelWidth } = config;

export default class ReelContainer extends Container {
    private _reels: Reel[];
   
    constructor() {
        super();
        this._reels = [];
        this.x = gameSize.centerPosition.x - symbolSize * 2.5;
        this.y = 250;
        this.buildReels();
    }

    public buildReels(): void {  
        for (let i = 0; i < reelsCount; i++) {
            const rc = new Container();
            rc.x = i * reelWidth;
            this.addChild(rc);

            const reel = new Reel(rc);
            
            for (let j = 0; j < symbolsCount; j++) {
                const symbol = new Sprite(returnSlotTexture(randomIntegerFromOneToEight()));
                
                symbol.y = j * symbolSize;
                symbol.scale.x = symbol.scale.y = Math.min(symbolSize / symbol.width, symbolSize / symbol.height);
                symbol.x = Math.round((symbolSize - symbol.width) / 2);
                reel.updateSymbols(symbol);
                rc.addChild(symbol);
            }

            this.updateReels(reel);
        }
    }

    public updateReels(reel: Reel):void {
        this._reels.push(reel);
    }

}

//just to spawn different symbols, should be deleted after 

function randomIntegerFromOneToEight():number {
    const rand = 1 + Math.random() * (8 + 1 - 1);
    
  return Math.floor(rand);
}