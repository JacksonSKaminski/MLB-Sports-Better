import { getGames } from "./api.js";
import { setTodayAsDefault } from "./utils.js";
import { gameCardHTML } from "./cards.js";
import { createModal } from "./modal.js";

let currentGames = [];

async function loadGames(dateStr, gamesGridEL) {
    try {
        gamesGridEL.innerHTML="";

        const games = await getGames(dateStr)
        currentGames = games;

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
    const modal = createModal();

    if (!gameDateInput || !gamesGrid) {
        console.error("Missing #game-date input or [data-js='games-grid'] section in HTML");
        return;
    }

    setTodayAsDefault(gameDateInput);
    loadGames(gameDateInput.value, gamesGrid);

    gameDateInput.addEventListener("change", () => loadGames(gameDateInput.value, gamesGrid));
    gamesGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".game-card");
        if(!card) return;

        const gameId = card.dataset.gameId;
        const g = currentGames.find(x => String(x.game_id) === String(gameId));

        console.log(g);

        if (!g) return;

        modal.open(g, card);
    })

    setInterval(() => loadGames(gameDateInput.value, gamesGrid), 30000);
}

document.addEventListener("DOMContentLoaded", init);