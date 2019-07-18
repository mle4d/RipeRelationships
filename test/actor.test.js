/* eslint-disable no-unreachable */
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

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
      .send({ name: 'Timothy Olyphant', dob: 'May 20th, 1968', pob: 'Hawaii' })
      .then(res => {
        console.log(res.body);
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
});
    


// it('gets actor by id', async() => {
//   const studio = await Actor.create({
//     name: 'Timothy Olyphant',
//     dob: 'May 20th, 1968',
//     pob: 'Hawaii'
//   });

//   return request(app)
//     .get(`/api/v1/actor/${actor._id}`)
//     .then(res => {
//       const studioJSON = JSON.parse(JSON.stringify(actor));
//       expect(res.body).toEqual({
//         ...actorJSON,
//       });
//     });
