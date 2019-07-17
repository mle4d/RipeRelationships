require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');

describe('studio tests', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studio')
      .send({ name: 'Studio Ghibli', address: { country: 'Japan' } })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Studio Ghibli',
          address: { country: 'Japan' },
          __v: 0
        });
      });
  });
  
  it('gets a studio', async() => {
    const studios = await Studio.create([
      { name: 'Studio Ghibli',
        address: { country: 'Japan' }
      }

    ]);

    return request(app)
      .get('/api/v1/studio')
      .then(res => {
        const studiosJSON = JSON.parse(JSON.stringify(studios));
        studiosJSON.forEach(studio => {
          expect(res.body).toContainEqual(studio);
        });
      });
  });

});

