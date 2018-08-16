import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import data from '../data/testdata.json';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET all questions endpoint', () => {

  it('should return a 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        done();
      });
  });

});

describe('GET endpoint for a question', () => {
  it('should return an 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions/2')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('POST endpoint for questions', () => {
  const api = '/api/v1/questions';
  it('should not add a question with no title', (done) => {
    chai.request(app)
      .post(api)
      .send(data.noTitleQuestion)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
        expect(response.body.error).to.equal('Bad Request');
        done();
      });
  });

  it('should not add a question with no body ', (done) => {
    chai.request(app)
      .post(api)
      .send(data.noBodyQuestion)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
        expect(response.body.error).to.equal('Bad Request');
        done();
      });
  });



  it('should return 201 for a successful post request ', (done) => {
    chai.request(app)
      .post(api)
      .send(data.goodQuestion)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Question added successfully');
        expect(response.body).to.be.an('object');
        // expect(response.body.request).to.be.an('array');
        done();
      });
  });
});


// Adding an answer
describe('POST endpoint for answers', () => {
  const api = '/api/v1/questions/1/answers';
  const noQuestionApi = '/api/v1/questions/50/answers';
  it('should not add an empty answer', (done) => {
    chai.request(app)
      .post(api)
      .send(data.noContentAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('An Empty field found, Please fill up all fields');
        expect(response.body.error).to.equal('Bad Request');
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

  it('should return 404 if question doesnt exist ', (done) => {
    chai.request(app)
      .post(noQuestionApi)
      .send(data.goodAnswer)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Question not found');      
        // expect(response.body.request).to.be.an('array');
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
        expect(response.body).to.be.an('array');
        done();
      });
  });

});

describe('DELETE endpoint for a question', () => {

  it('should return an 200', (done) => {
    chai.request(app)
      .delete('/api/v1/questions/2')
      .end((error, response) => {
        expect(response.status).to.equal(204);
        expect(response.body.message).to.equal('Question has been deleted!');
        done();
      });
  });
});
