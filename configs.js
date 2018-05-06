'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://ari:ari@ds113640.mlab.com:13640/birds'
                      || 'mongodb://localhost/bird-app';
exports.TESTDATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://ari:ari@ds113640.mlab.com:13640/birds'
                      || 'mongodb://localhost/bird-app';
exports.PORT = process.env.PORT || 8080;