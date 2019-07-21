require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');

describe('reviewer routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates reviewer', () => {
    return request(app)
      .post('/api/v1/reviewer')
      .send({ 
        name: 'Siskel Roeper',
        company: 'PBS' })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Siskel Roeper',
          company: 'PBS',
          __v: 0
        });
      });
  });
  
  it('gets reviewer', async() => {
    const reviewer = await Reviewer.create([
      { name: 'Siskel Roeper',
        company: 'PBS' 
      }

    ]);

    return request(app)
      .get('/api/v1/reviewer')
      .then(res => {
        const reviewersJSON = JSON.parse(JSON.stringify(reviewer));
        reviewersJSON.forEach(reviewer => {
          expect(res.body).toContainEqual({ 
            name: reviewer.name, 
            _id: reviewer._id });
        });
      });
  });
  it('can update a reviwer by id', async() => {
    const reviewer = await Reviewer.create({
      name: 'Siskel Roeper',
      company: 'PBS' 
    });
    return request(app)
      .put(`/api/v1/reviewer/${reviewer._id}`)
      .send({ 
        name: 'Gene Roger', 
        company: 'SBP' })
      .then(res => {
        const reviewerJSON = JSON.parse(JSON.stringify(reviewer));
        expect(res.body).toEqual({
          ...reviewerJSON,
          _id: expect.any(String),
          name: 'Gene Roger',
          company: 'SBP',
          __v: 0
        });
      });
  });
});
    

