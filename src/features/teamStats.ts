interface IValue {
  id: number;
  value: number;
}

export function returnAllStats(a: any, numberGames: number) {
  let countC = 0;
  let countF = 0;

  let sgTotal = 0;
  let jogosTotal = 0;
  let jogosChutesTotal = 0;
  let golsFeitos = 0;
  let golsSofridos = 0;
  let chutes = 0;
  let cartoes = 0;

  let sgTotalC = 0;
  let jogosTotalC = 0;
  let jogosChutesTotalC = 0;
  let golsFeitosC = 0;
  let golsSofridosC = 0;
  let chutesC = 0;

  let sgTotalF = 0;
  let jogosTotalF = 0;
  let jogosChutesTotalF = 0;
  let golsFeitosF = 0;
  let golsSofridosF = 0;
  let chutesF = 0;
  let penaltis = 0;

  a.casa.chutes_ao_gol.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      jogosChutesTotal += 1;
      chutes += value.value;
    }
    if (countC < numberGames) {
      jogosChutesTotalC += 1;
      chutesC += value.value;
      countC += 1;
    }
  });

  countC = 0;

  a.casa.cartoes.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      cartoes += 1;
    }
  });

  a.casa.gols_sofridos.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      sgTotal -= value.value;
      golsSofridos += value.value;
    }

    if (countC < numberGames) {
      sgTotalC -= value.value;
      golsSofridosC += value.value;

      countC += 1;
    }
  });

  countC = 0;

  a.fora.chutes_ao_gol.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      jogosChutesTotal += 1;
      chutes += value.value;
    }
    if (countF < numberGames) {
      jogosChutesTotalF += 1;
      chutesF += value.value;
      countF += 1;
    }
  });

  countF = 0;

  a.fora.cartoes.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      cartoes += 1;
    }
  });

  a.fora.gols_sofridos.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      sgTotal -= value.value;
      golsSofridos += value.value;
    }
    if (countF < numberGames) {
      sgTotalF -= value.value;
      golsSofridosF += value.value;
      countF += 1;
    }
  });

  countF = 0;

  a.fora.gols_feitos.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      jogosTotal += 1;
      sgTotal += value.value;
      golsFeitos += value.value;
    }

    if (countF < numberGames) {
      jogosTotalF += 1;
      sgTotalF += value.value;
      golsFeitosF += value.value;

      countF += 1;
    }
  });

  countF = 0;

  a.casa.gols_feitos.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      jogosTotal += 1;
      sgTotal += value.value;
      golsFeitos += value.value;
    }
    if (countC < numberGames) {
      jogosTotalC += 1;
      sgTotalC += value.value;
      golsFeitosC += value.value;

      countC += 1;
    }
  });

  countC = 0;

  a.ultimos_batedores_de_penalti.forEach((value: IValue) => {
    if (value.id <= numberGames) {
      penaltis += 1;
    }
  });

  let mediaGolsFeitos = golsFeitos / jogosTotal;
  let mediaGolsSofridos = golsSofridos / jogosTotal;
  let mediaChutes = chutes / jogosChutesTotal;

  let mediaGolsFeitosC = golsFeitosC / jogosTotalC;
  let mediaGolsSofridosC = golsSofridosC / jogosTotalC;
  let mediaChutesC = chutesC / jogosChutesTotalC;

  let mediaGolsFeitosF = golsFeitosF / jogosTotalF;
  let mediaGolsSofridosF = golsSofridosF / jogosTotalF;
  let mediaChutesF = chutesF / jogosChutesTotalF;
  let mediaCartoes = cartoes / jogosTotal;
  const clube = a.clube;
  const penaltisNumeros = penaltis / jogosTotal;

  return {
    mediaCartoes,
    mediaChutesF,
    mediaGolsSofridosF,
    mediaGolsFeitosF,
    mediaChutesC,
    mediaGolsSofridosC,
    mediaGolsFeitosC,
    mediaChutes,
    mediaGolsSofridos,
    mediaGolsFeitos,
    sgTotal,
    sgTotalC,
    sgTotalF,
    clube,
    penaltisNumeros,
  };
}
