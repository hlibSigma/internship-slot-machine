import BaseScene from "./BaseScene";
import BackgroundControl from "../controls/BackgroundControl";
import gameModel, {GameSize} from "../model/GameModel";
import FullScreenButtonControl from "app/controls/button/FullScreenButtonControl";
import SpineScene from "app/scenes/SpineScene";
import AlphaFadeInEffect from "app/pixi/effects/AlphaFadeInEffect";
import DevAnimationScene from "app/scenes/DevAnimationScene";
import GsapDevAnimationScene from "app/scenes/GsapDevAnimationScene";
import ShaderAnimationScene from "app/scenes/ShaderAnimationScene";
import TextButtonControl from "app/controls/button/TextButtonControl";
import StrictResourcesHelper from "app/pixi/StrictResourcesHelper";
import ButtonControl from "app/controls/button/ButtonControl";
import FragShaderAnimationScene from "app/scenes/FragShaderAnimationScene";
import {ITextStyle} from "@pixi/text";
import {inject} from "app/model/injection/InjectDecorator";
import LayoutScene from "app/scenes/LayoutScene";
import LayoutManager from "app/layoutManager/LayoutManager";
import {PivotType} from "app/controls/MainControl";
import choiceSceneLayout from "app/scenes/ChoiceScene.layout";
import SpineControlScene from "app/scenes/SpineControlScene";
import LobbyScene from "./LobbyScene";
import SymbolsScene from "app/scenes/SymbolsScene";

export default class ChoiceScene extends BaseScene {
    @inject(FullScreenButtonControl, ChoiceScene.createFullScreenButton)
    public fullScreenButton:FullScreenButtonControl = <any>{};
    @inject(LayoutManager)
    private layoutManager:LayoutManager = <any>{};

    private style:Partial<ITextStyle> = {
        fontFamily: "Scalter-SerifCondensed",
        letterSpacing: 2,
        fontSize: 24
    };
    protected buttons = [
        new TextButtonControl("Symbols", {target: SymbolsScene, style: this.style, align:PivotType.TL}).name("item1_1"),
        new TextButtonControl("Gsap dev animation scene", {target: GsapDevAnimationScene, style: this.style, align:PivotType.TL}).name("item1_2"),
        new TextButtonControl("Spine scene", {target: SpineScene, style: this.style, align:PivotType.TL}).name("item2_1"),
        new TextButtonControl("Spine control scene", {target: SpineControlScene, style: this.style, align:PivotType.TL}).name("item2_2"),
        new TextButtonControl("Shader scene", {target: ShaderAnimationScene, style: this.style, align:PivotType.TL}).name("item3_1"),
        new TextButtonControl("Frag Shader scene", {target: FragShaderAnimationScene, style: this.style, align:PivotType.TL}).name("item3_2"),
        new TextButtonControl("Lobby Scene", {target: LobbyScene, style: this.style, align:PivotType.TL}).name("item4_1"),
        new TextButtonControl("Layout Scene", {target: LayoutScene, style: this.style, align:PivotType.TL}).name("item4_2"),
    ];

    compose():void {
        gameModel.resolve(BackgroundControl, this.createBackground, this);
        this.buttons.forEach(value => value.onClick.add(this.onButtonClick, this));
    }

    activate():void {
        super.activate();
        const backgroundControl:BackgroundControl = gameModel.resolve(BackgroundControl);
        this.addControl(backgroundControl);
        this.addControl(this.fullScreenButton);
        this.buttons.forEach(value => this.addControl(value));
        this.layoutManager.addLayout(...choiceSceneLayout.baseLayouts);
        this.layoutManager.addLayout(choiceSceneLayout.sceneLayout);
    }

    deactivate() {
        super.deactivate();
        this.layoutManager.removeLayout(choiceSceneLayout.sceneLayout);
        this.layoutManager.removeLayout(...choiceSceneLayout.baseLayouts);
    }

    protected static createFullScreenButton():FullScreenButtonControl {
        let buttonControl = new FullScreenButtonControl(document.body, 0xffffff);
        buttonControl.onClick.add(_ => {
            let soundId = gameModel.getHowler().play("grass_step");
            gameModel.getHowler().volume(0.25, soundId);
        });
        buttonControl.name("fsButton");
        return buttonControl;
    }

    protected createBackground():BackgroundControl {
        let texture = StrictResourcesHelper.getTexture("UI", "game_bg.png");
        let backgroundControl = new BackgroundControl(texture);
        new AlphaFadeInEffect(backgroundControl.container, this.app.ticker);
        return backgroundControl;
    }

    protected onButtonClick(button:ButtonControl) {
        this.sceneManager.navigate(button.target);
        gameModel.getHowler().play("btn_click");
    }
}