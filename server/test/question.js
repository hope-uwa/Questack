import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import data from '../data/testdata.json';

const { expect } = chai;
chai.use(chaiHttp);



describe('Questions', () => {
  const getToken = {};
  let userToken = '';
  let userToken2 = ''
  const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTM1NTM4MDAzLCJleHAiOjE1MzU2MjQ0MDN9.GzWyIYEmMC6YY4y6jsWYItyONxMGYNgr2_ebQ8czOw';
  before((done) => {
    const user = {
      username: 'elpisuwa',
      email: 'elpisuwa@gmail.com',
      password: 'password'
    };
    const user2 = {
      username: 'uwaelpis',
      email: 'uwaelpis@gmail.com',
      password: 'password'
    };

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        getToken.token = res.body.token;
        userToken = getToken.token;
        done();
      });
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user2)
      .end((err, res) => {
        getToken.token1 = res.body.token;
        userToken2 = getToken.token1;
        done();
      });

  });
 console.log(getToken.token)
  describe('GET all questions endpoint', () => {

    it('should return a 200', (done) => {
      chai.request(app)
        .get('/api/v1/questions')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.answer)
          done();
        });
    });

  });

  describe('POST endpoint for questions', () => {
    const api = '/api/v1/questions';
    it('should require a token for authorisation ', (done) => {
      chai.request(app)
        .post(api)
        .send(data.noBodyQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.error).to.equal('You are unauthorised to make this request');
          done();
        });
    });

    it('should require a token for authorisation ', (done) => {
      chai.request(app)
        .post(api)
        .set('Authorization', wrongToken)
        .send(data.noBodyQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.error).to.equal('Could not authenticate the provided token');
          done();
        });
    });

    it('should not add a question with no title', (done) => {
      chai.request(app)
        .post(api)
        .set('Authorization', userToken)
        .send(data.noTitleQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });



    it('should not add a question with no body ', (done) => {
      chai.request(app)
        .post(api)
        .set('Authorization', userToken)
        .send(data.noBodyQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });



    it('should return 201 for a successful post request ', (done) => {
      chai.request(app)
        .post(api)
        .set('Authorization', userToken)
        .send(data.goodQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.message).to.equal('Question added successfully');
          expect(response.data).to.be.an('object');
          // expect(response.body.request).to.be.an('array');
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

    it('should return 404 if question doesnt exist ', (done) => {
      const noQuestionApi = '/api/v1/questions/100';
      chai.request(app)
        .get(noQuestionApi)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Question not found');
          // expect(response.body.request).to.be.an('array');
          done();
        });
    });
  });

 


  describe('DELETE endpoint for a question', () => {

    it('should require a token ', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/1')
        .send(data.noBodyQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('You are unauthorised to make this request');
          done();
        });
    });

    it('should require a correct token ', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/1')
        .set('Authorization', wrongToken)
        .send(data.noBodyQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.equal('Could not authenticate the provided token');
          done();
        });
    });
    it('should should return a 401 ', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/1')
        .set('Authorization', userToken2)
        .send(data.noBodyQuestion)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('You can not delete this question because you are not the author');
          done();
        });
    });

    it('should return a status 200', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/1')
        .set('Authorization', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Question has been deleted!');
          done();
        });
    });

    it('should return 404 if question doesnt exist ', (done) => {
      const noQuestionApi = '/api/v1/questions/100';
      chai.request(app)
        .delete(noQuestionApi)
        .set('Authorization', userToken)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Theres no question with that ID');

          done();
        });
    });

    it('should returns 401 if another user ', (done) => {
      const api = '/api/v1/questions/1';
      chai.request(app)
        .delete(api)
        .set('Authorization', userToken2)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('You can not delete this question because you are not the author');
          done();
        });
    });

  });

});

