import { Texture } from 'pixi.js';
import {Loader} from "@pixi/loaders";
import symbols from '../symbols/symbols';

export default function returnSlotTexture(id: number) {
    const symbol = symbols.find(symbol => symbol.id === id);
    
    if (symbol) {
        const { name } = symbol;
        return Texture.from(Loader.shared.resources[name].url);
    }
}