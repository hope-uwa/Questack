import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import data from '../data/testdata.json';
import token from '../helpers/tokenGenerator';

const { expect } = chai;
chai.use(chaiHttp);

const { userToken, wrongToken } = token;

describe('POST endpoint for voteup', () => {
  const api = '/api/v1/questions/1/answers/1/voteup';
  const wrongQuestionApi = '/api/v1/questions/hello/answers/1/voteup';
  const wrongAnswerApi = '/api/v1/questions/1/answers/hello/voteup';
  const noQuestionApi = '/api/v1/questions/1000/answers/1/voteup';
  const noAnswerApi = '/api/v1/questions/1/answers/1000/voteup';
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

  it('should return 400 if question ID is not an integer ', (done) => {
    chai.request(app)
      .post(wrongQuestionApi)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
  });
  it('should return 400 if answer ID is not an integer ', (done) => {
    chai.request(app)
      .post(wrongAnswerApi)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
  });

  it('should return 404 if question is not found ', (done) => {
    chai.request(app)
      .post(noQuestionApi)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('There is no question with that Question Id');

        done();
      });
  });

  it('should return 404 if answer is not found ', (done) => {
    chai.request(app)
      .post('/api/v1/questions/2/answers/4/voteup')
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('There is no answer with that Answer Id');
        done();
      });
  });

  it('should return 201 if voted Up ', (done) => {
    chai.request(app)
      .post('/api/v1/questions/2/answers/1/voteup')
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('You have successfully voted Up');
        done();
      });
  });


});
describe('POST endpoint for votedown', () => {
  const api = '/api/v1/questions/1/answers/1/votedown';
  const wrongQuestionApi = '/api/v1/questions/hello/answers/1/voteup';
  const wrongAnswerApi = '/api/v1/questions/1/answers/hello/voteup';
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

  it('should return 400 if question ID is not an integer ', (done) => {
    chai.request(app)
      .post(wrongQuestionApi)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        // expect(response.body.error).to.equal('Question Id must be an integer');

        done();
      });
  });
  it('should return 400 if answer ID is not an integer ', (done) => {
    chai.request(app)
      .post(wrongAnswerApi)
      .set('Authorization', userToken)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        // expect(response.body.error).to.equal('Answer Id must be an integer');

        done();
      });
  });
});
