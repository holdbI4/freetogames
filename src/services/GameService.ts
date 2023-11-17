import {AxiosResponse} from "axios";
import {Game, SingleGame} from "../models/Game.ts";
import api from "../http";

export default class GameService{
    static async getGames():Promise<AxiosResponse<Game[]>> {
        return api.get<Game[]>("/games")
    }
    static async getGamesByPlatform(platform: string): Promise<AxiosResponse<Game[]>> {
        return api.get<Game[]>(`/games?platform=${platform}`)
    }
    static async getGameById(gameId:number): Promise<AxiosResponse<SingleGame>>{
        return api.get<SingleGame>(`/game?id=${gameId}`)
    }

}