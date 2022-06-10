import { Container } from "@pixi/display";
import { Sprite } from '@pixi/sprite';
import { gameSize } from "app/Main";
import Reel from "./reel/Reel";
import returnSlotTexture from "../returnSlotTexture/returnSlotTexture";

export default class ReelContainer extends Container {
    static REEL_WIDTH: number = 160;
    static SYMBOL_SIZE: number = 150;
    private _reels: Reel[];
    private _reelsCount: number;
    private _symbolsCount: number;
    constructor() {
        super();
        this._reels = [];
        this.x = gameSize.centerPosition.x - 160 * 2.5;
        this.y = 250;
        this._reelsCount = 5;
        this._symbolsCount = 3;
        this.buildReels();
    }

    public buildReels(): void {  
        for (let i = 0; i < this._reelsCount; i++) {
            const rc = new Container();
            rc.x = i * ReelContainer.REEL_WIDTH;
            this.addChild(rc);

            const reel = new Reel(rc);
            
            for (let j = 0; j < this._symbolsCount; j++) {
                const symbol = new Sprite(returnSlotTexture(randomIntegerFromOneToEight()));
                
                symbol.y = j * ReelContainer.SYMBOL_SIZE;
                symbol.scale.x = symbol.scale.y = Math.min(ReelContainer.SYMBOL_SIZE / symbol.width, ReelContainer.SYMBOL_SIZE / symbol.height);
                symbol.x = Math.round((ReelContainer.SYMBOL_SIZE - symbol.width) / 2);
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