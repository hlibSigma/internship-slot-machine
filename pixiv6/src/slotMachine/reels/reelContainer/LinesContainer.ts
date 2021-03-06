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

    display(lines:number[], color:number, xplus:number = 5):void {       
        
        const graphics = new Graphics();
        this.addChild(graphics);
        graphics.lineStyle({
            width: 10,
            color: color,
            cap: LINE_CAP.ROUND
        })        
        graphics.moveTo(this.ReelContainer.reelsParentContainer.children[0].x+5, this.ReelContainer.reels[0].symbols[lines[0]].position._y+xplus);
        for (let i = 1; i < lines.length; i++) {
            graphics.lineTo(this.ReelContainer.reelsParentContainer.children[i].x+5, this.ReelContainer.reels[i].symbols[lines[i]].position._y+xplus)
        }
        
    }
    removeLines():void{
        this.removeChildren();
    }


}
