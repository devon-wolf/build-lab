const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('build-lab routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a word to the database', async () => {
    const response = await request(app)
      .post('/words')
      .send({ word: 'gregarious'});

    expect(response.body).toEqual({
        id: '1',
        word: 'gregarious',
        synonyms: expect.any(Array),
        antonyms: expect.any(Array),
        definition: expect.any(Array)
    });
  });
});
