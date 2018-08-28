import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import data from '../data/testdata.json';

const { expect } = chai;
chai.use(chaiHttp);

const userToken = '';
const userToken2 = '';
const wrongToken = '';


// Adding an answer
describe('POST endpoint for answers', () => {
  const api = '/api/v1/questions/1/answers';
  const noQuestionApi = '/api/v1/questions/50/answers';
  const badEndpoint = '/api/v1/questions/hello/answers';
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('You are unauthorised to make this request');
        done();
      });
  });

  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', wrongToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Could not authenticate the provided token');
        done();
      });
  });
  it('should not add an empty answer', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Answer body can not be empty');
        done();
      });
  });

  it('should not add an empty answer', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', userToken)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Answer Body is required');
        done();
      });
  });



  it('should return 404 if question doesnt exist ', (done) => {
    chai.request(app)
      .post(noQuestionApi)
      .set('Authorization', userToken)
      .send(data.goodAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('There is no question with that Question ID');
        // expect(response.body.request).to.be.an('array');
        done();
      });
  });
  it('should return 400 ', (done) => {
    chai.request(app)
      .post(badEndpoint)
      .send(data.goodAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Question ID must be an integer');
        expect(response.body).to.be.an('object');
        // expect(response.body.request).to.be.an('array');
        done();
      });
  });

  it('should return 201 for a successful post request ', (done) => {
    chai.request(app)
      .post(api)
      .send(data.goodAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Answer added successfully');
        expect(response.body).to.be.an('object');
        // expect(response.body.request).to.be.an('array');
        done();
      });
  });


});

describe('GET all answers endpoint', () => {

  it('should return a 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions/1/answers')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return a 404', (done) => {
    chai.request(app)
      .get('/api/v1/questions/100/answers')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });


});




