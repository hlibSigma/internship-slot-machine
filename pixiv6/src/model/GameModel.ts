import Signal from "../helpers/signals/signal/Signal";
import MainControl from "src/controls/MainControl";
import constructor from "app/model/ContructortTypes";
import sounds from "res/sounds/SOUND_FILE.soundmap.json";
import {Howl} from 'howler';
import dependencyManager from "app/model/injection/InjectDecorator";
import {TInitResponse} from "app/service/typing";

type InjectionType<T extends MainControl> = Function & {prototype:T};

export class GameModel {

    public readonly updateLayout:Signal<GameSize> = new Signal<GameSize>();
    public readonly pauseGame:Signal<{pause:boolean}> = new Signal<{pause:boolean}>();
    private howler:Howl = <any>{};
    initResponse:TInitResponse|undefined;

    getHowler():Howl {
        return this.howler;
    }

    register<K extends MainControl>(key:constructor<MainControl>, instance:K):this {
        dependencyManager.register(key, instance);
        return this;
    }

    has<T extends MainControl>(key:constructor<T>):boolean {
        return dependencyManager.has(key);
    }

    resolve<T extends MainControl>(key:constructor<T>, init?:() => T, ctx?:any):T {
        return dependencyManager.resolve(key, init, ctx);
    }

    userInteractionIsPresent:boolean = false;

    initHowler():Promise<string | void> {
        let soundConfig:TSoundConfig = <any>sounds;
        return new Promise<string | void>(resolve => {
            this.howler = new Howl({
                src: soundConfig.src,
                sprite: soundConfig.sprite,
                autoplay: false,
                onend: function () {
                    console.warn('Finished!');
                },
                onloaderror: soundId => {
                    console.error('onloaderror: ' + soundId, sounds);
                },
                onload: _ => {
                    resolve();
                }
            });
            this.howler.load();
        });
    }

    getSkinParamsReader():SkinParamsReader {
        return new SkinParamsReader();
    }

    unload($this:any) {
        this.updateLayout.unload($this);
    }
}

class SkinParamsReader {

    getTitle(defaultValue:string = `VIDEO%20SLOT%20MACHINE`):string {
        let search = window.location.href;
        let regexp = /([?&])title=([^&#]*)/;
        let match = search.match(regexp);
        let title;
        if (match && match.length > 2) {
            title = match[2]
        } else {
            title = defaultValue;
            console.warn(`title cannot be read, by default was set: [${title}]`);
        }
        return decodeURI(title);
    }

    getHueDegree():number {
        let search = window.location.href;
        let regexp = /(([?&])hue=(\d+))/;
        let match = search.match(regexp);
        let hue;
        if (match && match.length > 0) {
            hue = match[3];
        } else {
            hue = `0`;
            console.warn(`hue cannot be read, by default was set: [${hue}]`);
        }
        return parseInt(hue);
    }

    getBgPath(defaultValue = "assets/images/bcg.png"):string {
        let search = window.location.href;
        console.log(search);
        let regexp = new RegExp(/([?&])bg=((\w|\d|[:.\/\-])+)/);
        let match = search.match(regexp);
        let bgPath;
        if (match && match.length > 0) {
            bgPath = match[2];
        } else {
            bgPath = defaultValue;
            console.warn(`bgPath cannot be read, by default was set: [${bgPath}]`);
        }
        return bgPath;
    }
}

export type GameSize = {
    width:number;
    height:number;
    centerPosition:{x:number, y:number};
    scale:number;
}

type TSoundConfig = {
    src:string[];
    sprite:{[name:string]:[number, number] | [number, number, boolean]};
}

let gameModel = new GameModel();
export default gameModel;