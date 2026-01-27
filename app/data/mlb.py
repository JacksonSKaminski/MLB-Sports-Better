from datetime import datetime, timezone, date
from dataclasses import dataclass
from typing import Optional, List, Dict
import statsapi
import re

#Cache of games stored to reduce redundant API calls
gamesCache: Dict[date, List['Game']] = {}

@dataclass
class Game:
    game_start_time: datetime
    game_id: int
    away_team: str
    home_team: str
    away_pitcher: Optional[str]
    home_pitcher: Optional[str]
    series_status: str
    away_score: int
    home_score: int
    status: str


def getGamesByDate(game_date: date) -> List[Game]:
    if game_date in gamesCache:
            return gamesCache[game_date]

    gamesData = statsapi.schedule(game_date)

    if not gamesData:
        gamesCache[game_date] = []
        return []

    games_list: List[Game] = []

    for game in gamesData:
        if not gamesData: 
            gameData = {}
        else:
            gameData = Game(
                game_start_time = datetime.fromisoformat(game["game_datetime"].replace("Z", "+00:00")),

                game_id = int(game["game_id"]),
                away_team = str(game["away_name"]),
                home_team = str(game["home_name"]),
                away_pitcher = str(game["away_probable_pitcher"]),
                home_pitcher = str(game["home_probable_pitcher"]),
                series_status = str(game["series_status"]),
                away_score = int(game["away_score"]),
                home_score = int(game["home_score"]),
                status = str(game["status"])
            )

            games_list.append(gameData)

    gamesCache[date] = games_list
    return games_list
        
