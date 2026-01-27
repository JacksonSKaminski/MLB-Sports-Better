from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.server import router as api_router

app = FastAPI(title="MLB App")

#API only
app.include_router(api_router)

#Server frontend folder
app.mount("/", StaticFiles(directory="web",html=True), name="web")