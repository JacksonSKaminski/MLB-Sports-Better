from dataclasses import dataclass
from typing import Optional, List, Dict



@dataclass
class game_odds:
    spread_away: int
    spread_away_odds:int
    total_over: float
    total_over_odds: int
    ml_away: int

    spread_home: int
    spread_home_odds:int
    total_under: float
    total_under_odds: int
    ml_home: int

def getGameOdds(game_id: int) -> game_odds:
    

getGameOdds(123)