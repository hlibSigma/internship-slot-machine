import { TUserLoginData } from 'app/service/typing';
import request from '../service/RequestService'
// const userLoginData: TUserLoginData = {
//     pass:'',
//     login:"Adam",
// };
export class GameController {
    login(username:string){
        return request.login(username);
    }
    spin(betId:number){
        return request.spin(betId);
    }
    getAllUsers(){
        return request.getAllUsers();
    }
    stopReel(reels:Array<number>){
        return request.stopReel(reels);
    }
    buyAmount(bet:number){
        return request.buyAmount(bet);
    }
}