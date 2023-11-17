import axios from "axios";

const baseURL = "https://free-to-play-games-database.p.rapidapi.com/api"


const api = axios.create({
    baseURL: baseURL,
    responseType: "json",
    headers: {
        'X-RapidAPI-Key': '440135f947msh14f07388a9afb8bp10710ajsn433c935438d4',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
});

export default api;