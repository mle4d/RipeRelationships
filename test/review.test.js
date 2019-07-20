require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Studio = require('../lib/models/Studio');

describe('review routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let film = null;
  let actor = null;
  let studio = null;
  let reviewer = null;

  beforeEach(async() => {
    reviewer = JSON.parse(JSON.stringify(await Reviewer.create ({
      name: 'Mle',
      company: 'the Mle company'
    })));
    actor = JSON.parse(JSON.stringify(await Actor.create({
      name: 'Danny'
    })));
    studio = JSON.parse(JSON.stringify(await Studio.create ({
      name: 'pixar'
    })));
    film = JSON.parse(JSON.stringify(await Film.create({
      title: 'The Darleeling Limited',
      studio: studio._id,
      release: 2007,
      cast: {
        actor: {
          _id: actor._id,
          name: actor.name
        }
      }
    })));
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
    
  it('creates review', async() => {
    return request(app)
      .post('/api/v1/review')
      .send({ 
        rating: 5,
        reviewer: reviewer._id,
        review: 'This film is fucking gr8',
        film: film._id
      })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer._id,
          review: 'This film is fucking gr8',
          film: film._id,
          __v: 0
        });
      });
  });
  it('gets review', async() => {
    const review = await Review.create(
      {
        rating: 4,
        reviewer: reviewer._id,
        review: 'This film is fucking gr8',
        film: film._id
      }
    );
      
    return request(app)
      .get('/api/v1/review')
      .then(res => {
        expect(res.body).toContainEqual({ 
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer._id,
          review: 'This film is fucking gr8',
          film: film._id });
      });
  });
});


