import {AxiosResponse} from "axios";
import {Game, gameSorts, SingleGame} from "../models/Game.ts";
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

    static async getGameByCategory(gameCategory:string): Promise<AxiosResponse<Game[]>> {
        return api.get<Game[]>(`/games?category=${gameCategory}`)
    }

    static async getGameBySort(gameSort:gameSorts) : Promise<AxiosResponse<Game[]>>{
        return api.get<Game[]>(`/games?sort-by=${gameSort}`)
    }

}