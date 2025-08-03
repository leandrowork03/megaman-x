// src/utils/sigmaUnlock.js
export function verificarSigma(bosses) {
  return bosses.every((b) => b.defeated);
}

