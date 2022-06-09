import request from '../service/RequestService'

export class GameController {
    login(username:string){
        request.login(username);
    }
    spin(betId:number){
        request.spin(betId);
    }
    getAllUsers(){
        request.getAllUsers();
    }
    stopReel(reels:Array<number>){
        request.stopReel(reels);
    }
    buyAmount(bet:number){
        request.buyAmount(bet);
    }
}