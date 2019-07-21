require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');


describe('film tests', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let studio = null;
  let actor = null;
  beforeEach(async() => {
    studio = JSON.parse(JSON.stringify(await Studio.create({ name: 'Miramax Films' })));
    actor = JSON.parse(JSON.stringify(await Actor.create({ name: 'Johnny Depp' })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates film', async() => {
    return request(app)
      .post('/api/v1/film')
      .send({ 
        title: 'Dead Man', 
        studio: studio._id, 
        release: 1996,
        cast: [{ 
          actor: actor._id,
          role: 'William Blake' }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Dead Man',
          studio: studio._id,
          release: 1996,
          cast: [{
            _id: expect.any(String),
            actor: actor._id,
            role: 'William Blake' }],
          __v: 0
        });
      });
  });
  
  it('gets film', async() => {
    const film = await Film.create([
      { title: 'Dead Man',
        studio: studio._id,
        release: 1996
      }
    ]);

    return request(app)
      .get('/api/v1/film')
      .then(res => {
        const filmsJSON = JSON.parse(JSON.stringify(film));
        filmsJSON.forEach(film => {
          expect(res.body).toContainEqual({ 
            title: film.title, 
            _id: film._id });
        });
      });
  });
  it('can delete a film by id', async() => {
    const film = await Film.create({
      title: 'Dead Man',
      studio: studio._id,
      release: 1996
    });
        
    return request(app)
      .delete(`/api/v1/film/${film._id}`)
      .then(res => {
        const filmJSON = JSON.parse(JSON.stringify(film));
        expect(res.body).toEqual({ 
          title: 'Dead Man', 
          _id: filmJSON._id });
      });
  });
});
    


// it('gets film by id', async() => {
//   const studio = await Film.create({
//     title: 'Dead Man',
//     studio: studio._id,
//     release: 1996
//   });

//   return request(app)
//     .get(`/api/v1/film/${film._id}`)
//     .then(res => {
//       const filmJSON = JSON.parse(JSON.stringify(film));
//       expect(res.body).toEqual({
//         ...filmJSON,
//         films: [{
//          _id: expect.any(String),
//          title: expect.any(String), 
//          release: expect.any(String) 
//        }]
//       });
//     });
