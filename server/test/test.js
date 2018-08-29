import chaiHttp from 'chai-http';
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import data from '../data/testdata.json';

const request = supertest(app)
describe('useless api endpoint', () => {
  let token;
  before((done) => {
    request.post('/api/v1/auth/signup')
      .send({
        username: 'uwa',
        email: 'uwa@uwa.com',
        password: 'password'
      })
      .end((err, res) => {
        if (err) throw err;
        token = { access_token: res.body.token }
        done();
      });
  });

  it('add question', (done) => {
    request.post('/api/v1/questions')
      .send(data.goodQuestion)
      .query(token)
      .expect(201)
      .end((err, res) => {
        
        done();
      });
  });
});
