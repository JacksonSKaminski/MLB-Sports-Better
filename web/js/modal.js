import { getTeamById } from "./teams.js";
import { ISOtoTime } from "./utils.js";

export function createModal(){
    const overlay = document.querySelector('[data-js="modal-overlay"]');
    const closeBtn = document.querySelector('[data-js="modal-close"]');
    const gameIdEl = document.querySelector('[data-js="modal-game-id"]');

    const predictBtn = document.querySelector('[data-js="modal-predict-btn"]');
    const predictionResponseText = document.querySelector('[data-js="modal-prediction-results"]');

    if (!overlay || !closeBtn) {
        console.error("Modal elements missing in HTML");
        return null;
    }

    let isOpen = false;
    let lastActiveEl = null;

    function open(game, openerEl = null) {
        lastActiveEl = openerEl || document.activeElement;

        fillModal(game);
        
        overlay.classList.remove("is-hidden");
        isOpen = true;

        closeBtn.focus();

        predictionResponseText.classList.add("is-hidden")
        predictBtn.classList.remove("is-hidden");
    }

    function fillModal(g) {
        const homeTeam = getTeamById(g.home_team);
        const awayTeam = getTeamById(g.away_team);

        if (gameIdEl) gameIdEl.textContent = `GameId: ${g.game_id}`;

        //Away
        const awayBox = document.querySelector('[data-js="away-team"]');
        awayBox.querySelector(".team-card__logo").src = awayTeam.logo;
        awayBox.querySelector(".team-card__logo").alt = `${awayTeam.name} logo`;
        awayBox.querySelector(".team-card__name").textContent = awayTeam.name;
        awayBox.querySelector(".team-card__record").textContent = `${g.away_wins ?? "-"}-${g.away_losses ?? "-"}`;

        // Home side
        const homeBox = document.querySelector('[data-js="home-team"]');
        homeBox.querySelector(".team-card__logo").src = homeTeam.logo;
        homeBox.querySelector(".team-card__logo").alt = `${homeTeam.name} logo`;
        homeBox.querySelector(".team-card__name").textContent = homeTeam.name;
        homeBox.querySelector(".team-card__record").textContent = `${g.home_wins ?? "-"}-${g.home_losses ?? "-"}`;

        // Middle matchup info
        const meta = document.querySelector('[data-js="game-meta"]');
        meta.querySelector(".matchup-card__date").textContent =new Date(g.game_start_time).toLocaleDateString([], { month: "short", day: "numeric" });
        meta.querySelector(".matchup-card__time").textContent = ISOtoTime(g.game_start_time);

        // Store current game id on modal (useful for predict button)
        document.querySelector('[data-js="modal-overlay"]').dataset.gameId = g.game_id;
    }

    function close() {
        overlay.classList.add("is-hidden");
        isOpen = false;
        lastActiveEl?.focus();
    }

    function predict() {
        predictionResponseText.classList.remove("is-hidden")
        predictBtn.classList.add("is-hidden");
    }

    closeBtn.addEventListener("click", close);
    predictBtn.addEventListener("click", predict);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) close();
    });

    return { open, close };
}