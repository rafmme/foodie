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
        res.body.order.should.have.keys(
          'id', 'foodId',
          'customerId', 'quantity', 'createdAt',
          'updatedAt', 'deliveryAddress', 'status'
        );
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

describe('API endpoint GET /orders/', () => {
  it('it should successfully fetch all orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders/')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).to.equal('All orders fetched successfully');
        expect(res.body.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('orders');
        expect(res.body.orders).to.be.an('array');
        if (res.body.orders.length >= 1) {
          res.body.orders[0].should.have.keys(
            'orderId', 'food', 'totalPrice',
            'customer', 'quantity', 'createdAt',
            'updatedAt', 'deliveryAddress', 'status'
          );
          expect(res.body.orders[0].customer).to.be.an('object');
          expect(res.body.orders[0].food).to.be.an('object');
          res.body.orders[0].customer.should.have.keys(
            'userId', 'fullname', 'email'
          );
          res.body.orders[0].food.should.have.keys(
            'foodId', 'title', 'description',
            'price'
          );
          expect(res.body.orders[0].food.price * res.body.orders[0].quantity)
            .to.equal(res.body.orders[0].totalPrice);
        }
        done();
      });
  });
});
