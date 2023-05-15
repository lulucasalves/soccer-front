import { useSelector } from "react-redux";
import * as data from "~/data/games.json";
import { getMatchs } from "~/features/getMatchs";
import { returnAllStats } from "~/features/teamStats";
import { IRootState } from "~/redux";

export function Matches() {
  const { times, proximos_jogos } = data;
  const { numberGames } = useSelector((auth: IRootState) => auth.filters);

  return (
    <div className="teams">
      {proximos_jogos.length &&
        proximos_jogos.map((teams, key) => {
          const teamsfiltered = times.filter((val) => {
            return (
              val.clube.replaceAll(" ", "") ===
              getMatchs(teams.casa).replaceAll(" ", "")
            );
          });

          const teamsfiltered2 = times.filter((val) => {
            return (
              val.clube.replaceAll(" ", "") ===
              getMatchs(teams.fora).replaceAll(" ", "")
            );
          });

          const {
            sgTotal,
            mediaGolsFeitos,
            mediaGolsSofridos,
            mediaChutes,
            sgTotalC,
            mediaGolsFeitosC,
            mediaGolsSofridosC,
            mediaChutesC,
          } = returnAllStats(teamsfiltered[0], 5);

          const {
            sgTotal: sgTotal2,
            mediaGolsFeitos: mediaGolsFeitos2,
            mediaGolsSofridos: mediaGolsSofridos2,
            mediaChutes: mediaChutes2,
            sgTotalF: sgTotalF2,
            mediaGolsFeitosF: mediaGolsFeitosF2,
            mediaGolsSofridosF: mediaGolsSofridosF2,
            mediaChutesF: mediaChutesF2,
          } = returnAllStats(teamsfiltered2[0], 5);

          const generalResultC =
            (mediaGolsFeitos + mediaGolsSofridos2) / 2 - 0.1;

          const generalResultF =
            (mediaGolsSofridos + mediaGolsFeitos2) / 2 - 0.1;

          const resultC =
            ((mediaGolsFeitosC + mediaGolsSofridosF2) / 2 + generalResultC) /
              2 -
            0.1;
          const resultF =
            ((mediaGolsSofridosC + mediaGolsFeitosF2) / 2 + generalResultF) /
              2 -
            0.1;

          const sgTeam = sgTotal >= sgTotal2 ? teams.casa : teams.fora;
          const sgDiff =
            sgTotal >= sgTotal2 ? sgTotal - sgTotal2 : sgTotal2 - sgTotal;

          return (
            <div key={key} className="cards">
              <div className="card">
                <p className="nome">{getMatchs(teams.casa)}</p>
                <div className="contentMatches">
                  <div className="double">
                    <p
                      className={sgTotal >= sgTotal2 ? "positive" : "negative"}
                    >
                      SG Total: {sgTotal}
                    </p>
                    <p
                      className={
                        mediaGolsFeitos >= mediaGolsFeitos2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols feitos: {mediaGolsFeitos.toFixed(1)}
                    </p>
                  </div>
                  <div className="double">
                    <p
                      className={
                        mediaGolsSofridos <= mediaGolsSofridos2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols sofridos: {mediaGolsSofridos.toFixed(1)}
                    </p>
                    <p
                      className={
                        mediaChutes >= mediaChutes2 ? "positive" : "negative"
                      }
                    >
                      Média chutes ao gol: {mediaChutes.toFixed(1)}
                    </p>
                    <p
                      className={
                        sgTotalC >= sgTotalF2 ? "positive" : "negative"
                      }
                    >
                      SG Total em casa: {sgTotalC.toFixed(1)}
                    </p>
                  </div>
                  <div className="double">
                    <p
                      className={
                        mediaGolsFeitosC >= mediaGolsFeitosF2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols feitos em casa:{" "}
                      {mediaGolsFeitosC.toFixed(1)}
                    </p>
                    <p
                      className={
                        mediaGolsSofridosC <= mediaGolsSofridosF2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols sofridos em casa:{" "}
                      {mediaGolsSofridosC.toFixed(1)}
                    </p>
                    <p
                      className={
                        mediaChutesC >= mediaChutesF2 ? "positive" : "negative"
                      }
                    >
                      Média chutes ao gol: {mediaChutesC.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card result">
                <h2>
                  {Math.round(resultC)}x{Math.round(resultF)}
                </h2>
                <p className={sgDiff >= 10 ? "positive" : "negative"}>
                  {sgTeam} {sgDiff}+ sg
                </p>
              </div>
              <div className="card">
                <p className="nome">{getMatchs(teams.fora)}</p>
                <div className="contentMatches">
                  <div className="double">
                    <p
                      className={sgTotal <= sgTotal2 ? "positive" : "negative"}
                    >
                      SG Total: {sgTotal2}
                    </p>
                    <p
                      className={
                        mediaGolsFeitos <= mediaGolsFeitos2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols feitos: {mediaGolsFeitos2.toFixed(1)}
                    </p>
                  </div>
                  <div className="double">
                    <p
                      className={
                        mediaGolsSofridos >= mediaGolsSofridos2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols sofridos: {mediaGolsSofridos2.toFixed(1)}
                    </p>
                    <p
                      className={
                        mediaChutes <= mediaChutes2 ? "positive" : "negative"
                      }
                    >
                      Média chutes ao gol: {mediaChutes2.toFixed(1)}
                    </p>
                    <p
                      className={
                        sgTotalC <= sgTotalF2 ? "positive" : "negative"
                      }
                    >
                      SG Total fora de casa: {sgTotalF2}
                    </p>
                  </div>
                  <div className="double">
                    <p
                      className={
                        mediaGolsFeitosC <= mediaGolsFeitosF2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols feitos fora de casa:{" "}
                      {mediaGolsFeitosF2.toFixed(1)}
                    </p>
                    <p
                      className={
                        mediaGolsSofridosC >= mediaGolsSofridosF2
                          ? "positive"
                          : "negative"
                      }
                    >
                      Média de gols sofridos fora de casa:{" "}
                      {mediaGolsSofridosF2.toFixed(1)}
                    </p>
                    <p
                      className={
                        mediaChutesC <= mediaChutesF2 ? "positive" : "negative"
                      }
                    >
                      Média chutes ao gol: {mediaChutesF2.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
