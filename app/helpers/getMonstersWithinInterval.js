export default function getMonstersWithinInterval(monsters, intervalOption) {
  const intervals = {
    '30s': { time: 30 * 1000, message: '30 segundos' },
    '1m': { time: 60 * 1000, message: '1 minuto' },
    '5m': { time: 5 * 60 * 1000, message: '5 minutos' },
    '10m': { time: 10 * 60 * 1000, message: '10 minutos' },
    '30m': { time: 30 * 60 * 1000, message: '30 minutos' },
    '1h': { time: 60 * 60 * 1000, message: '1 hora' },
    '1d': { time: 24 * 60 * 60 * 1000, message: 'no dia' },
    'all': { time: 100 * 365 * 24 * 60 * 60 * 1000, message: 'sempre' }
  };

  const interval = intervals[intervalOption]?.time || 0;
  if (interval === 0) {
    return {
      message: "",
      monsters: [],
      count: 0
    };
  }

  const result = {
    message: "",
    monsters: [],
    count: 0
  };

  const seen = new Set();

  for (let i = 0; i < monsters.length; i++) {
    const monster1 = monsters[i];
    const date1 = new Date(monster1.summonedIn);

    const group = [monster1]; // Inicia o grupo com o monstro atual

    for (let j = i + 1; j < monsters.length; j++) { // j começa de i + 1 para evitar pares invertidos
      const monster2 = monsters[j];
      const date2 = new Date(monster2.summonedIn);

      if (Math.abs(date1 - date2) <= interval) {
        group.push(monster2);
      }
    }

    if (group.length > 1) {
      const groupIds = group.map(monster => monster.id).sort().join('-');
      if (!seen.has(groupIds)) {
        result.monsters.push({
          group: group,
          count: group.length
        });
        result.count += group.length;
        seen.add(groupIds);
      }
    }
  }

  result.message = `Monstros invocados dentro de ${intervals[intervalOption].message}: ${result.count}`;

  return result;
}
