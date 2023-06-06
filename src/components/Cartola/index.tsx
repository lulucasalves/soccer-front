import { useState } from "react";
import { Menu, Players } from "~/components";
import * as cartola from "~/data/cartola.json";

export function Cartola() {
  const [filterTeam, setFilterTeam] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [sort, setSort] = useState("media_num");
  const [goodOptions, setGoodOptions] = useState("true");
  const data = cartola;

  // useEffect(() => {
  //   setData(cartola);
  //   console.log(cartola);
  //   // (async () => {
  //   //   await axios
  //   //     .get(`https://api.cartola.globo.com/atletas/mercado`)
  //   //     .then(({ data }) => {
  //   //       // setData(data);
  //   //     })
  //   //     .catch((erro) => console.log(erro));
  //   // })();
  // }, []);

  return (
    <section className="container">
      <Menu />
      <div className="content">
        {data.atletas.length && (
          <div className="cartolaFilters">
            <select
              value={goodOptions}
              onChange={(e) => {
                setGoodOptions(e.target.value);
              }}
            >
              <option value="true">Recomendados</option>
              <option value="false">Todos</option>
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="media_num">Média Geral</option>
              <option value="gato_mestre-media_pontos_mandante">
                Média Casa
              </option>
              <option value="gato_mestre-media_pontos_visitante">
                Média Visitante
              </option>
              <option value='minimo_para_valorizar' >
                Mínimo para Valorizar
              </option>
            </select>
            <select
              value={filterPosition}
              onChange={(e) => {
                setFilterPosition(e.target.value);
              }}
            >
              <option value="">Todas</option>
              {[1, 2, 3, 4, 5].map((val, i) => (
                <option key={i} value={data.posicoes[val].id}>
                  {data.posicoes[val].nome}
                </option>
              ))}
            </select>
            <select
              value={filterTeam}
              onChange={(e) => {
                setFilterTeam(e.target.value);
              }}
            >
              <option value="">Todos</option>
              {[
                262, 263, 264, 265, 266, 267, 275, 276, 277, 280, 282, 283, 284,
                285, 290, 293, 294, 327, 356, 1371,
              ].map((val, i) => (
                <option key={i} value={data.clubes[val].id}>
                  {data.clubes[val].nome}
                </option>
              ))}
            </select>
          </div>
        )}
        <Players
          goodOptions={goodOptions === "true" ? true : false}
          sort={sort}
          filterTeam={filterTeam}
          filterPosition={filterPosition}
          data={data}
        />
      </div>
    </section>
  );
}
