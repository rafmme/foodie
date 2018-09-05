import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockOrders from './mockData/order';

chai.use(chaiHttp);
chai.should();

describe('API endpoint POST /orders/', () => {
  it('it should successfully place an order', (done) => {
    chai.request(app)
      .post('/api/v1/orders/')
      .send(mockOrders[0])
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('order');
        expect(res.body.order).to.be.an('object');
        res.body.order.should.have.keys('id', 'foodId',
          'customerId', 'quantity', 'createdAt',
          'updatedAt', 'deliveryAddress', 'status');
        expect(res.body.order.status).to.equal('pending');
        expect(res.body.message).to.equal('Order was made successfully');
        expect(res.body.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        done();
      });
  });
  it('it should return 400 Bad request if empty data is submitted', (done) => {
    chai.request(app)
      .post('/api/v1/orders/')
      .send(mockOrders[2])
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('error');
        expect(res.body.error).to.be.an('object');
        res.body.error.should.have.keys('foodId', 'customerId', 'deliveryAddress', 'quantity');
        expect(res.body.error.foodId)
          .to.equal('Food ID is required, must be an integer');
        expect(res.body.error.quantity)
          .to.equal('Quantity of food to order is required, must be an integer');
        expect(res.body.error.customerId)
          .to.equal('Customer ID is required, must be an integer');
        expect(res.body.error.deliveryAddress)
          .to.equal('Delivery address is required, must not be less than 3 characters');
        expect(res.body.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        done();
      });
  });
  it('it should return 400 Bad request', (done) => {
    chai.request(app)
      .post('/api/v1/orders/')
      .send(mockOrders[3])
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('error');
        expect(res.body.error).to.be.an('object');
        res.body.error.should.have.keys('foodId', 'customerId', 'deliveryAddress', 'quantity');
        expect(res.body.error.foodId)
          .to.equal('Food ID is required, must be an integer');
        expect(res.body.error.quantity)
          .to.equal('Quantity of food to order is required, must be an integer');
        expect(res.body.error.customerId)
          .to.equal('Customer ID is required, must be an integer');
        expect(res.body.error.deliveryAddress)
          .to.equal('Delivery address is required, must not be less than 3 characters');
        expect(res.body.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        done();
      });
  });
});
