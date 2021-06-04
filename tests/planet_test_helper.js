const Planet = require('../models/planet');

const initialPlanets = [
  {
    planetName: 'Tatooine',
    climate: 'arid',
    terrain: 'desert',
    moviesIn: 5,
  },
  {
    planetName: 'Alderaan',
    climate: 'temperate',
    terrain: 'grasslands, mountains',
    moviesIn: 2,
  },
  {
    planetName: 'Yavin IV',
    climate: 'temperate, tropical',
    terrain: 'jungle, rainforests',
    moviesIn: 1,
  },
];

const planetsInDB = async () => {
  const planets = await Planet.find({});
  return planets.map((planet) => planet.toJSON());
};

const newPlanet = {
  planetName: 'Hoth',
  climate: 'frozen',
  terrain: 'tundra, ice caves, mountain ranges',
};

const planetWithoutName = {
  climate: 'frozen',
  terrain: 'tundra, ice caves, mountain ranges',
};

const planetWithoutClimateAndTerrain = {
  planetName: 'Hoth',
};

const planetWithWrongNumOfFilms = {
  planetName: 'Hoth',
  climate: 'frozen',
  terrain: 'tundra, ice caves, mountain ranges',
  moviesIn: 36,
};

const nonExistingPlanet = {
  planetName: 'Arda',
  climate: 'temperate',
  terrain: 'grassland, hills, mountain ranges',
};

module.exports = {
  initialPlanets,
  planetsInDB,
  newPlanet,
  planetWithoutName,
  planetWithoutClimateAndTerrain,
  planetWithWrongNumOfFilms,
  nonExistingPlanet,
};
