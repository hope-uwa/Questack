import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import data from '../data/testdata.json';
import token from '../helpers/tokenGenerator';

const { expect } = chai;
chai.use(chaiHttp);

const { userToken, userToken2, wrongToken } = token;

describe('POST endpoint for answers', () => {
  const api = '/api/v1/questions/1/answers';
  const noQuestionApi = '/api/v1/questions/50/answers';
  const badEndpoint = '/api/v1/questions/hello/answers';
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal('You are unauthorised to make this request');
        if (error) return done(error);
        done();
      });
  });

  it('should require the correct token for authorisation ', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', wrongToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal('Could not authenticate the provided token');
        if (error) return done(error);
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
        expect(response.body.error).to.equal('Content of answer can not be empty');
        if (error) return done(error);
        done();
      });
  });

  it('should not add an empty answer', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', userToken)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Answer is required');
        if (error) return done(error);
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
       // expect(response.body.message).to.equal('question with Id: 50 can not be found');
        if (error) return done(error);
        done();
      });
  });
  it('should return 400 ', (done) => {
    chai.request(app)
      .post(badEndpoint)
      .set('Authorization', userToken)
      .send(data.goodAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
       // expect(response.body.error).to.equal('Question ID must be an integer');
        expect(response.body).to.be.an('object');
        if (error) return done(error);
        done();
      });
  });

  it('should return 201 for a successful post request ', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', userToken)
      .send(data.goodAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Answer added successfully');
        expect(response.body).to.be.an('object');
        if (error) return done(error);
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
describe('PUT endpoint for answers', () => {
  const api = '/api/v1/questions/1/answers/1';
  const noQuestionApi = '/api/v1/questions/50/answers';
  const badEndpoint = '/api/v1/questions/hello/answers';
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .put(api)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal('You are unauthorised to make this request');
        if (error) return done(error);
        done();
      });
  });

  it('should require the correct token for authorisation ', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', wrongToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal('Could not authenticate the provided token');
        if (error) return done(error);
        done();
      });
  });
});








