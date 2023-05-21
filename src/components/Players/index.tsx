import { useEffect, useState } from "react";

export function Players({
  filterTeam,
  filterPosition,
  sort,
  data,
}: {
  filterTeam: string;
  filterPosition: string;
  sort: string;
  data: any;
}) {
  return (
    <div className="players">
      Todos Jogadores tem no mínimo média 3, participação em 3 jogos e 70
      minutos em média no campo
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Posição</th>
            <th>Jogador</th>
            <th>Jogos</th>
            <th>Preço</th>
            <th>Média Geral</th>
            <th>Participações (gols)</th>
            <th>Média Casa</th>
            <th>Média Fora</th>
            <th>Média Minutos Jogados</th>
            <th>Mínimo para valorizar</th>
          </tr>
        </thead>

        <tbody>
          {data.atletas.length ? (
            data.atletas
              .filter((val) => {
                console.log(filterTeam);
                const status =
                  (filterPosition
                    ? Number(filterPosition) === val.posicao_id
                    : true) &&
                  (filterTeam ? Number(filterTeam) === val.clube_id : true);

                if (status) return val;
              })
              .sort((a, b) => {
                if (!sort.includes("-")) return b[sort] - a[sort];
                else {
                  const [sort1, sort2] = sort.split("-");
                  return b[sort1][sort2] - a[sort1][sort2];
                }
              })
              .map(
                ({
                  atleta_id,
                  clube_id,
                  apelido,
                  media_num,
                  jogos_num,
                  gato_mestre,
                  minimo_para_valorizar,
                  posicao_id,
                  status_id,
                  preco_num,
                  scout,
                }) => {
                  const clube = data.clubes[clube_id];
                  const posicao = data.posicoes[posicao_id];

                  if (
                    jogos_num > 2 &&
                    gato_mestre.media_minutos_jogados > 70 &&
                    media_num > 2 &&
                    status_id === 7
                  )
                    return (
                      <tr key={atleta_id}>
                        <td>{clube.nome}</td>
                        <td>{posicao.abreviacao.toUpperCase()}</td>
                        <td>{apelido}</td>
                        <td>{jogos_num}</td>
                        <td>C$ {preco_num}</td>
                        <td className={media_num > 5 ? "positive" : "negative"}>
                          {media_num}
                        </td>
                        <td>
                          {scout["A"] && scout["G"]
                            ? scout["A"] + scout["G"]
                            : scout["A"]
                            ? scout["A"]
                            : scout["G"]
                            ? scout["G"]
                            : "0"}
                        </td>
                        <td
                          className={
                            gato_mestre.media_pontos_mandante > 5
                              ? "positive"
                              : "negative"
                          }
                        >
                          {gato_mestre.media_pontos_mandante
                            ? gato_mestre.media_pontos_mandante.toFixed(2)
                            : "-"}
                        </td>
                        <td
                          className={
                            gato_mestre.media_pontos_visitante > 5
                              ? "positive"
                              : "negative"
                          }
                        >
                          {" "}
                          {gato_mestre.media_pontos_visitante
                            ? gato_mestre.media_pontos_visitante.toFixed(2)
                            : "-"}
                        </td>
                        <td>{gato_mestre.media_minutos_jogados}</td>
                        <td
                          className={
                            minimo_para_valorizar >= media_num
                              ? "negative"
                              : "positive"
                          }
                        >
                          {minimo_para_valorizar}
                        </td>
                      </tr>
                    );
                }
              )
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
