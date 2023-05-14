import { returnAllStats } from "./teamStats";

export function sortTeams(a: any, b: any, numberGames: number, sort: string) {
  if (sort === "Saldo de gols (pior)") {
    return (
      returnAllStats(a, numberGames).sgTotal -
      returnAllStats(b, numberGames).sgTotal
    );
  } else if (sort === "Saldo de gols (melhor)") {
    return (
      returnAllStats(b, numberGames).sgTotal -
      returnAllStats(a, numberGames).sgTotal
    );
  } else if (sort === "Média de gols feitos (pior)") {
    return (
      returnAllStats(a, numberGames).mediaGolsFeitos -
      returnAllStats(b, numberGames).mediaGolsFeitos
    );
  } else if (sort === "Média de gols feitos (melhor)") {
    return (
      returnAllStats(b, numberGames).mediaGolsFeitos -
      returnAllStats(a, numberGames).mediaGolsFeitos
    );
  } else if (sort === "Média de gols sofridos (melhor)") {
    return (
      returnAllStats(a, numberGames).mediaGolsSofridos -
      returnAllStats(b, numberGames).mediaGolsSofridos
    );
  } else if (sort === "Média de gols sofridos (pior)") {
    return (
      returnAllStats(b, numberGames).mediaGolsSofridos -
      returnAllStats(a, numberGames).mediaGolsSofridos
    );
  } else if (sort === "Média de chutes ao gol (melhor)") {
    return (
      returnAllStats(b, numberGames).mediaChutes -
      returnAllStats(a, numberGames).mediaChutes
    );
  } else if (sort === "Média de chutes ao gol (pior)") {
    return (
      returnAllStats(a, numberGames).mediaChutes -
      returnAllStats(b, numberGames).mediaChutes
    );
  } else if (sort === "Média de cartões (melhor)") {
    return (
      returnAllStats(a, numberGames).mediaCartoes -
      returnAllStats(b, numberGames).mediaCartoes
    );
  } else if (sort === "Média de cartões (pior)") {
    return (
      returnAllStats(b, numberGames).mediaCartoes -
      returnAllStats(a, numberGames).mediaCartoes
    );
  } else if (sort === "Saldo de gols em casa (pior)") {
    return (
      returnAllStats(a, numberGames).sgTotalC -
      returnAllStats(b, numberGames).sgTotalC
    );
  } else if (sort === "Saldo de gols em casa (melhor)") {
    return (
      returnAllStats(b, numberGames).sgTotalC -
      returnAllStats(a, numberGames).sgTotalC
    );
  } else if (sort === "Média de gols feitos em casa (pior)") {
    return (
      returnAllStats(a, numberGames).mediaGolsFeitosC -
      returnAllStats(b, numberGames).mediaGolsFeitosC
    );
  } else if (sort === "Média de gols feitos em casa (melhor)") {
    return (
      returnAllStats(b, numberGames).mediaGolsFeitosC -
      returnAllStats(a, numberGames).mediaGolsFeitosC
    );
  } else if (sort === "Média de gols sofridos em casa (melhor)") {
    return (
      returnAllStats(a, numberGames).mediaGolsSofridosC -
      returnAllStats(b, numberGames).mediaGolsSofridosC
    );
  } else if (sort === "Média de gols sofridos em casa (pior)") {
    return (
      returnAllStats(b, numberGames).mediaGolsSofridosC -
      returnAllStats(a, numberGames).mediaGolsSofridosC
    );
  } else if (sort === "Média de chutes ao gol em casa (melhor)") {
    return (
      returnAllStats(b, numberGames).mediaChutesC -
      returnAllStats(a, numberGames).mediaChutesC
    );
  } else if (sort === "Média de chutes ao gol em casa (pior)") {
    return (
      returnAllStats(a, numberGames).mediaChutesC -
      returnAllStats(b, numberGames).mediaChutesC
    );
  } else if (sort === "Saldo de gols fora de casa (pior)") {
    return (
      returnAllStats(a, numberGames).sgTotalF -
      returnAllStats(b, numberGames).sgTotalF
    );
  } else if (sort === "Saldo de gols fora de casa (melhor)") {
    return (
      returnAllStats(b, numberGames).sgTotalF -
      returnAllStats(a, numberGames).sgTotalF
    );
  } else if (sort === "Média de gols feitos fora de casa (pior)") {
    return (
      returnAllStats(a, numberGames).mediaGolsFeitosF -
      returnAllStats(b, numberGames).mediaGolsFeitosF
    );
  } else if (sort === "Média de gols feitos fora de casa (melhor)") {
    return (
      returnAllStats(b, numberGames).mediaGolsFeitosF -
      returnAllStats(a, numberGames).mediaGolsFeitosF
    );
  } else if (sort === "Média de gols sofridos fora de casa (melhor)") {
    return (
      returnAllStats(a, numberGames).mediaGolsSofridosF -
      returnAllStats(b, numberGames).mediaGolsSofridosF
    );
  } else if (sort === "Média de gols sofridos fora de casa (pior)") {
    return (
      returnAllStats(b, numberGames).mediaGolsSofridosF -
      returnAllStats(a, numberGames).mediaGolsSofridosF
    );
  } else if (sort === "Média de chutes ao gol fora de casa (melhor)") {
    return (
      returnAllStats(b, numberGames).mediaChutesF -
      returnAllStats(a, numberGames).mediaChutesF
    );
  } else if (sort === "Média de penaltis cobrados (melhor)") {
    return (
      returnAllStats(b, numberGames).penaltisNumeros -
      returnAllStats(a, numberGames).penaltisNumeros
    );
  } else if (sort === "Média de penaltis cobrados (pior)") {
    return (
      returnAllStats(a, numberGames).penaltisNumeros -
      returnAllStats(b, numberGames).penaltisNumeros
    );
  } else {
    return (
      returnAllStats(a, numberGames).mediaChutesF -
      returnAllStats(b, numberGames).mediaChutesF
    );
  }
}
