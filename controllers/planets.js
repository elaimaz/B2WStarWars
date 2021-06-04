const planetsRouter = require('express').Router();

const getPlanet = require('../services/planets');
const Planet = require('../models/planet');

planetsRouter.get('/', async (request, response, next) => {
  const planets = await Planet.find({});
  response.json(planets);
});

planetsRouter.post('/', async (request, response, next) => {
  const { body } = request;

  if (body.planetName === undefined) {
    response.status(400).json();
  }

  if (body.climate === undefined) {
    body.climate = '';
  }

  if (body.terrain === undefined) {
    body.terrain = '';
  }

  const planetInfo = await getPlanet(body.planetName);

  if (planetInfo.results.length > 0) {
    body.numberInfilms = planetInfo.results[0].films.length;
  } else {
    body.numberInfilms = 0;
  }

  const planet = new Planet({
    planetName: body.planetName,
    climate: body.climate,
    terrain: body.terrain,
    moviesIn: body.numberInfilms,
  });

  const result = await planet.save();
  response.status(201).json(result);
});

planetsRouter.get('/:id', async (request, response, next) => {
  const planet = await Planet.findById(request.params.id);
  if (planet) {
    response.json(planet);
  } else {
    response.status(404);
  }
});

planetsRouter.delete('/:id', async (request, response, next) => {
  await Planet.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

planetsRouter.get('/name/:name', async (request, response, next) => {
  const planet = await Planet.findOne({ planetName: request.params.name });
  if (planet) {
    response.json(planet);
  } else {
    response.status(404).end();
  }
});

module.exports = planetsRouter;
