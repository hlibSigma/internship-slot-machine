import {GUI} from "dat.gui";
import gameModel from "app/model/GameModel";
import HotKeyTool from "app/dev/HotKeyTool";
import {Main} from "app/Main";
import DevAnimationScene from "app/scenes/DevAnimationScene";
import Stats from "stats.js";
import DevPixiDrawLayoutPlugin from "app/layoutManager/DevPixiDrawLayoutPlugin";
import dependencyManager from "app/model/injection/InjectDecorator";
import LayoutManager from "app/layoutManager/LayoutManager";
import DevToolUtils from "app/utils/DevToolUtils";
import SpineControlScene from "app/scenes/SpineControlScene";
import SpineControl from "app/controls/SpineControl";

export default class DevController {
    private stats:Stats = new Stats();

    constructor() {
        this.setupStats();
        const gui = new GUI();
        this.setupGeneralHooks(gui);
        gui.add({
            gameLayoutTest: () => {
                gameModel.updateLayout.emit({
                    height: 800,
                    width: 600,
                    scale: 2,
                    centerPosition: {x: 400, y: 300}
                });
            }
        }, "gameLayoutTest");

        const hotKeyTool = HotKeyTool.instance;
        hotKeyTool.registerOnKey("N", () => {
            hotKeyTool.registerOnKey("1", () => {
                Main.MAIN.mainSceneManager.navigate(DevAnimationScene);
            }, "DevAnimationScene");
        });
        const devPixiDrawLayoutPlugin = new DevPixiDrawLayoutPlugin(Main.APP.stage);
        hotKeyTool.registerOnKey("D", () => {
            hotKeyTool.registerOnKey("1", () => {
                this.stats.dom.style.opacity = this.stats.dom.style.opacity == "0.9" ? "0.2" : "0.9";
            }, "stats visibility");
            hotKeyTool.registerOnKey("2", () => {
                let layoutManager = dependencyManager.resolve(LayoutManager);
                if(layoutManager.hasPlugin(devPixiDrawLayoutPlugin)){
                    layoutManager.removePlugin(devPixiDrawLayoutPlugin);
                } else {
                    layoutManager.addPlugin(devPixiDrawLayoutPlugin);
                }
            }, "show layouts");
        }, "dev tools");
    }

    private setupGeneralHooks(gui:GUI) {
        let generalGui = gui.addFolder("general");
        generalGui.add({
            play: () => {
                gameModel.pauseGame.emit({pause: false});
            }
        }, "play");
        generalGui.add({
            pause: () => {
                gameModel.pauseGame.emit({pause: true});
            }
        }, "pause");
        const soundsGui = gui.addFolder("sounds");
        const spineGui = gui.addFolder("spine");
        DevToolUtils.setupObj(this.getSoundsActions("fail"), "", soundsGui);
        DevToolUtils.setupObj(this.getSoundsActions("success"), "", soundsGui);
        DevToolUtils.setupObj(this.getSoundsActions("btn_click"), "", soundsGui);
        DevToolUtils.setupObj(this.getSoundsActions("relax_loop"), "", soundsGui);
        DevToolUtils.setupObj(this.getSoundsActions("grass_step"), "", soundsGui);
        DevToolUtils.setupObj(this.getSoundsActions("regular_step"), "", soundsGui);
        DevToolUtils.setupObj(this.getSoundsActions("water_step"), "", soundsGui);

        SpineControlScene.REGISTER_SPINE.add((spineControl:SpineControl) => {
            DevToolUtils.setupObj(this.getSpineActions(spineControl, "spineBoy"), "", spineGui);
        });
    }
    private getSpineActions(spine:SpineControl, name:string) {
        // const spinScene= dependencyManager.resolve(SpineControlScene);
        // spine.
        const actions = {
            track:1,
            _trackStep:1,
        };
        spine.getAnimations().forEach(value => {
            // @ts-ignore
            actions[value] = ()=>{
                spine.play(value,{loop:true, trackIndex:actions.track});
            }
        });
        return actions
    }

    private getSoundsActions(sound:string) {
        let soundId:number = 0;
        const howler = gameModel.getHowler();
        const soundAction = {
            rate:1,
            _rateMin:0,
            _rateMax:5,
            _rateStep:0.001,
            _rateUpdate:()=>{
                howler.rate(soundAction.rate, soundId);
            },
            play: () => {
                howler.stop(soundId);
                soundId = howler.play(sound);
                howler.rate(soundAction.rate, soundId);
            },
            rateUp: () => {
                howler.stop(soundId);
                soundId = howler.play(sound);
                soundAction.rate+=0.1;
                howler.rate(soundAction.rate, soundId);
            },
            rateDown: () => {
                howler.stop(soundId);
                soundId = howler.play(sound);
                soundAction.rate-=0.1;
                howler.rate(soundAction.rate, soundId);
            },
            loop: () => {
                howler.stop(soundId);
                soundId = howler.play(sound);
                howler.loop(true, soundId);
            },
            fadeDown: () => {
                howler.fade(1, 0, 1000, soundId);
            },
            stop: () => {
                howler.stop(soundId);
            },
            mute: () => {
                howler.mute(true, soundId);
            }
        };
        return {
            [`${sound}`]: soundAction
        };
    }

    private setupStats() {
        const stats = this.stats;
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);
        Main.APP.ticker.add(dt => {
            stats.update();
        });
    }
}