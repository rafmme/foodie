import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockUsers from './mockData/user';

chai.use(chaiHttp);
chai.should();

describe('API endpoint POST /auth/signup', () => {
  it('it should successfully sign up a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUsers[4])
      .then((res) => {
        res.should.have.status(201);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('token');
        expect(res.body.user).to.be.an('object');
        expect(res.body.token).to.be.an('string');
        expect(res.body.user.email).to.equal(mockUsers[4].email);
        expect(res.body.user.fullname).to.equal(mockUsers[4].fullname);
        res.body.should.have.property('message');
        expect(res.body.message).to.equal('User account created successfully');
        expect(res.body.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        done();
      });
  });
  it('it should not signup existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUsers[1])
      .then((res) => {
        res.should.have.status(409);
        expect(res.body.success).to.equal(false);
        expect(res.body.status).to.equal(409);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('error');
        expect(res.body.error).to.be.an('object');
        res.body.error.should.have.property('message');
        expect(res.body.error.message).to.equal('This email is already taken');
        done();
      });
  });
  it('it should return 400 bad request for empty sign up data', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUsers[0])
      .then((res) => {
        res.should.have.status(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.status).to.equal(400);
        res.body.should.have.property('error');
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.an('object');
        res.body.error.should.have.property('password');
        res.body.error.should.have.property('fullname');
        res.body.error.should.have.property('email');
        expect(res.body.error.password).to.equal('Password is required, must be between 8-20 characters');
        expect(res.body.error.email).to.equal('Email is required, and must be a valid email');
        expect(res.body.error.fullname).to.equal('Full Name is required, must be between 3-100 characters');
        done();
      });
  });
  it('it should return 400 bad request if password is not entered', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUsers[2])
      .then((res) => {
        res.should.have.status(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.status).to.equal(400);
        res.body.should.have.property('error');
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.an('object');
        res.body.error.should.have.property('password');
        expect(res.body.error.password).to.equal('Password is required, must be between 8-20 characters');
        done();
      });
  });
  it('it should return 400 bad request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUsers[3])
      .then((res) => {
        res.should.have.status(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.status).to.equal(400);
        res.body.should.have.property('error');
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.an('object');
        res.body.error.should.have.property('password');
        res.body.error.should.have.property('email');
        res.body.error.should.have.property('fullname');
        expect(res.body.error.password).to.equal('Password is required, must be between 8-20 characters');
        expect(res.body.error.email).to.equal('Email is required, and must be a valid email');
        expect(res.body.error.fullname).to.equal('Full Name is required, must be between 3-100 characters');
        done();
      });
  });
  it('it should return 400 bad request', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockUsers[5])
      .then((res) => {
        res.should.have.status(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.status).to.equal(400);
        res.body.should.have.property('error');
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.an('object');
        res.body.error.should.have.property('password');
        res.body.error.should.have.property('email');
        res.body.error.should.have.property('fullname');
        expect(res.body.error.password).to.equal('Password is required, must be between 8-20 characters');
        expect(res.body.error.email).to.equal('Email is required, and must be a valid email');
        expect(res.body.error.fullname).to.equal('Full Name is required, must be between 3-100 characters');
        done();
      });
  });
});
