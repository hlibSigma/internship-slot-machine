import { TFullUserData, TInitResponse, TResponse, TSpinResponse } from 'app/service/typing';
import request from '../service/RequestService'

export class GameController {
    login(username:string):Promise<TInitResponse>{
        return request.login(username);
    }
    spin(betId:number):Promise<TSpinResponse>{
        return request.spin(betId);
    }
    getAllUsers():Promise<TFullUserData[]>{
        return request.getAllUsers();
    }
    stopReel(reels:Array<number>):Promise<TResponse>{
        return request.stopReel(reels);
    }
    buyAmount(bet:number):Promise<TResponse>{
        return request.buyAmount(bet);
    }
}