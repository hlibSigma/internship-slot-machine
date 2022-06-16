import { TextStyle } from "@pixi/text";

export const textStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
}); 

export const disabled = new TextStyle({
        dropShadow: true,
        dropShadowAngle: Math.PI / 6,
        dropShadowBlur: 4,
        dropShadowColor: "#000000",
        dropShadowDistance: 6,
        fill: [
                "#9a8d8d",
                "#575c5a"
        ],
        fontSize: 24,
        fontStyle: "italic",
        fontWeight: "bold",
        stroke: "#0d0d0d",
        strokeThickness: 5,
        wordWrap: true,
        wordWrapWidth: 440,
}); 