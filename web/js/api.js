export async function getGames(dateStr) {
  const r = await fetch(`/api/games?date=${dateStr}`);

  if (!r.ok) throw new Error("Failed to fetch games");

  return await r.json();
}

export async function predictGame(gameId) {
  const r = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_id: Number(gameId) })
  });

  if (!r.ok) throw new Error("Failed to predict");
  
  return await r.json();
}
