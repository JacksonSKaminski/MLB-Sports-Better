let TEAM_MAP = {};
fetch("/src/teamMap.json")
    .then(r => r.json())
    .then(data => TEAM_MAP = data);

export function getTeamById(id) {
    return TEAM_MAP[String(id)] || {
        abbr: "UNK",
        logo: "/src/logos/default.png",
        primary: "#ff0000"
    };
}