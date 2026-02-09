import { getGames } from "./api.js";
import { setTodayAsDefault } from "./utils.js";
import { gameCardHTML } from "./cards.js";

async function loadGames(dateStr, gamesGridEL) {
    try {
        gamesGridEL.innerHTML="";

        const games = await getGames(dateStr)

        if(!games.length) {
            gamesGridEL.innerHTML=`No Games Found for ${dateStr}`;
            return;
        }

        gamesGridEL.innerHTML = games.map(gameCardHTML).join("");
    } catch (e) {
        console.error(e);
        gamesGridEL.innerHTML = "Error Loading Games.";
    }
}

function init() {
    const gameDateInput = document.getElementById("game-date");
    const gamesGrid = document.querySelector('[data-js="games-grid"]');

    if (!gameDateInput || !gamesGrid) {
        console.error("Missing #game-date input or [data-js='games-grid'] section in HTML");
        return;
    }

    setTodayAsDefault(gameDateInput);
    loadGames(gameDateInput.value, gamesGrid);

    gameDateInput.addEventListener("change", () => loadGames(gameDateInput.value, gamesGrid));

    setInterval(() => loadGames(gameDateInput.value, gamesGrid), 30000);
}

document.addEventListener("DOMContentLoaded", init);