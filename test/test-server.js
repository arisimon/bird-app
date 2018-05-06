'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);

//test to make sure index page exists, returns 200 status code
describe('index page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

//test to make sure species page exists, returns 200 status code
describe('species page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/api/species')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

//test to make sure specific bird page exists, returns 200 status code
describe('specific bird page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/api/species/:id')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

//test to make sure observation pages exists, returns 200 status code
describe('observations page', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/observations')
      .then(function (res) {
        expect(res).to.have.status(200);
      });
  });
});

//test to check PUT request 