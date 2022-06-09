import { Container, Sprite, filters } from "pixi.js";

export default class Reel {
    private _container: Container;
    private _symbols: Sprite[];
    private _position: number;
    private _previousPosition: number;
    // private blur: filters: 
    constructor() {
        this._container = new Container();
        this._symbols = [];
        this._position = 0;
        this._previousPosition = 0;
        // this.blur = new filters.BlurFilter(),
    }

    public get position(): number {
        return this._position;
    }

    public set position(newPosition:number) {
        this._position = newPosition;
    }
    
    spawnReels() {
        
    }
    
}