const gameDateInput = document.getElementById("gameDate");
const gamesGrid = document.getElementById("gamesGrid")

let TEAM_MAP = {};
fetch("/src/teamMap.json")
    .then(r => r.json())
    .then(data => TEAM_MAP = data);

function getTeamById(id) {
    return TEAM_MAP[String(id)] || {
        abbr: "UNK",
        logo: "/src/logos/default.png",
        primary: "#ff0000"
    };
}

function setTodayAsDefault() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2,"0");

    const formatted = `${year}-${month}-${day}`;
    gameDateInput.value = formatted;
}

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
            statusColor = "#e8eefc"
    }

    return `
        <article class = "card" data-gameid="${g.game_id}" style="
            background-image: linear-gradient(
                125deg, 
                ${awayTeam.primary} 0%,
                ${awayTeam.primary} 10%,
                #2e302e 25%,
                #2e302e 75%,
                ${homeTeam.primary} 90%,
                ${homeTeam.primary} 100%
            );
        "
    >
                <!-- Away team -->
                    <div class="side away">
                        <img src="${awayTeam.logo}" class="teamImage">
                        <p class="TeamAbrev">${awayTeam.abbr}</p>
                    </div>

                    <div class="container-center">
                        <p class="TeamScore">${g.away_score ?? 0}</p>

                        <div class = "game-center">
                            <div class="game-status">${statusText}</div>
                            <div class="at-symbol">@</div>
                        </div>

                        <p class="TeamScore">${g.home_score ?? 0}</p>
                    </div>

                <!-- Home team -->
                    <div class="side home">
                        <p class="TeamAbrev">${homeTeam.abbr}</p>
                        <img src="${homeTeam.logo}" class="teamImage">
                    </div>

        </article>
    `
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