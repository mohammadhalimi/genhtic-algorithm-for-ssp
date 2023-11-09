function geneticSubsetSum(numbers, targetSum, populationSize, maxGenerations) {
  // Initialize population
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    let chromosome = [];
    for (let j = 0; j < numbers.length; j++) {
      chromosome.push(Math.round(Math.random()));
    }
    population.push(chromosome);
  }

  // Evaluate fitness of each chromosome
  let fitness = [];
  for (let i = 0; i < populationSize; i++) {
    let chromosome = population[i];
    let sum = 0;
    for (let j = 0; j < numbers.length; j++) {
      sum += chromosome[j] * numbers[j];
    }
    fitness.push(Math.abs(targetSum - sum));
  }

  // Main loop
  for (let generation = 0; generation < maxGenerations; generation++) {
    // Select parents for crossover
    let parents = [];
    for (let i = 0; i < populationSize; i++) {
      let parent1Index = Math.floor(Math.random() * populationSize);
      let parent2Index = Math.floor(Math.random() * populationSize);
      let parent1Fitness = fitness[parent1Index];
      let parent2Fitness = fitness[parent2Index];
      let parent1 = population[parent1Index];
      let parent2 = population[parent2Index];
      if (parent1Fitness < parent2Fitness) {
        parents.push(parent1);
      } else {
        parents.push(parent2);
      }
    }

    // Crossover
    let offspring = [];
    for (let i = 0; i < populationSize; i++) {
      let parent1Index = Math.floor(Math.random() * populationSize);
      let parent2Index = Math.floor(Math.random() * populationSize);
      let parent1 = parents[parent1Index];
      let parent2 = parents[parent2Index];
      let child = [];
      for (let j = 0; j < numbers.length; j++) {
        if (Math.random() < 0.5) {
          child.push(parent1[j]);
        } else {
          child.push(parent2[j]);
        }
      }
      offspring.push(child);
    }

    // Mutation
    for (let i = 0; i < populationSize; i++) {
      let chromosome = offspring[i];
      for (let j = 0; j < numbers.length; j++) {
        if (Math.random() < 0.01) {
          offspring[j] = 1 - chromosome[j];
        }
      }
    }

    // Evaluate fitness of offspring
    let offspringFitness = [];
    for (let i = 0; i < populationSize; i++) {
      let chromosome = offspring[i];
      let sum = 0;
      for (let j = 0; j < numbers.length; j++) {
        sum += chromosome[j] * numbers[j];
      }
      offspringFitness.push(Math.abs(targetSum - sum));
    }

    // Replace population with offspring
    for (let i = 0; i < populationSize; i++) {
      if (offspringFitness[i] < fitness[i]) {
        population[i] = offspring[i];
        fitness[i] = offspringFitness[i];
      }
    }
  }

  // Find best solution
  let bestFitness = Infinity;
  let bestChromosome = population[0];
  for (let i = 0; i < populationSize; i++) {
    let chromosome = population[i];
    let sum = 0;
    for (let j = 0; j < numbers.length; j++) {
      sum += chromosome[j] * numbers[j];
    }
    let chromosomeFitness = Math.abs(targetSum - sum);
    if (chromosomeFitness < bestFitness) {
      bestFitness = chromosomeFitness;
      bestChromosome = chromosome;
    }
  }

  // Extract subset from best chromosome
  let subset = [];
  for (let i = 0; i < numbers.length; i++) {
    if (bestChromosome[i] === 1) {
      subset.push(numbers[i]); 
    }
  }
  
 return subset;
}



let arr = [7 , 1 , 5 , 6 , 4];
let sum = 10;
let populationSize = 100;
let maxGenerations = 1000;
let subset = geneticSubsetSum(arr, sum, populationSize, maxGenerations);
console.log(subset);