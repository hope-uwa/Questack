import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const email = Math.random().toString(36).substring(2, 15);

describe('Authentication', () => {
  describe('Create account', () => {
    // Test user registration
    it('should register a user successfully', (done) => {
      const user = {
        username: 'uwaelpis',
        email: `${email}@gmail.com`,
        password: 'uwaelpis'
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          done();
        });

    });

    it('should not register a user if email is empty', (done) => {
      const user = {
        username: 'uwaelpis',
        email: '',
        password: 'uwaelpis'
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, response) => {
          expect(response.status).to.equal(400);

          done();
        });
    });

    it('should not register a user if password is empty', (done) => {
      const user = {
        username: 'uwaelpis',
        email: `${email}@gmail.com`,
        password: ''
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should not register a user if username is empty', (done) => {
      const user = {
        username: '',
        email: `${email}@gmail.com`,
        password: 'johndoe'
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    it('should not register a user if email already exists', (done) => {
      const user = {
        username: 'uwaelpis',
        email: 'uwaelpis007@gmail.com',
        password: 'password'
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, response) => {
          expect(response.status).to.equal(403);
          done();
        });
    });
  });

  describe('Login to account', () => {
    it('should log a user in successfully', (done) => {
      const details = {
        email: `${email}@gmail.com`,
        password: 'uwaelpis'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
    it('should not log a user in successfully when email is incorrect', (done) => {
      const details = {
        email: 'hopeelpis@gmail.com',
        password: 'uwaelpis'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('should not log a user in successfully when password is incorrect', (done) => {
      const details = {
        email: `${email}@gmail.com`,
        password: '87b f8aef'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('should not log a user in when password is empty', (done) => {
      const details = {
        email: `${email}@gmail.com`,
        password: ''
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should not log a user in when email is empty', (done) => {
      const details = {
        email: '',
        password: 'uwaelpis'
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(details)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
  });
});
