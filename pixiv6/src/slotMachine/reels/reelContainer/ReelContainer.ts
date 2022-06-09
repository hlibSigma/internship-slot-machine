import { filters, Loader, Texture } from "pixi.js";
import { Container } from "@pixi/display";
import { Sprite } from '@pixi/sprite';

// import { slotTextures } from "../slotTextures/SlotTextures";
import Reel from "./reel/Reel";

const REEL_WIDTH = 160;
const SYMBOL_SIZE = 150;

export default class ReelContainer extends Container {
    // static REEL_WIDTH: number = 160;
    // static SYMBOL_SIZE: number = 150;
    // private slotTextures = slotTextures;
    constructor() {
        super();

        this.setup();
    }

    setup(): void {
        this.width = 1920;
        this.height = 1080;
        const bg = Sprite.from(Texture.WHITE);
        bg.width =  this.width ;
        bg.height = this.height ;
        bg.tint = 0xff0000;
        this.addChild(bg);
    }

    buildReels():void {
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
                
        //         symbol.y = j * SYMBOL_SIZE;
        //         symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
        //         symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
        //         reel.symbols.push(symbol);
        //         rc.addChild(symbol);
        //     }
        //     reels.push(reel);
        // }
    }

}