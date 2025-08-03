// src/utils/sigmaBattle.js
export function lutarContraSigma(playerPowers: string[], sigmaWeakness: string) {
  return playerPowers.includes(sigmaWeakness) ? "Vitória" : "Derrota";
}


