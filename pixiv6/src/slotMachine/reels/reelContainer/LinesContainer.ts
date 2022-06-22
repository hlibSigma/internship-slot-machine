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
        console.log(lines);
        
        
        const graphics = new Graphics();
        this.addChild(graphics);
        graphics.lineStyle({
            width: 6,
            color: color,
            cap: LINE_CAP.ROUND
        })
        graphics.moveTo(this.ReelContainer.children[0].position._x+4, this.ReelContainer.reels[0].symbols[lines[0]].position._y+4);
        for (let i = 1; i < lines.length; i++) {
            
            graphics.lineTo(this.ReelContainer.children[i+1].position._x+2, this.ReelContainer.reels[i].symbols[lines[i]].position._y+2)
            
            
        }
        console.log(this.children.length);
        
    }
    removeLines():void{
        this.removeChildren();
    }


}
