import { filters, Loader, Texture } from "pixi.js";
import { Container } from "@pixi/display";
import { Sprite } from '@pixi/sprite';
//to do: add images to reels
//import { slotTextures } from "../slotTextures/SlotTextures";
import Reel from "./reel/Reel";


export default class ReelsContainer extends Container {
    static REEL_WIDTH: number = 160;
    static SYMBOL_SIZE: number = 150;
    constructor() {
        super();

        this.setup();
    }

    setup(): void {
        //this was just to see if it works, so it needs to be deleted after adding all necessary functionality
        // this.width = 1920;
        // this.height = 1080;
        // const bg = Sprite.from(Texture.WHITE);
        // bg.width =  this.width ;
        // bg.height = this.height ;
        // bg.tint = 0xff0000;
        // this.addChild(bg);
    }

    buildReels(): void {
        //to do: build reels From reel class

        // const reels = [];
        // for (let i = 0; i < 5; i++) {
        //     const rc = new Container();
        //     rc.x = i * REEL_WIDTH;
        //     this.addChild(rc);

        //     const reel = new Reel();
        //     // reel.blur.blurX = 0;
        //     // reel.blur.blurY = 0;
        //     // rc.filters = [reel.blur];

        //     for (let j = 0; j < 4; j++) {
        //         const symbol = new Sprite(this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)]);
                
        //         symbol.y = j * ReelContainer.SYMBOL_SIZE;
        //         symbol.scale.x = symbol.scale.y = Math.min(ReelContainer.SYMBOL_SIZE / symbol.width, ReelContainer.SYMBOL_SIZE / symbol.height);
        //         symbol.x = Math.round((ReelContainer.SYMBOL_SIZE - symbol.width) / 2);
        //         reel.symbols.push(symbol);
        //         rc.addChild(symbol);
        //     }
        //     reels.push(reel);
        // }
    }

}