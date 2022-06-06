import BaseScene from "./BaseScene";
import BackgroundControl from "../controls/BackgroundControl";
import gameModel, {GameSize} from "../model/GameModel";
import FullScreenButtonControl from "app/controls/button/FullScreenButtonControl";
import TextButtonControl from "app/controls/button/TextButtonControl";
import ChoiceScene from "app/scenes/ChoiceScene";
import dependencyManager, {inject} from "app/model/injection/InjectDecorator";
import SpineControl from "app/controls/SpineControl";
import LayoutManager from "app/layoutManager/LayoutManager";
import SceneManager from "app/scenes/SceneManager";
import {Application} from "@pixi/app";
import Signal from "app/helpers/signals/signal/Signal";
import {Spine} from "@pixi-spine/all-4.0";

export default class SpineControlScene extends BaseScene {
    @inject(FullScreenButtonControl)
    private fullScreenButton:FullScreenButtonControl = <any>{};
    private textButtonControl = new TextButtonControl("Back");
    public spineBoy:SpineControl = <any>{};
    static REGISTER_SPINE:Signal<SpineControl> = new Signal<SpineControl>();

    constructor(sceneManager:SceneManager, app:Application) {
        super(sceneManager, app);
    }

    compose():void {
        this.spineBoy = this.getSpineBoy();
        SpineControlScene.REGISTER_SPINE.emit(this.spineBoy);
        this.textButtonControl.onClick.add(() => {
            gameModel.getHowler().play("btn_click");
            this.sceneManager.navigate(ChoiceScene);
        }, this);
        // dependencyManager.register(SpineControlScene, this);
    }

    activate():void {
        super.activate();
        let backgroundControl:BackgroundControl = gameModel.resolve(BackgroundControl);
        this.addControl(backgroundControl);
        this.addControl(this.fullScreenButton);
        this.addControl(this.textButtonControl);
        this.addControl(this.spineBoy);
        this.spineBoy.play("idle", {loop:true});
        this.spineBoy.setSkin("default");
    }

    protected onResize(gameSize:GameSize) {
        super.onResize(gameSize);
        this.spineBoy.container.x = gameSize.width * .25;
        this.spineBoy.container.y = (gameSize.height + this.spineBoy.container.height) * .5;
        this.fullScreenButton.container.x = gameSize.width * .9;
        this.fullScreenButton.container.y = gameSize.height * .13;
        this.textButtonControl.container.position.set(
            gameSize.width * .1,
            gameSize.height * .1
        );
    }

    deactivate() {
        super.deactivate();
    }

    dispose() {
        this.textButtonControl.onClick.unload(this);
        super.dispose();
    }

    private getSpineBoy():SpineControl {
        const spineControl = new SpineControl("spineboy");
        return spineControl;
    }
}