import BackgroundControl from "../controls/BackgroundControl";
import BaseScene from "./BaseScene";
import StrictResourcesHelper from "../pixi/StrictResourcesHelper";
import gameModel, {GameSize} from "../model/GameModel";
import SceneManager from "./SceneManager";
import AlphaFadeInEffect from "../pixi/effects/AlphaFadeInEffect";
import GameTitle from "../controls/GameTitle";
import HtmlBackgroundControl from "../controls/HtmlBackgroundControl";
import SimpleLoaderControl from "../controls/SimpleLoaderControl";
import {Container} from "@pixi/display";
import {Application} from "@pixi/app";
import {Loader} from "@pixi/loaders";
import { GameController } from "app/controllers/GameControllerRestController";
import SlotScene from "./SlotScene";

export default class LoaderScene extends BaseScene {
    private readonly gameTitle:Container;
    private timeoutBeforeShowTheGame:number = -1;
    private gameLoadTime:number = -1;
    private simpleLoaderContainer:Container;

    private simpleLoaderControl = new SimpleLoaderControl();

    constructor(sceneManager:SceneManager, app:Application) {
        super(sceneManager, app);
        let title = gameModel.getSkinParamsReader().getTitle();
        this.gameTitle = new GameTitle(title).container;
        this.simpleLoaderContainer = this.simpleLoaderControl.container;
    }

    compose():void {
        let skinParamsReader = gameModel.getSkinParamsReader();
        let htmlBackgroundControl = new HtmlBackgroundControl(skinParamsReader.getBgPath());
        document.body.prepend(htmlBackgroundControl.background);
        this.scene.addChild(this.gameTitle);
        this.scene.addChild(this.simpleLoaderContainer);
        new AlphaFadeInEffect(this.simpleLoaderContainer, this.app.ticker);
        Loader.shared.add('bcg', 'assets/atlases/bcg.json');
        Loader.shared.add('UI', 'assets/atlases/ui.json');
        // Loader.shared.add('windmill', 'assets/atlases/windmill.json');
        Loader.shared.add('spineboy', 'assets/atlases/spineboy.json');
        Loader.shared.add('symbols', 'assets/atlases/symbols.json');
        Loader.shared.add({ name: "Scalter-SerifCondensed", url: "./assets/fonts/Scalter-SerifCondensed.otf" });
        Loader.shared.add({ name: "neon_numbers", url: "./assets/fonts/bitmap/neon_numbers.xml" });
        Loader.shared.onComplete.add(this.onLoadComplete.bind(this));
        Loader.shared.onProgress.add((loader:Loader) => {
            this.simpleLoaderControl.update(loader.progress / 100)
        });
        this.simpleLoaderControl.update(0.1);
        Loader.shared.load();
        this.gameLoadTime = Date.now();
        window.document.body.onclick = ev => {
            gameModel.userInteractionIsPresent = true;
        };
    }

    protected onResize(gameSize:GameSize) {
        super.onResize(gameSize);
        this.gameTitle.x = gameSize.width * .5;
        this.gameTitle.y = gameSize.height * .15;
        this.simpleLoaderContainer.x = gameSize.width * .5;
        this.simpleLoaderContainer.y = gameSize.height * .5;
    }

    private async onLoadComplete() {
        let initResponse = await new GameController().login("Adam");
        gameModel.initResponse = initResponse;
        this.scene.addChild(this.gameTitle);
        setTimeout(() => {
            this.sceneManager.navigate(SlotScene);
        }, this.timeoutBeforeShowTheGame - (Date.now() - this.gameLoadTime));
    }

}