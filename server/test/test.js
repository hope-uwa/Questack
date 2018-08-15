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
      .get('/api/v1/users/questions/1')
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
