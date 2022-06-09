import BaseScene from "app/scenes/BaseScene";
import BackgroundControl from "app/controls/BackgroundControl";
import gameModel, {GameSize} from "app/model/GameModel";
import TextButtonControl from "app/controls/button/TextButtonControl";
import ReelContainer from "app/slotMachine/reels/reelContainer/reelContainer";
import LobbyScene from "./LobbyScene";
import BetPanel from "app/slotMachine/betPanel/BetPanel";

export default class SlotScene extends BaseScene {
   
    private textButtonControl = new TextButtonControl("Back");
    private betPanel = new BetPanel();
    // private reelContainer = new ReelContainer();

    compose():void {
        this.textButtonControl.onClick.add(() => {
            gameModel.getHowler().play("btn_click");
            this.sceneManager.navigate(LobbyScene);
        }, this)
    }

    activate() {
        super.activate();
        let backgroundControl:BackgroundControl = gameModel.resolve(BackgroundControl);
        this.addControl(backgroundControl);
        this.addControl(this.textButtonControl);
        this.scene.addChild(this.betPanel);
        // this.scene.addChild(this.reelContainer);
    }


    dispose() {
        this.textButtonControl.onClick.unload(this);
        super.dispose();
    }

}