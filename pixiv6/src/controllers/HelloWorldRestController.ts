import request from '../service/RequestService'

export class gameController {
    login(username:string){
        request.login(username);
    }
    spin(betId:number){
        request.spin(betId);
    }
    getAllUsers(betId:number){
        request.getAllUsers();
    }
    stopReel(reels:Array<number>){
        request.stopReel(reels);
    }
    buyAmount(bet:number){
        request.buyAmount(bet);
    }
}