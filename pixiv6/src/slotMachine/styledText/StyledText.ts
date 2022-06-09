import { Text } from "@pixi/text";
import { textStyle } from "app/slotMachine/styledText/textStyle";
    
export default class StyledText extends Text { 

    constructor(text:string) {
        super(text, textStyle);
    }
}