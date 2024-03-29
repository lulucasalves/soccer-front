import * as dataA from "~/data/games.json";

export function Players({
  filterTeam,
  filterPosition,
  sort,
  data,
  goodOptions,
}: {
  filterTeam: string;
  filterPosition: string;
  sort: string;
  data: any;
  goodOptions: boolean;
}) {
  const { times } = dataA;
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
            <th title="Média geral">MG</th>
            <th title="Média geral das últimas 5 partidas">MG5</th>
            <th title="Participações em gols">PG</th>
            <th title="Média desarmes">M DS</th>
            <th title="Média de finalizações">M F</th>
            <th title="Tempo jogado">T</th>
            <th title="Média em casa">MC</th>
            <th title="Média fora de casa">MF</th>
            <th title="Mínimo para valorizar">MV</th>
            <th title="Chance de gols">C G</th>
            <th title="Chance de não sofrer gol">C SG</th>
          </tr>
        </thead>

        <tbody>
          {data.atletas.length > 0 ? (
            data.atletas
              .map((val) => {
                if (val.pontuacao5) return val;
                else {
                  return { ...val, pontuacao5: 0 };
                }
              })
              .filter((val: { posicao_id: Number; clube_id: Number }) => {
                const status =
                  (filterPosition
                    ? Number(filterPosition) === val.posicao_id
                    : true) &&
                  (filterTeam ? Number(filterTeam) === val.clube_id : true);

                if (sort.includes("media-") && status) {
                  const [sort1, sort2, sort3, sort4] = sort.split("-");
                  console.log(sort3);

                  if (val[sort1][sort2][sort3][sort4] > 0) return val;
                } else if (status) {
                  return val;
                }
              })
              .sort((a: any, b: any) => {
                if (!sort.includes("-")) return b[sort] - a[sort];
                else if (sort.includes("media-")) {
                  const [sort1, sort2, sort3, sort4] = sort.split("-");
                  console.log(sort3);

                  return (
                    b[sort1][sort2][sort3][sort4] -
                    a[sort1][sort2][sort3][sort4]
                  );
                } else {
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
                  scout,
                  pontuacao5,
                }: any) => {
                  const clube = data.clubes[clube_id];
                  const posicao = data.posicoes[posicao_id];

                  const teamfiltered = times.filter(
                    (val) => val.id === clube_id
                  )[0];

                  let chanceGol =
                    posicao_id < 2
                      ? "-"
                      : teamfiltered.faz === 0
                      ? "Baixa"
                      : teamfiltered.faz === 1
                      ? "Media"
                      : teamfiltered.faz === 2
                      ? "Alta"
                      : "Muito Alta";

                  let chanceSG =
                    posicao_id > 3
                      ? "-"
                      : teamfiltered.sofre === 0
                      ? "Alta"
                      : teamfiltered.sofre === 1
                      ? "Média"
                      : "Baixa";
                  0;

                  function boaOpcao() {
                    return goodOptions
                      ? chanceGol.toLowerCase().includes("alta") ||
                          chanceSG.toLowerCase().includes("alta") ||
                          media_num > 8
                      : true;
                  }

                  if (
                    media_num > 2 &&
                    (status_id === 7 || status_id === 2) &&
                    boaOpcao()
                  )
                    return (
                      <tr key={atleta_id}>
                        <td>{clube.abreviacao}</td>
                        <td>{posicao.abreviacao.toUpperCase()}</td>
                        <td>{apelido}</td>
                        <td>{jogos_num}</td>
                        <td className={media_num > 4 ? "positive" : "negative"}>
                          {media_num}
                        </td>
                        <td
                          className={pontuacao5 > 4 ? "positive" : "negative"}
                        >
                          {pontuacao5 && jogos_num > 4
                            ? pontuacao5.toFixed(2)
                            : 0}
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
                        <td>
                          {scout["DS"]
                            ? (scout["DS"] / jogos_num).toFixed(2)
                            : 0}
                        </td>
                        <td>
                          {scout["FD"] && scout["FF"]
                            ? ((scout["FD"] + scout["FF"]) / jogos_num).toFixed(
                                2
                              )
                            : scout["FD"]
                            ? (scout["FD"] / jogos_num).toFixed(2)
                            : scout["FF"]
                            ? (scout["FF"] / jogos_num).toFixed(2)
                            : "0"}
                        </td>
                        <td>{gato_mestre.minutos_jogados}</td>
                        <td
                          className={
                            gato_mestre.media_pontos_mandante > 4
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
                            gato_mestre.media_pontos_visitante > 4
                              ? "positive"
                              : "negative"
                          }
                        >
                          {" "}
                          {gato_mestre.media_pontos_visitante
                            ? gato_mestre.media_pontos_visitante.toFixed(2)
                            : "-"}
                        </td>
                        {/* <td>{gato_mestre.media_minutos_jogados}</td> */}
                        <td
                          className={
                            minimo_para_valorizar >= media_num
                              ? "negative"
                              : "positive"
                          }
                        >
                          {minimo_para_valorizar}
                        </td>
                        <td>{chanceGol}</td>
                        <td>{chanceSG}</td>
                      </tr>
                    );
                }
              )
          ) : (
            <tr>
              <td>{data.atletas.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
