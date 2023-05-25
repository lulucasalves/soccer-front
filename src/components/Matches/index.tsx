import Image from "next/image";
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
      <h2>
        Análise e previsões baseado em último{numberGames > 1 ? "s " : " "}
        {numberGames > 1 ? numberGames : ""} jogo
        {numberGames > 1 ? "s" : ""}
      </h2>
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
            penaltisNumeros,
            escudo,
            lastGames,
          } = returnAllStats(teamsfiltered[0], numberGames);

          const {
            sgTotal: sgTotal2,
            mediaGolsFeitos: mediaGolsFeitos2,
            mediaGolsSofridos: mediaGolsSofridos2,
            mediaChutes: mediaChutes2,
            sgTotalF: sgTotalF2,
            mediaGolsFeitosF: mediaGolsFeitosF2,
            mediaGolsSofridosF: mediaGolsSofridosF2,
            mediaChutesF: mediaChutesF2,
            penaltisNumeros: penaltisNumeros2,
            escudo: escudo2,
            lastGames: lastGames2,
          } = returnAllStats(teamsfiltered2[0], numberGames);

          const resultC = (mediaGolsFeitosC + mediaGolsSofridosF2) / 2;

          const resultF = (mediaGolsFeitosF2 + mediaGolsSofridosC) / 2;

          const sgcasav = (sgTotal + sgTotalC - sgTotal2 - sgTotalF2) / 2;
          const sgforav = (sgTotal2 + sgTotalF2 - sgTotal - sgTotalC) / 2;

          const sgDiff = sgcasav >= sgforav ? sgcasav : sgforav;

          const goalChancev =
            (mediaGolsSofridos +
              mediaGolsFeitos2 +
              mediaGolsFeitosF2 +
              mediaGolsSofridosC) /
            4;
          const goalChancev2 =
            (mediaGolsSofridos2 +
              mediaGolsFeitos +
              mediaGolsFeitosC +
              mediaGolsFeitosF2) /
            4;

          const goalDiff =
            goalChancev <= goalChancev2 ? goalChancev : goalChancev2;

          const penaltyDiff =
            penaltisNumeros >= penaltisNumeros2
              ? penaltisNumeros
              : penaltisNumeros2;

          function indentifyGamesStatus(lastGames: any, id: number) {
            const gameS = lastGames.filter(
              (val: any) => val.id === id && val.status === "sofrido"
            )[0];
            const gameF = lastGames.filter(
              (val: any) => val.id === id && val.status === "feito"
            )[0];

            if (gameS.value > gameF.value) {
              return { className: "red", status: "D" };
            } else if (gameS.value < gameF.value) {
              return { className: "green", status: "V" };
            }

            return { className: "", status: "E" };
          }

          return (
            <div key={key} className="cards">
              <div className="card">
                <div className="team">
                  {/* {escudo ? (
                    <Image alt="" src={escudo} width={40} height={40} />
                  ) : null} */}
                  <p className="nome">{getMatchs(teams.casa)}</p>
                </div>
                <div className="last-games">
                  <p className={indentifyGamesStatus(lastGames, 1).className}>
                    {indentifyGamesStatus(lastGames, 1).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames, 2).className}>
                    {indentifyGamesStatus(lastGames, 2).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames, 3).className}>
                    {indentifyGamesStatus(lastGames, 3).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames, 4).className}>
                    {indentifyGamesStatus(lastGames, 4).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames, 5).className}>
                    {indentifyGamesStatus(lastGames, 5).status}
                  </p>
                  <p className="none">{">"}</p>
                </div>
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
                      Média chutes ao gol em casa: {mediaChutesC.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card result">
                <h2>
                  {Math.round(resultC)}x{Math.round(resultF)}
                </h2>
                <p
                  className={
                    sgDiff >= 1.9 * numberGames ? "positive" : "negative"
                  }
                >
                  {sgcasav >= sgforav ? teams.casa : teams.fora}{" "}
                  {Math.round(sgDiff)}+ sg
                </p>
                <p className={goalDiff < 1 ? "positive" : "negative"}>
                  {goalChancev <= goalChancev2 ? teams.casa : teams.fora} Chance
                  de levar gol: {goalDiff.toFixed(1)}
                </p>
                <p className={penaltyDiff >= 0.4 ? "positive" : "negative"}>
                  {penaltisNumeros >= penaltisNumeros2
                    ? teams.casa
                    : teams.fora}{" "}
                  Chance penalti: {parseInt(String(penaltyDiff * 100))}%
                </p>
              </div>
              <div className="card">
                <div className="team">
                  <p className="nome">{getMatchs(teams.fora)}</p>
                  {/* {escudo2 ? (
                    <Image alt="" src={escudo2} width={40} height={40} />
                  ) : null} */}
                </div>
                <div className="last-games">
                  <p className="none">{"<"}</p>
                  <p className={indentifyGamesStatus(lastGames2, 1).className}>
                    {indentifyGamesStatus(lastGames2, 1).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames2, 2).className}>
                    {indentifyGamesStatus(lastGames2, 2).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames2, 3).className}>
                    {indentifyGamesStatus(lastGames2, 3).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames2, 4).className}>
                    {indentifyGamesStatus(lastGames2, 4).status}
                  </p>
                  <p className={indentifyGamesStatus(lastGames2, 5).className}>
                    {indentifyGamesStatus(lastGames2, 5).status}
                  </p>
                </div>
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
                      Média chutes ao gol fora de casa:{" "}
                      {mediaChutesF2.toFixed(1)}
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
