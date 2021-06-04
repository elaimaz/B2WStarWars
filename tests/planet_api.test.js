const mongoose = require('mongoose');
const supertest = require('supertest');

const helper = require('./planet_test_helper');
const app = require('../app');
const Planet = require('../models/planet');

const api = supertest(app);

jest.setTimeout(10000);

beforeEach(async () => {
    await Planet.deleteMany({});

    const planetObjects = helper.initialPlanets
        .map(planet => new Planet(planet));
    
    const promiseArray = planetObjects
        .map(planet => planet.save());

    await Promise.all(promiseArray);
});

describe('Getting planets', () => {
    test('Get list of planets', async () => {
        const response = await api.get('/api/planets')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    
        expect(response.body).toHaveLength(helper.initialPlanets.length);
    });
});

describe('Adding new planets', () => {
    test('posting a new planet', async () => {
        await api.post('/api/planets')
        .send(helper.newPlanet)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const planets = await helper.planetsInDB();

        expect(planets).toHaveLength(helper.initialPlanets.length + 1);

        expect(planets[planets.length - 1].planetName).toContain(
            'Hoth'
        );

        expect(planets[planets.length - 1].moviesIn).toEqual(1);
    });

    test('posting a new planet without a name', async () => {
        await api.post('/api/planets')
        .send(helper.planetWithoutName)
        .expect(400)
        .expect('Content-Type', /application\/json/);

        const planets = await helper.planetsInDB();

        expect(planets).toHaveLength(helper.initialPlanets.length);
    });

    test('posting a planet without climate and terrain', async () => {
        await api.post('/api/planets')
        .send(helper.planetWithoutClimateAndTerrain)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const planets = await helper.planetsInDB();

        expect(planets).toHaveLength(helper.initialPlanets.length + 1);

        expect(planets[planets.length - 1].climate).toEqual('');

        expect(planets[planets.length - 1].terrain).toEqual('');
    });

    test('post a planet with wrong number of films in the body', async () => {
        await api.post('/api/planets')
        .send(helper.planetWithWrongNumOfFilms)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const planets = await helper.planetsInDB();

        expect(planets).toHaveLength(helper.initialPlanets.length + 1);

        expect(planets[planets.length - 1].moviesIn).toEqual(1);
    });

    test('post a planet that not exist in sw universe (yet...)', async () => {
        await api.post('/api/planets')
        .send(helper.nonExistingPlanet)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const planets = await helper.planetsInDB();

        expect(planets).toHaveLength(helper.initialPlanets.length + 1);

        expect(planets[planets.length - 1].planetName).toContain(
            'Arda'
        );

        expect(planets[planets.length - 1].moviesIn).toEqual(0);
    });
});

describe('Test getting planet by ID', () => {
    test('Get existing ID', async () => {
        const planets = await helper.planetsInDB();

        const id = planets[0].id;

        await api.get(`/api/planets/${id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('get non existing ID', async () => {
        await api.get('/api/planets/353453v3gc4f3d4')
        .expect(400);
    });
});

describe('Delete a planet', () => {
    test('Delete correct ID', async () => {
        const planets = await helper.planetsInDB();
        const planetToDelete = planets[0];

        await api.delete(`/api/planets/${planetToDelete.id}`)
        .expect(204);

        const planetsAfterDelete = await helper.planetsInDB();
        expect(planetsAfterDelete).toHaveLength(helper.initialPlanets.length - 1);
    });

    test('Delete malformated ID', async () => {
        await api.delete('/api/planets/malformatedId')
        .expect(400);
    });
});

describe('Search planets by it\'s name', () => {
    test('Search existing planet name in DB', async () => {
        const result = await api.get('/api/planets/name/Yavin IV')
        .expect(200);

        const body = result.body;

        expect(body.planetName).toEqual('Yavin IV');
    });

    test('Search non existing planet name in DB', async () => {
        await api.get('/api/planets/name/Arda')
        .expect(404);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
