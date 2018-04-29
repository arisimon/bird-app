'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL ||
                      'mongodb://localhost/bird-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      'mongodb://localhost/test-bird-app';
exports.PORT = process.env.PORT || 8080;