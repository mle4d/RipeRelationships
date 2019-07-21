require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
// const Review = require('../lib/models/Review');
// const Studio = require('../lib/models/Studio');
// const Actor = require('../lib/models/Actor');
// const Film = require('../lib/models/Film');

describe('reviewer routes', () => {
  beforeAll(() => {
    connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  // let studio = null;
  // let film = null;
  // beforeEach(async() => {
  //   studio = JSON.parse(JSON.stringify(await Studio.create({ name: 'Colombia Pictures' })));
  //   film = JSON.parse(JSON.stringify(await Film.create({ name: 'Girl Interrupted', release: 1999 })));
  // });
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
  it('can update a reviewer by id', async() => {
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
// it('gets reviewer by id', async() => {
//   const reviewer = await Reviewer.create({
//     name: 'Siskel Roeper',
//     company: 'PBS' 
//   });
//   // const studio = await Studio.create([{
//   //   name: 'Colombia Pictures',
//   //   address: { country: 'USA' }
//   // }]);
//   const actor = await Actor.create({
//     name: 'Winona Ryder',
//   });
//   const film = await Film.create([{ 
//     title: 'Girl Interrupted',
//     release: 1999,
//     studio: studio._id,
//     cast: [{
//       actor: actor._id
//     }]
//   }]);
//   await Review.create([{
//     rating: 5,
//     reviewer: reviewer._id,
//     review: 'I fucking love it'
//   }]);
//   return request(app)
//     .get(`/api/v1/reviewer/${reviewer._id}`)
//     .then(res => {
//       expect(res.body).toEqual({
//         _id: expect.any(String),
//         name: 'Siskel Roeper',
//         company: 'PBS',
//         reviews: [{
//           _id: expect.any(String),
//           rating: 5,
//           review: 'I fucking love it',
//           film: {
//             _id: expect.any(String),
//             title: film.title
//           } 
//         }]
//       });
//     });
// });
    

