import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('API endpoint GET /foods/', () => {
  it('it should successfully get all foods', (done) => {
    chai.request(app)
      .get('/api/v1/foods/')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.foods).to.be.an('array');
        if (res.body.foods.length > 0) {
          res.body.foods[0].should.have.keys('id', 'title', 'description', 'price', 'imageUrl', 'createdAt', 'updatedAt');
        }
        res.body.should.have.property('message');
        expect(res.body.message).to.equal('All available food items');
        expect(res.body.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  });
});

describe('API endpoint GET /foods/:id', () => {
  it('it should successfully fetch a specific food', (done) => {
    chai.request(app)
      .get('/api/v1/foods/1')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('Food was fetched successfully');
        expect(res.body.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('food');
        expect(res.body.food).to.be.an('object');
        res.body.food.should.have.keys(
          'id', 'title', 'description', 'price',
          'imageUrl', 'createdAt', 'updatedAt'
        );
        done();
      });
  });
  it('it should return 400 Bad request if id param is not an integer', (done) => {
    chai.request(app)
      .get('/api/v1/foods/helloworld')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.have.property('message');
        expect(res.body.error.message).to.equal('expects ID param to be an integer');
        done();
      });
  });
  it('it should return 404 Not Found if food doesn\'t exist', (done) => {
    chai.request(app)
      .get('/api/v1/foods/50203')
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.be.an('object');
        res.body.should.have.property('error');
        res.body.error.should.have.property('message');
        expect(res.body.error.message).to.equal('No Food matches the ID of 50203');
        done();
      });
  });
});
