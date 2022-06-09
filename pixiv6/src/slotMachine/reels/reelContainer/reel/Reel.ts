import { Sprite } from '@pixi/sprite';
import { Container } from "@pixi/display";

export default class Reel {
    private _symbols: Sprite[];
    private _position: number;
    private _previousPosition: number;
    private _container: Container;
    constructor(container: Container) {
        this._symbols = [];
        this._position = 0;
        this._previousPosition = 0;
        this._container = container;
    }

    public get position(): number {
        return this._position;
    }

    public set position(newPosition:number) {
        this._position = newPosition;
    }

    public updateSymbols(newSymbol: Sprite) {
        this._symbols.push(newSymbol);
    }

}