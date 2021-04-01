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

  beforeEach(async () => {
    thesaurus.getThesaurusData = mockThesaurusCall;

    await request(app)
      .post('/api/v1/words')
      .send({ word: 'gregarious'});
  })

  it('adds a word to the database', async () => {
    thesaurus.getThesaurusData = mockThesaurusCall;
    const response = await request(app)
      .post('/api/v1/words')
      .send({ word: 'gregarious'});

    expect(response.body).toEqual({
        id: '2',
        word: 'gregarious',
        synonyms: expect.any(Array),
        antonyms: expect.any(Array),
        definition: expect.any(Array)
    });
  });

  it('gets all words from the database', async () => {
    const response = await request(app)
      .get('/api/v1/words');

    expect(response.body).toEqual([{
      id: '1',
      word: 'gregarious',
      synonyms: ['these', 'are', 'synonyms'],
      antonyms: ['these', 'are', 'antonyms'],
      definition: ['this is a definition']
}]);
  });

  it('gets a word by its ID', async () => {
    const response = await request(app)
      .get('/api/v1/words/1');

    expect(response.body).toEqual({
      id: '1',
      word: 'gregarious',
      synonyms: ['these', 'are', 'synonyms'],
      antonyms: ['these', 'are', 'antonyms'],
      definition: ['this is a definition']
});
  });

  it('updates a word in the database', async () => {
    const response = await request(app)
      .put('/api/v1/words/1')
      .send({ definition: ['this is a better definition']});

    expect(response.body).toEqual({
      id: '1',
      word: 'gregarious',
      synonyms: ['these', 'are', 'synonyms'],
      antonyms: ['these', 'are', 'antonyms'],
      definition: ['this is a better definition']
  });
  });

  it('deletes a word in the database', async () => {
    const response = await request(app)
      .delete('/api/v1/words/1');
    
    expect(response.body).toEqual({
      id: '1',
      word: 'gregarious',
      synonyms: ['these', 'are', 'synonyms'],
      antonyms: ['these', 'are', 'antonyms'],
      definition: ['this is a definition']
  });
  });

});
