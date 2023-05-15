import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as data from "~/data/games.json";
import { getMatchs } from "~/features/getMatchs";
import { returnAllStats } from "~/features/teamStats";
import { IRootState } from "~/redux";

export function Matches() {
  const { times, proximos_jogos } = data;
  const { numberGames } = useSelector((auth: IRootState) => auth.filters);
  const [classification, setClassification] = useState(0);

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
            penaltisNumeros,
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
          } = returnAllStats(teamsfiltered2[0], numberGames);

          const resultC =
            (mediaGolsFeitos +
              mediaGolsSofridos2 +
              mediaGolsFeitosC +
              mediaGolsSofridosF2) /
              4 -
            0.1;

          const resultF =
            (mediaGolsFeitos2 +
              mediaGolsSofridos +
              mediaGolsFeitosF2 +
              mediaGolsSofridosC) /
              4 -
            0.1;

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
                <p className={sgDiff >= 9.5 ? "positive" : "negative"}>
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
                  Chance penalti: {penaltyDiff.toFixed(1)}
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
