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
