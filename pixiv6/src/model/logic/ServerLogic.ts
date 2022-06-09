import {Logic} from "app/model/logic/Logic";
import {TInitResponse, TResponse, TSpinResponse} from "app/typing/server.typing";

export default class ServerLogic implements Logic {


    constructor(private readonly baseUrl:string) {
    }

    async buy(money:number):Promise<TResponse> {
        throw new Error("Logic.buy not implemented");
    }

    async force(reelStops:number[]):Promise<TResponse> {
        throw new Error("Logic.force not implemented");
    }

    async login(userName:string):Promise<TInitResponse> {
        throw new Error("Logic.login not implemented");
    }

    async spin(betId:number):Promise<TSpinResponse> {
        throw new Error("Logic.spin not implemented");
    }

}
