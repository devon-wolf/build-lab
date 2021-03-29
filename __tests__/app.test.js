const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const thesaurus = require('../lib/utils/thesaurus');

jest.mock('../lib/utils/thesaurus.ts');

const mockThesaurusCall = jest.fn().mockResolvedValue({
      word: 'gregarious',
      synonyms: ['these', 'are', 'synonyms'],
      antonyms: ['these', 'are', 'antonyms'],
      definition: ['this is a definition']
});

describe('build-lab routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a word to the database', async () => {
    thesaurus.getThesaurusData = mockThesaurusCall;
    const response = await request(app)
      .post('/api/v1/words')
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
