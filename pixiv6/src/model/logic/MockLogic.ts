import {Logic} from "app/model/logic/Logic";
import {
    TInitResponse,
    TReelWindow,
    TResponse,
    TSpinResponse,
    TUserData,
    TUserStatsData
} from "app/typing/server.typing";

export default class MockLogic implements Logic {
    private user:TUserData = {
        login:"",
        lang:"en",
        currency:"GTP",
        denominator:1
    };
    private userStats:TUserStatsData = {
        freeGames:1,
        balance:100500,
        reelStops:[0,0,0,0,0]
    };

    async buy(money:number):Promise<TResponse> {
        return {
            status:"Ok",
            reason:"",
        };
    }

    async force(reelStops:number[]):Promise<TResponse> {
        return {
            status:"Ok",
            reason:"",
        };
    }

    async login(userName:string):Promise<TInitResponse> {
        this.user.login = userName
        return {
            user:this.user,
            bets:[{id:1, value:1}, {id:2, value:2}],
            lines:[[0,0,0,0,0], [1,1,1,1,1], [2,2,2,2,2]],
            autoPlays:[1,2,5],
            strips:[
                [],
                [1,4,2,4,5,1,3,4,5,1,3,4,5,1,2,3,3,1,1,3,1,3,4,1,5,5,1,2,3],
                [1,4,2,4,5,1,3,4,5,1,3,4,5,1,2,3,3,1,1,3,1,3,4,1,5,5,1,2,3],
                [1,4,2,4,5,1,3,4,5,1,3,4,5,1,2,3,3,1,1,3,1,3,4,1,5,5,1,2,3],
                [1,4,2,4,5,1,3,4,5,1,3,4,5,1,2,3,3,1,1,3,1,3,4,1,5,5,1,2,3],
            ],
            symbols:[
                {id:1, name:"scatter", isScatter:true, isWild:false},
                {id:2, name:"wild", isScatter:false, isWild:true},
                {id:3, name:"symbol1", isScatter:false, isWild:false},
                {id:4, name:"symbol2", isScatter:false, isWild:false},
                {id:5, name:"symbol3", isScatter:false, isWild:false},
            ],
            userStats:this.userStats
        };
    }

    async spin(betId:number):Promise<TSpinResponse> {
        return {
            user:this.user,
            userStats:this.userStats,
            wins:[],
            totalWin:0,
            finalReelWindow:<TReelWindow>[
                [1,4,2],
                [1,4,2],
                [1,4,2],
                [1,4,2],
                [1,4,2],
            ],
            scatterWins:[],
        };
    }

}
