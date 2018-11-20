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
        done();
      });
  });
  it('should not add an empty answer field', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Content of answer can not be empty');
        done();
      });
  });

  it('should not add no answer', (done) => {
    chai.request(app)
      .post(api)
      .set('Authorization', userToken)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Answer is required');
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
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return 201 for adding another question ', (done) => {
    const question = {
      title: 'Firing onclick event which triggers ',
      body: 'I amm trying to do this the elegant way, with jsdom '

    }
    chai.request(app)
      .post('/api/v1/questions')
      .set('Authorization', userToken)
      .send(question)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Question Added Successfully');
        expect(response.body.data).to.be.an('object');
        done();
      });
  });

  it('should return 201 for a successful post answer request ', (done) => {
    chai.request(app)
      .get('/api/v1/questions/story/answers')
      .set('Authorization', userToken)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('should return 201 for a successful post answer request ', (done) => {
    chai.request(app)
      .get('/api/v1/questions/2/answers')
      .set('Authorization', userToken)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        // if (error) return done(error);
        done();
      });
  });

  it('should return 201 for a successful post answer request ', (done) => {
    const goodAnswer = {
      body: 'this is an answer'
    }
    chai.request(app)
      .post('/api/v1/questions/2/answers')
      .set('Authorization', userToken)
      .send(goodAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Answer added successfully');
        expect(response.body).to.be.an('object');
        // if (error) return done(error);
        done();
      });
  });


});

describe('GET all answers endpoint', () => {

  it('should return a 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions/2/answers')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
  it('should return a 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions/2/answers/1')
      .set('Authorization', userToken)
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
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
        done();
      });
  });

});
describe('PUT endpoint for answers', () => {
  const api = '/api/v1/questions/1/answers/1';
  it('should require a token for authorisation ', (done) => {
    chai.request(app)
      .put(api)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal('You are unauthorised to make this request');
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
        done();
      });
  });

  it('should return 404 ', (done) => {
    chai.request(app)
      .put(api)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
  });

  it('should return 404 ', (done) => {
    chai.request(app)
      .put('/api/v1/questions/2/answers/1')
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
  });

  it('should return 404 ', (done) => {
    chai.request(app)
      .put('/api/v1/questions/2/answers/1')
      .set('Authorization', userToken)
      .send({ body: 'this is an' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
  });

});
