import Image from "next/image";
import { useSelector } from "react-redux";
import * as data from "~/data/games.json";
import { sortTeams } from "~/features/sortTeams";
import { returnAllStats } from "~/features/teamStats";
import { IRootState } from "~/redux";

export function Table() {
  const { times } = data;
  const { numberGames, sort } = useSelector((auth: IRootState) => auth.filters);

  return (
    <table className="table">
      <thead>
        <tr>
          <th title="Classificação">#</th>
          <th title="Nome do time">Time</th>
          <th
            className={sort.includes("Saldo de gols (") ? "active" : ""}
            title="Saldo de gols geral"
          >
            SG
          </th>
          <th
            className={sort.includes("Média de gols feitos (") ? "active" : ""}
            title="Média de gols feitos"
          >
            MGF
          </th>
          <th
            className={
              sort.includes("Média de gols sofridos (") ? "active" : ""
            }
            title="Média de gols sofridos"
          >
            MGS
          </th>
          <th
            className={
              sort.includes("Média de chutes ao gol (") ? "active" : ""
            }
            title="Média de chutes ao gol"
          >
            MCG
          </th>
          <th
            className={sort.includes("Média de cartões (") ? "active" : ""}
            title="Média de cartões"
          >
            C
          </th>
          <th
            className={sort.includes("Saldo de gols em casa (") ? "active" : ""}
            title="Saldo de gols em casa"
          >
            SGC
          </th>
          <th
            className={
              sort.includes("Média de gols feitos em casa (") ? "active" : ""
            }
            title="Média de gols feitos em casa"
          >
            MGFC
          </th>
          <th
            className={
              sort.includes("Média de gols sofridos em casa (") ? "active" : ""
            }
            title="Média de gols sofridos em casa"
          >
            MGSC
          </th>
          <th
            className={
              sort.includes("Média de chutes ao gol em casa (") ? "active" : ""
            }
            title="Média de chutes ao gol em casa"
          >
            MCC
          </th>
          <th
            className={
              sort.includes("Saldo de gols fora de casa (") ? "active" : ""
            }
            title="Saldo de gols fora de casa"
          >
            SGF
          </th>
          <th
            className={
              sort.includes("Média de gols feitos fora de casa (")
                ? "active"
                : ""
            }
            title="Média de gols feitos fora de casa"
          >
            MGFF
          </th>
          <th
            className={
              sort.includes("Média de gols sofridos fora de casa (")
                ? "active"
                : ""
            }
            title="Média de gols sofridos fora de casa"
          >
            MGSF
          </th>
          <th
            className={
              sort.includes("Média de chutes ao gol fora de casa (")
                ? "active"
                : ""
            }
            title="Média de chutes ao gol fora de casa"
          >
            MCF
          </th>
          <th
            className={
              sort.includes("Média de penaltis cobrados (") ? "active" : ""
            }
            title="Penaltis Cobrados"
          >
            MPC
          </th>
          <th title="Ultimo Batedor de penalti">UBP</th>
        </tr>
      </thead>
      <tbody>
        {times.length &&
          times
            .sort((a, b) => sortTeams(a, b, numberGames, sort))
            .map((val, i) => {
              const {
                sgTotal,
                mediaGolsFeitos,
                mediaGolsSofridos,
                mediaChutes,
                mediaCartoes,
                sgTotalC,
                sgTotalF,
                mediaGolsFeitosC,
                mediaGolsFeitosF,
                mediaGolsSofridosC,
                mediaGolsSofridosF,
                mediaChutesC,
                mediaChutesF,
                clube,
                escudo,
                penaltisNumeros,
              } = returnAllStats(val, numberGames);

              return (
                <tr key={clube}>
                  <td>{i + 1}º</td>
                  <td>
                    <div>
                      <Image alt="" src={escudo} width={20} height={20} />
                      <p>{clube}</p>
                    </div>
                  </td>
                  <td className={sgTotal > -1 ? "positive" : "negative"}>
                    {sgTotal}
                  </td>
                  <td
                    className={mediaGolsFeitos > 0.9 ? "positive" : "negative"}
                  >
                    {mediaGolsFeitos.toFixed(1)}
                  </td>
                  <td
                    className={
                      mediaGolsSofridos < 0.9 ? "positive" : "negative"
                    }
                  >
                    {mediaGolsSofridos.toFixed(1)}
                  </td>
                  <td>{mediaChutes.toFixed(1)}</td>
                  <td className={mediaCartoes < 2.9 ? "positive" : "negative"}>
                    {mediaCartoes.toFixed(1)}
                  </td>
                  <td className={sgTotalC > -1 ? "positive" : "negative"}>
                    {sgTotalC}
                  </td>
                  <td
                    className={mediaGolsFeitosC > 0.9 ? "positive" : "negative"}
                  >
                    {mediaGolsFeitosC.toFixed(1)}
                  </td>
                  <td
                    className={
                      mediaGolsSofridosC < 0.9 ? "positive" : "negative"
                    }
                  >
                    {mediaGolsSofridosC.toFixed(1)}
                  </td>
                  <td>{mediaChutesC.toFixed(1)}</td>
                  <td className={sgTotalF > -1 ? "positive" : "negative"}>
                    {sgTotalF}
                  </td>
                  <td
                    className={mediaGolsFeitosF > 0.9 ? "positive" : "negative"}
                  >
                    {mediaGolsFeitosF.toFixed(1)}
                  </td>
                  <td
                    className={
                      mediaGolsSofridosF < 0.9 ? "positive" : "negative"
                    }
                  >
                    {mediaGolsSofridosF.toFixed(1)}
                  </td>
                  <td>{mediaChutesF.toFixed(1)}</td>
                  <td className={penaltisNumeros > 0 ? "positive" : "negative"}>
                    {penaltisNumeros.toFixed(1)}
                  </td>
                  <td>
                    {val.ultimos_batedores_de_penalti.length
                      ? val.ultimos_batedores_de_penalti[0].value
                      : "-"}
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
}
