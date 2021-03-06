import BaseScene from "app/scenes/BaseScene";
import BackgroundControl from "app/controls/BackgroundControl";
import gameModel, {GameSize} from "app/model/GameModel";
import TextButtonControl from "app/controls/button/TextButtonControl";
import LobbyScene from "./LobbyScene";
import BetPanel from "app/slotMachine/betPanel/BetPanel";
import ReelContainer from "app/slotMachine/reels/reelContainer/ReelContainer";
import ReelsControl from "app/controls/ReelsControl";
import StrictResourcesHelper from "app/pixi/StrictResourcesHelper";
import AlphaFadeInEffect from "app/pixi/effects/AlphaFadeInEffect";

export default class SlotScene extends BaseScene {
    private reelContainer = new ReelContainer(gameModel.initResponse!.symbols, gameModel.initResponse!.strips);
    private betPanel = new BetPanel(this.reelContainer, gameModel.initResponse!.bets, gameModel.initResponse!.userStats, gameModel.initResponse!.lines);
    
    private reelControl = new ReelsControl(this.reelContainer, this.betPanel);
  

    compose(): void {
        gameModel.resolve(BackgroundControl, this.createBackground, this);
        this.betPanel.addListenerToPlayButton(this.reelControl.buttonClick, this.reelControl);
    }

    protected createBackground(): BackgroundControl {
        let texture = StrictResourcesHelper.getTexture("bcg", "fruit-bcg.png");
        let backgroundControl = new BackgroundControl(texture);
        new AlphaFadeInEffect(backgroundControl.container, this.app.ticker);
        return backgroundControl;
    }

    activate() {
        super.activate();
        let backgroundControl:BackgroundControl = gameModel.resolve(BackgroundControl);
        this.addControl(backgroundControl);
        this.scene.addChild(this.betPanel);
        this.scene.addChild(this.reelContainer);
    }

    dispose() {
        super.dispose();
    }
}