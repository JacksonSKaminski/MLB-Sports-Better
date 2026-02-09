import { getTeamById } from "./teams.js";
import { ISOtoTime } from "./utils.js";

function getStatusInfo(g) {
  if (g.status?.startsWith("Final")) {
    return { text: "Final", cls: "is-final" };
  }
  if (g.status?.startsWith("In Progress")) {
    return { text: "Live", cls: "is-live" };
  }
  if (g.status?.startsWith("Scheduled")) {
    return { text: ISOtoTime(g.game_start_time), cls: "is-scheduled" };
  }
  return { text: g.status ?? "Unknown", cls: "is-neutral" };
}

export function gameCardHTML(g) {
  const homeTeam = getTeamById(g.home_team);
  const awayTeam = getTeamById(g.away_team);
  const { text: statusText, cls: statusClass } = getStatusInfo(g);

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
          <div class="game-card__status ${statusClass}">${statusText}</div>
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
