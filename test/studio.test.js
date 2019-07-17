require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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
      . post('/api/v1/studios')
      .send({ name: 'Studio Ghibli', address: 'somehwere in Japan' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Studio Ghibli',
          address: 'somehwere in Japan',
          __v: 0
        });
      });
  });
});

// it('gets a studio', async() => {
//   const studio = await studio.create([

//   ]);

