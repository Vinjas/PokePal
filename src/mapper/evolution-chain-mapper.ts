import { getIdFromUrl } from '@utils/get-id-from-url';

interface EvolutionDetails {
  trigger: { name: string };
}

interface Evolution {
  species: { name: string; url: string };
  evolution_details: EvolutionDetails[];
  evolves_to: Evolution[] | null;
}

interface EvolutionChain {
  species: { name: string; url: string };
  evolves_to: Evolution[];
}

export function evolutionChainMapper({ chain }: { chain: EvolutionChain }) {
  let currentOrder = 2;
  const orderMap = new Map<Evolution[], number>(); // Create a map to store orders for each branch

  function parseEvolutionBranch(branch: Evolution[]): any[] {
    const result: any[] = [];

    branch.forEach(evolvesTo => {
      const order = orderMap.get(branch) || currentOrder; // Get the order for the current branch
      orderMap.set(branch, order); // Store the order for the current branch

      const triggers: string[] = [];

      evolvesTo.evolution_details.forEach(evolutionDetail => {
        triggers.push(evolutionDetail.trigger.name);
      });

      result.push({
        order,
        name: evolvesTo.species.name,
        id: getIdFromUrl(evolvesTo.species.url),
        evolution_details: evolvesTo.evolution_details[0],
        trigger: triggers
      });

      if (evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
        // Increase order only for nested "evolves_to"
        currentOrder++;
        result.push(...parseEvolutionBranch(evolvesTo.evolves_to));
      }
    });
    return result;
  }

  const initialSpecies = {
    order: 1,
    name: chain.species.name,
    id: getIdFromUrl(chain.species.url),
    evolution_details: {},
    trigger: []
  };

  return [initialSpecies, ...parseEvolutionBranch(chain.evolves_to)];
}
