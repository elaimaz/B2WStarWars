const planetsRouter = require('express').Router();

const getPlanet = require('../services/planets');
const Planet = require('../models/planet');

planetsRouter.get('/', async (request, response, next) => {
    try {
        const planets = await Planet.find({});
        response.json(planets);
    } catch (error) {
        next(error);
    }
});

planetsRouter.post('/', async (request, response, next) => {
    const body = request.body;

    if (body.planetName === undefined) {
        response.status(400).json();
    }

    if (body.climate === undefined) {
        body.climate = '';
    }

    if (body.terrain === undefined) {
        body.terrain = '';
    }

    try {
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
            moviesIn: body.numberInfilms
        });

        const result = await planet.save();
        response.status(201).json(result);
        
    } catch (error) {
        next(error);
    }
});

planetsRouter.get('/:id', async (request, response, next) => {
    try {
        const planet = await Planet.findById(request.params.id);
        if (planet) {
            response.json(planet);
        } else {
            response.status(404);
        }
    } catch (error) {
        next(error);
    }
});

planetsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Planet.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});

planetsRouter.get('/name/:name', async (request, response, next) => {
    try {
        const planet = await Planet.findOne({ planetName: request.params.name });
        if(planet) {
            response.json(planet);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

module.exports = planetsRouter;
