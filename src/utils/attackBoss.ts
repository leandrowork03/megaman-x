// src/utils/attackBoss.ts
export function atacarBoss(boss: any, power: string) {
  const isWeakness = boss.weakness === power;
  const damage = isWeakness ? 20 : 10;
  const newHp = Math.max(boss.hp - damage, 0);
  const defeated = newHp <= 0;

  return {
    newHp,
    defeated,
    damage,
    isWeakness,
  };
}

