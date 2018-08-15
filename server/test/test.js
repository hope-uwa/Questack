import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

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
