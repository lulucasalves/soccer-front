import { useSelector } from "react-redux";
import * as data from "~/data/games.json";
import { getMatchs } from "~/features/getMatchs";
import { returnAllStats } from "~/features/teamStats";
import { IRootState } from "~/redux";

export function Matches() {
  const { times, proximos_jogos } = data;
  const { numberGames, sort } = useSelector((auth: IRootState) => auth.filters);

  return (
    <div className="teams">
      {proximos_jogos.length &&
        proximos_jogos.map((teams, key) => {
          const teamsfiltered = times.filter((val) => {
            console.log(getMatchs(teams.casa));

            return (
              val.clube.replaceAll(" ", "") ===
              getMatchs(teams.casa).replaceAll(" ", "")
            );
          });

          const teamsfiltered2 = times.filter((val) => {
            console.log(getMatchs(teams.fora));

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
            penaltisNumeros,
          } = returnAllStats(teamsfiltered[0], numberGames);

          const {
            sgTotal: sgTotal2,
            mediaGolsFeitos: mediaGolsFeitos2,
            mediaGolsSofridos: mediaGolsSofridos2,
            mediaChutes: mediaChutes2,
            mediaCartoes: mediaCartoes2,
            sgTotalC: sgTotalC2,
            sgTotalF: sgTotalF2,
            mediaGolsFeitosC: mediaGolsFeitosC2,
            mediaGolsFeitosF: mediaGolsFeitosF2,
            mediaGolsSofridosC: mediaGolsSofridosC2,
            mediaGolsSofridosF: mediaGolsSofridosF2,
            mediaChutesC: mediaChutesC2,
            mediaChutesF: mediaChutesF2,
            clube: clube2,
            penaltisNumeros: penaltisNumeros2,
          } = returnAllStats(teamsfiltered2[0], numberGames);

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
                    <p>SG Total em casa: {sgTotalC.toFixed(1)}</p>
                  </div>
                  <div className="double">
                    <p>
                      Média de gols feitos em casa:{" "}
                      {mediaGolsFeitosC.toFixed(1)}
                    </p>
                    <p>
                      Média de gols sofridos em casa:{" "}
                      {mediaGolsSofridosC.toFixed(1)}
                    </p>
                  </div>
                </div>
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
                    <p>SG Total fora de casa: {sgTotalF2}</p>
                  </div>
                  <div className="double">
                    <p>
                      Média de gols feitos fora de casa:{" "}
                      {mediaGolsFeitosF2.toFixed(1)}
                    </p>
                    <p>
                      Média de gols sofridos fora de casa:{" "}
                      {mediaGolsSofridosF2.toFixed(1)}
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
