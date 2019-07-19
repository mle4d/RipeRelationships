require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');

describe('actor tests', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates actor', () => {
    return request(app)
      .post('/api/v1/actor')
      .send({ 
        name: 'Timothy Olyphant', 
        dob: 'May 20th, 1968', 
        pob: 'Hawaii' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Timothy Olyphant',
          dob: 'May 20th, 1968',
          pob: 'Hawaii',
          __v: 0
        });
      });
  });
  
  it('gets actor', async() => {
    const actor = await Actor.create([
      { name: 'Timothy Olyphant',
        dob: 'May 20th, 1968',
        pob: 'Hawaii'
      }

    ]);

    return request(app)
      .get('/api/v1/actor')
      .then(res => {
        const actorsJSON = JSON.parse(JSON.stringify(actor));
        actorsJSON.forEach(actor => {
          expect(res.body).toContainEqual({ 
            name: actor.name, 
            _id: actor._id });
        });
      });
  });
  it('can update actor by id', async() => {
    const actor = await Actor.create({
      name: 'Timothy Olyphant',
      dob: 'May 20th, 1968',
      pob: 'Hawaii'
    });
    return request(app)
      .put(`/api/v1/actor/${actor._id}`)
      .send({ 
        name: 'Christina Ricci',
        dob: 'February, 12th, 1989',
        pob: 'California' })
      .then(res => {
        const actorJSON = JSON.parse(JSON.stringify(actor));
        expect(res.body).toEqual({
          ...actorJSON,
          _id: expect.any(String),
          name: 'Christina Ricci',
          dob: 'February, 12th, 1989',
          pob: 'California',
          __v: 0
        });
      });
  });
  it('can delete an actor by id', async() => {
    const actor = await Actor.create({
      name: 'Timothy Olyphant',
      dob: 'May 20th, 1968',
      pob: 'Hawaii'
    });
        
    return request(app)
      .delete(`/api/v1/actor/${actor._id}`)
      .then(res => {
        const actorJSON = JSON.parse(JSON.stringify(actor));
        expect(res.body).toEqual({ 
          name: 'Timothy Olyphant', 
          _id: actorJSON._id });
      });
  });
  it('gets actor by id', async() => {
    const actor = await Actor.create({
      name: 'Timothy Olyphant',
      dob: 'May 20th, 1968',
      pob: 'Hawaii'
    });
    const studio = await Studio.create({
      name: 'Laika'
    });
    await Film.create([{ 
      title: 'Missing Link',
      studio: studio._id,
      release: 2019,
      cast: [{
        actor: actor._id
      }]
    }]);
    return request(app)
      .get(`/api/v1/actor/${actor._id}`)
      .then(res => {
        const actorJSON = JSON.parse(JSON.stringify(actor));
        expect(res.body).toEqual({
          name: 'Timothy Olyphant',
          dob: 'May 20th, 1968',
          pob: 'Hawaii',
          film: [{
            _id: expect.any(String),
            title: 'Missing Link', 
            release: 2019
          }]
        });
      });
  });
});
  
