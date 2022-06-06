import BaseScene from "app/scenes/BaseScene";
import BackgroundControl from "app/controls/BackgroundControl";
import gameModel, {GameSize} from "app/model/GameModel";
import ChoiceScene from "app/scenes/ChoiceScene";
import TextButtonControl from "app/controls/button/TextButtonControl";

export default class SlotScene extends BaseScene {
   
    private textButtonControl = new TextButtonControl("Back");

    compose():void {
        this.textButtonControl.onClick.add(() => {
            gameModel.getHowler().play("btn_click");
            this.sceneManager.navigate(ChoiceScene);
        }, this)
    }

    activate() {
        super.activate();
        let backgroundControl:BackgroundControl = gameModel.resolve(BackgroundControl);
        this.addControl(backgroundControl);
        this.addControl(this.textButtonControl);

    }


    dispose() {
        this.textButtonControl.onClick.unload(this);
        super.dispose();
    }

}