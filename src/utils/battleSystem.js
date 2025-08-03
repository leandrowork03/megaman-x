// src/utils/battleSystem.js
export function verificarBatalha(boss, powerUsado) {
  if (boss.weakness === powerUsado) return "Vitória";
  return "Derrota";
}

