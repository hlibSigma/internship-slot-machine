import { Container } from "@pixi/display";
import { BitmapText } from "@pixi/text-bitmap";


export default class Balance extends Container {
    private value: number;
    private balanceText: BitmapText;
    bitmapText: BitmapText;
    constructor(initialValue: number) {
        super();
        this.value = initialValue;
        this.bitmapText = new BitmapText('balance', {
                fontName: "sans-serif", fontSize: 12
        })
        this.balanceText = new BitmapText(`${this.value}`,
            {
                fontName: "sans-serif", fontSize: 12
        });
        
        this.setup();
    }

    setup(): void {
        this.position.set(500, 600)
        this.addChild(this.bitmapText);
        this.addChild(this.balanceText);
    }

    updateBalance(newScore: number): void {
        this.value = newScore;
        this.balanceText.text = `${this.value}`;
    }
}