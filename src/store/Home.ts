import {makeAutoObservable} from "mobx";
import {Game} from "../models/Game.ts";

class HomeStore {
    page = 1;
    isLoading = false;
    games: Game[] =[];
    constructor() {
        makeAutoObservable(this)
    }
    setIsloading = (isLoading: boolean) =>{
        this.isLoading = isLoading;
    }
    setPage = (page:number) => {
        this.page = page;
    }
    setGames = (games: Game[]) =>{
        this.games = games;
    }
}

const homeStore = new HomeStore()
export default homeStore