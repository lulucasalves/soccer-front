export function getMatchs(team: string) {
  if (team.toLowerCase().includes("atlético")) return "Atl. Mineiro";
  if (team.toLowerCase().includes("vasco")) return "Vasco";
  if (team.toLowerCase().includes("parana")) return "Paranaense";
  if (team.toLowerCase().includes("américa")) return "América MG";

  return team
}
