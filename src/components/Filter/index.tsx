import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "~/redux";
import { setGamesNumber, setSort } from "~/redux/filters";

export function Filter() {
  const { numberGames, sort } = useSelector((auth: IRootState) => auth.filters);
  const dispatch = useDispatch();

  const filtersDisponible = [
    "Saldo de gols (melhor)",
    "Saldo de gols (pior)",
    "Média de gols feitos (melhor)",
    "Média de gols feitos (pior)",
    "Média de gols sofridos (melhor)",
    "Média de gols sofridos (pior)",
    "Média de chutes ao gol (melhor)",
    "Média de chutes ao gol (pior)",
    "Média de cartões (melhor)",
    "Média de cartões (pior)",
    "Saldo de gols em casa (melhor)",
    "Saldo de gols em casa (pior)",
    "Média de gols feitos em casa (melhor)",
    "Média de gols feitos em casa (pior)",
    "Média de gols sofridos em casa (melhor)",
    "Média de gols sofridos em casa (pior)",
    "Média de chutes ao gol em casa (melhor)",
    "Média de chutes ao gol em casa (pior)",
    "Saldo de gols fora de casa (melhor)",
    "Saldo de gols fora de casa (pior)",
    "Média de gols feitos fora de casa (melhor)",
    "Média de gols feitos fora de casa (pior)",
    "Média de gols sofridos fora de casa (melhor)",
    "Média de gols sofridos fora de casa (pior)",
    "Média de chutes ao gol fora de casa (melhor)",
    "Média de chutes ao gol fora de casa (pior)",
    "Média de penaltis cobrados (melhor)",
    "Média de penaltis cobrados (pior)"
  ];

  return (
    <div className="filters">
      <select
        value={numberGames}
        onChange={(e) => {
          dispatch(setGamesNumber(parseInt(e.target.value)));
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
          <option key={val} value={val}>
           Dados dos Últimos {val}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => {
          dispatch(setSort(e.target.value));
        }}
      >
        {filtersDisponible.map((val) => (
          <option key={val} value={val}>
           Ordenar por {val}
          </option>
        ))}
      </select>
    </div>
  );
}
