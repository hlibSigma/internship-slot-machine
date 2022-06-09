import { TFullUserData, TInitResponse, TResponse, TSpinResponse } from "./typing";
const baseUrl = "https://us-central1-internship-slot-backend.cloudfunctions.net/app/";

export default {
   async login(username:string):Promise<TInitResponse> {
        const url = `${baseUrl}user/login/?login=${username}`;
        console.log(`fetch(${url})`);
        const result = await fetch(url);
        const response:TInitResponse = JSON.parse(await result.text());
        console.log(response);
        return response;
    },
    
    async spin(betId:number):Promise<TSpinResponse> {
        const url = `${baseUrl}game/spin/?${betId}`;
        console.log(`fetch(${url})`);
        const result = await fetch(url);
        const response:TSpinResponse = JSON.parse(await result.text());
        console.log(response);
        return response;
    },

    async getAllUsers():Promise<TFullUserData[]> {
        const url = `${baseUrl}user/all/`;
        console.log(`fetch(${url})`);
        const result = await fetch(url);
        const response:TFullUserData[] = JSON.parse(await result.text());
        console.log(response);
        return response;
    },

    async stopReel(reels:Array<number>):Promise<TResponse> {
        const url = `${baseUrl}game/spin/force/?reel_stops=${reels}`;
        console.log(`fetch(${url})`);
        const result = await fetch(url);
        const response:TResponse = JSON.parse(await result.text());
        console.log(response);
        return response;
    },
    async buyAmount(bet:number):Promise<TResponse> {
        const url = `${baseUrl}user/buy/?buy_amount=${bet}`;
        console.log(`fetch(${url})`);
        const result = await fetch(url);
        const response:TResponse = JSON.parse(await result.text());
        console.log(response);
        return response;
    }
}