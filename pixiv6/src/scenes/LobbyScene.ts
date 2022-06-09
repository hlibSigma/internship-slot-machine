import BaseScene from "app/scenes/BaseScene";
import BackgroundControl from "app/controls/BackgroundControl";
import gameModel from "app/model/GameModel";
import ChoiceScene from "app/scenes/ChoiceScene";
import TextButtonControl from "app/controls/button/TextButtonControl";
import SlotScene from "./SlotScene";
import { Loader } from "@pixi/loaders";

export default class LobbyScene extends BaseScene {
   
    private textButtonControl = new TextButtonControl("Back");
    private startGameBtn = new TextButtonControl('Start game')

    compose():void {
        this.textButtonControl.onClick.add(() => {
            gameModel.getHowler().play("btn_click");
            this.sceneManager.navigate(ChoiceScene);
        }, this);
        this.startGameBtn.onClick.add(() => {
            gameModel.getHowler().play("btn_click");
            this.sceneManager.navigate(SlotScene);
        }, this);
    }

    activate() {
        super.activate();
        let backgroundControl:BackgroundControl = gameModel.resolve(BackgroundControl);
        this.addControl(backgroundControl);
        this.addControl(this.textButtonControl);
        this.startGameBtn.container.position.set(500,
            600)
        this.addControl(this.startGameBtn);

    }

    dispose() {
        this.textButtonControl.onClick.unload(this);
        super.dispose();
    }

}