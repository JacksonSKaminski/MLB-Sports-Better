const gameDateInput = document.getElementById("game-date");
const gamesGrid = document.querySelector('[data-js="games-grid"]');

import { getTeamById } from "./teams.js";
import { setTodayAsDefault } from "./utils.js";

function ISOtoTime(ISOTimestamp){
    const date = new Date(ISOTimestamp);

    const localTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12 : true
    });

    return localTime
}

function gameCardHTML(g){

    console.log(g);

    const homeTeam = getTeamById(g.home_team);
    const awayTeam = getTeamById(g.away_team);

    let statusText;

    switch (true) {
        case g.status.startsWith("Final"):
            statusText = "Final";
            stausColor = "#e8eefc";
            break;
        
        case g.status.startsWith("In Progress"):
            statusText = "Live";
            statusColor = "#FF0000";
            break;
        case g.status.startsWith("Scheduled"):
            statusText = ISOtoTime(g.game_start_time);
            statusColor = "#e8eefc";
            break;
        
        default:
            statusText = g.status;
            statusColor = "#e8eefc";
    }

    return `
        <article class="game-card"
            data-game-id="${g.game_id}"
            style="--away:${awayTeam.primary}; --home:${homeTeam.primary};"
        >

        <div class="game-card__side game-card__side--away">
            <img class="game-card__logo" src="${awayTeam.logo}" alt="${awayTeam.name} logo">
            <p class="game-card__abbr">${awayTeam.abbr}</p>
        </div>

        <div class="game-card__center">
            <p class="game-card__score">${g.away_score ?? 0}</p>

            <div class="game-card__meta">
                <div class="game-card__status is-live" style="color: ${statusColor}">${statusText}</div>
                <div class="game-card__vs">@</div>
            </div>

            <p class="game-card__score">${g.home_score ?? 0}</p>
        </div>

        <div class="game-card__side game-card__side--home">
            <p class="game-card__abbr">${homeTeam.abbr}</p>
            <img class="game-card__logo" src="${homeTeam.logo}" alt="${homeTeam.name} logo">
        </div>

    </article>
`;

}

async function loadGames(dateStr) {
    try {
        gamesGrid.innerHTML="";

        const res = await fetch(`/api/games?date=${encodeURIComponent(dateStr)}`);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);

        const games = await res.json();

        if(!games.length) {
            gamesGrid.innerHTML=`No Games Found for ${dateStr}`;
            return;
        }

        gamesGrid.innerHTML = games.map(gameCardHTML).join("");
    } catch (e) {
        console.error(e);
    }
}

function init() {
    setTodayAsDefault();
    loadGames(gameDateInput.value);
}

init();

gameDateInput.addEventListener("change", () => loadGames(gameDateInput.value));
//setInterval(loadGames, 30000);