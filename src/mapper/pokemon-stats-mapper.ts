import { StatsColors } from '@constants/styles/colors';

interface PokemonStat {
  name: string;
  value: number;
  effort: number;
}

export function convertPokemonStats(
  stats: PokemonStat[]
): { value: number; label: string; effort: number; color: string }[] {
  const statsCopy = [...stats];

  statsCopy.sort((a, b) => b.value - a.value);

  return stats.map(stat => {
    const index = statsCopy.indexOf(stat);

    let color = StatsColors.red; // Lowest

    if (index === 0 || index === 1) {
      color = StatsColors.green; // Highest
    } else if (index === 2 || index === 3) {
      color = StatsColors.yellow; // Medium
    }
    return {
      value: stat.value,
      label: stat.name,
      effort: stat.effort,
      color
    };
  });
}

export function getPokemonTotalStat(stats: PokemonStat[]): {
  value: number;
  label: string;
} {
  const totalValue = stats.reduce((total, stat) => total + stat.value, 0);

  return { value: totalValue, label: 'total' };
}
