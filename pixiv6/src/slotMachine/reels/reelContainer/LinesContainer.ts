import { Container } from "@pixi/display";
import { Graphics, LINE_CAP } from "@pixi/graphics";
import ReelContainer from "./ReelContainer";


export default class LinesContainer extends Container {
    
    public linesContainer:Container = new Container();
    private ReelContainer:ReelContainer;
   
    constructor(ReelContainer:ReelContainer) {
        super();
        this.ReelContainer = ReelContainer;     
        
    }

    display(lines:number[],color:number):void {
        console.log(this.ReelContainer.width);
        console.log(this.ReelContainer.reels[2].symbols[2].position.y);
        console.log(this.ReelContainer.children[4].position._x);
        console.log();
        const graphics = new Graphics();
        this.addChild(graphics);
        graphics.lineStyle({
            width: 10,
            color: color,
            cap: LINE_CAP.ROUND
        })
        graphics.moveTo(this.ReelContainer.children[0].position._x+5, this.ReelContainer.reels[0].symbols[lines[0]].position._y+5);
        for (let i = 1; i < lines.length; i++) {
            
            graphics.lineTo(this.ReelContainer.children[i].position._x+5, this.ReelContainer.reels[i].symbols[lines[i]].position._y+5)
            
            
        }
        console.log(this.children.length);
        
    }
    removeLines():void{
        this.removeChildren();
    }


}
