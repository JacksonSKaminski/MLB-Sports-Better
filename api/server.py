from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Query
from pydantic import BaseModel

from  app.data.mlb import getGamesByDate, Game

router = APIRouter(prefix="/api", tags=["api"])

class GameOut(BaseModel):
    game_start_time: str
    game_id: int
    away_team: str
    home_team: str
    away_pitcher: Optional[str]
    home_pitcher: Optional[str]
    series_status: str
    away_score: int
    home_score: int
    status: str

def toGameOut(g: Game) -> GameOut:
    return GameOut(
        game_start_time=g.game_start_time.isoformat(),
        game_id=g.game_id,
        away_team=g.away_team,
        home_team=g.home_team,
        away_pitcher=g.away_pitcher,
        home_pitcher=g.home_pitcher,
        series_status=g.series_status,
        away_score=g.away_score,
        home_score=g.home_score,
        status=g.status
    )

@router.get("/games", response_model=List[GameOut])
def games(date_str: date = Query(..., alias="date")):
    games = getGamesByDate(date_str)
    return [toGameOut(g) for g in games]


class PredictionRequest(BaseModel):
    game_id: int

class PredictionResponse(BaseModel):
    game_id: int
    predicted_winner: str
    confidence: float

@router.post("/predict", response_model=PredictionResponse)
def predict(req: PredictionRequest):
    #TODO: Plug in model later
    return PredictionResponse(
        game_id=req.game_id,
        predicted_winner="TBD",
        confidence=-1.0
    )