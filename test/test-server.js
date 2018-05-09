'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const { PORT, TEST_DATABASE_URL } = require('../configs');
const { Observation, Species } = require('../models');

const { app, runServer, closeServer } = require('../server.js');

const expect = chai.expect;

chai.use(chaiHttp);


function seedData() {
    console.info('seeding data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
        seedData.push({
            bird: {
                scientific_name: faker.name,
                common_name: faker.name,
                family: faker.name,
            },
            location: {
                lat: faker.address.latitude(),
                lng: faker.address.longitude(),
                address: faker.address.streetAddress().city().stateAbbr().zipCode()
            },
            notes: {
                details: faker.lorem.paragraph()
            },
            photos: {
                files: [faker.system.fileType()],
                filename: faker.name,
                url: faker.internet.url()
            },
            obsDate: faker.date()
        });
    }
    return observation.insertMany(seedData);
}

function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}


describe('API endpoint tests=', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function() {
        return seedData();
    });
    afterEach(function() {
        return tearDownDb();
    });
    after(function() {
        return closeServer();
    });

    //test to make sure index page exists, returns 200 status code
    describe('index page', function() {
        it('should exist', function() {
            return chai.request(app)
                .get('/')
                .then(function(res) {
                    expect(res).to.have.status(200);
                });
        });
    })

    describe('GET species endpoint', function() {
        //test to make sure species page exists, returns 200 status code
        describe('species page', function() {
            it('should exist', function() {
                return chai.request(app)
                    .get('/api/species')
                    .then(function(res) {
                        expect(res).to.have.status(200);
                    });
            });
        })

        //test to make sure specific bird page exists, returns 200 status code
        describe('specific bird page', function() {
            it('should exist', function() {
                return chai.request(app)
                    .get('/api/species/:id')
                    .then(function(res) {
                        expect(res).to.have.status(200);
                    });
            });
        });
        it('should return JSON object on GET', function() {
            return chai.request(app)
                .get('/api/species')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.a('object');
                    expect(res.body.length).to.be.above(0);
                    res.body.forEach(function(item) {
                        expect(item).to.be.a('object');
                        expect(item).to.include.keys(
                            'id', 'scientific_name', 'common_name', 'family');
                    });
                });
        });
    })



    //test to make sure observations page exists, returns 200 status code
    describe('GET observations endpoint', function() {

        it('should return all observations on GET', function() {
            let res;
            return chai.request(app)
                .get('/observations')
                .then(function(_res) {
                    res = _res;
                    expect(res).to.have.status(200);
                });
        })

        it('should return JSON object on GET', function() {
            return chai.request(app)
                .get('/observations')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.a('object');
                    expect(res.body.length).to.be.above(0);
                    res.body.forEach(function(item) {
                        expect(item).to.be.a('object');
                        expect(item).to.include.keys(
                            'id', 'bird', 'location', 'notes', 'photos', 'obsDate');
                    });
                });
        });
    })

    // describe('POST observation endpoint', function() {

    //     it('should add a new observation on POST', function() {
    //         return chai.request(app)
    //             .observation('/')
    //             .type('form')
    //             .field('text', 'NEW observation')
    //             .attach('observationImg', './test/test_image.JPG', 'test_image.JPG')
    //             .then(function(res) {
    //                 expect(res).to.have.status(200);
    //                 return observation.find({ text: 'NEW observation' })
    //                     .then(function(observations) {
    //                         expect(observations).to.have.length(1)
    //                         expect(observations[0].image).to.include('test_image.JPG')
    //                         expect(observations[0].text).to.equal('NEW observation')
    //                         expect(observations[0].created).to.not.be.null
    //                     })
    //             })
    //     })
    // })

    // describe('PUT endpoint', function() {
    //     it('should update single observation on PUT observations id', function() {
    //         const updateData = {
    //             image: faker.image.imageUrl(),
    //             created: moment(new Date(Date.now())).format('MMM Do YYYY'),
    //             text: 'UPDATED_TEXT'
    //         };
    //         return observation.findOne()
    //             .then(function(observation) {
    //                 updateData.id = observation.id;
    //                 return chai.request(app)
    //                     .patch(`/observations/${observation.id}`)
    //                     .send(updateData)
    //                     .then(function(res) {
    //                         expect(res).to.have.status(204);
    //                         return observation.findById(updateData.id)
    //                             .then(function(observation) {
    //                                 expect(observation.image).to.equal(updateData.image);
    //                                 expect(observation.created).to.equal(updateData.created);
    //                                 expect(observation.text).to.equal(updateData.text);
    //                             });
    //                     });
    //             });
    //     });
    // })

    describe('DELETE endpoint', function() {
        it('should delete a single observation on DELETE', function() {
            let observation;
            return observation.findOne()
                .then(_observation => {
                    observation = _observation;
                    return chai.request(app)
                        .delete(`/observation/${observation.id}`)
                        .then(res => {
                            expect(res).to.have.status(204);
                            return Observation.findById(observation.id)
                                .then(_observation => {
                                    expect(_observation).to.not.exist;
                                });
                        });
                });
        });
    })
})