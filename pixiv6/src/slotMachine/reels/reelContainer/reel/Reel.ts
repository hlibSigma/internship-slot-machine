import { Sprite } from "pixi.js";
import { Container } from "@pixi/display";

export default class Reel {
    private _symbols: Sprite[];
    private _position: number;
    private _previousPosition: number;
    constructor() {
        this._symbols = [];
        this._position = 0;
        this._previousPosition = 0;
    }

    public get position(): number {
        return this._position;
    }

    public set position(newPosition:number) {
        this._position = newPosition;
    }
    
    spawnReels() {
        //to do next
    }
    
}