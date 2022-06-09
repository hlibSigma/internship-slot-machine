import BaseScene from "app/scenes/BaseScene";
// import {BitmapText} from "@pixi/text-bitmap";
import BackgroundControl from "app/controls/BackgroundControl";
import gameModel, {GameSize} from "app/model/GameModel";
// import FullScreenButtonControl from "app/controls/button/FullScreenButtonControl";
import ChoiceScene from "app/scenes/ChoiceScene";
import TextButtonControl from "app/controls/button/TextButtonControl";
import SlotScene from "./SlotScene";
import { Loader } from "@pixi/loaders";
// import {inject} from "app/model/injection/InjectDecorator";

export default class LobbyScene extends BaseScene {
    // @inject(FullScreenButtonControl)
    // public fullScreenButton:FullScreenButtonControl = <any>{};
    private textButtonControl = new TextButtonControl("Back");
    private startGameBtn = new TextButtonControl('Start game')

    compose():void {
        this.textButtonControl.onClick.add(() => {
            gameModel.getHowler().play("btn_click");
            this.sceneManager.navigate(ChoiceScene);
        }, this);
        this.startGameBtn.onClick.add(() => {
            gameModel.getHowler().play("btn_click");
            console.log('loader', Loader.shared.resources['at_at']);
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


    // protected onResize(gameSize:GameSize) {
    //     super.onResize(gameSize);
    //     // this.fullScreenButton.container.x = gameSize.width * .9;
    //     // this.fullScreenButton.container.y = gameSize.height * .13;
    //     this.textButtonControl.container.position.set(
    //         gameSize.width * .1,
    //         gameSize.height * .1
    //     );
    //     this.bitmapText.position.copyFrom(gameSize.centerPosition);
    // }

    dispose() {
        this.textButtonControl.onClick.unload(this);
        super.dispose();
    }

}