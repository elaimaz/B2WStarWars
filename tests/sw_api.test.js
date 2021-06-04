const mongoose = require('mongoose');

const getPlanet = require('../services/planets');

describe('Test star wars online api', () => {
  test('Seach existing planet name', async () => {
    const response = await getPlanet('Tatooine');

    const results = response.results.length;

    expect(results).toBeGreaterThanOrEqual(1);
  });

  test('Search for non existing planet name', async () => {
    const response = await getPlanet('Arda');

    const results = response.results.length;

    expect(results).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
