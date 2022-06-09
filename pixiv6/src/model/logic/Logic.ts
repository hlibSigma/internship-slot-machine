import {TInitResponse, TResponse, TSpinResponse} from "app/typing/server.typing";

export interface Logic {

    login(userName:string):Promise<TInitResponse>;

    spin(betId:number):Promise<TSpinResponse>;

    force(reelStops:number[]):Promise<TResponse>;

    buy(money:number):Promise<TResponse>;

}
