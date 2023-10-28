import { StatsColors } from '@constants/styles/colors';

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
  effort: number;
}

export function convertPokemonStats(
  stats: PokemonStat[]
): { value: number; label: string; effort: number; color: string }[] {
  const statsCopy = [...stats];

  statsCopy.sort((a, b) => b.base_stat - a.base_stat);

  return stats.map(stat => {
    const index = statsCopy.indexOf(stat);

    let color = StatsColors.red; // Lowest

    if (index === 0 || index === 1) {
      color = StatsColors.green; // Highest
    } else if (index === 2 || index === 3) {
      color = StatsColors.yellow; // Medium
    }
    return {
      value: stat.base_stat,
      label: stat.stat.name,
      effort: stat.effort,
      color
    };
  });
}

export function getPokemonTotalStat(stats: PokemonStat[]): {
  value: number;
  label: string;
} {
  const totalValue = stats.reduce((total, stat) => total + stat.base_stat, 0);

  return { value: totalValue, label: 'total' };
}
