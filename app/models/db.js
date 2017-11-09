'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//test
//let dbURI = 'mongodb://localhost/donation';
// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGOLAB_URI;
// }

// let devDbUri = 'mongodb://mlabchris:mlabchris@ds141937.mlab.com:41937/donation-web';
let devDbUri = 'mongodb://localhost/donation';
let prodDbUri = 'mongodb://mlabchris:mlabchris@ds143707.mlab.com:43707/donation-web-prod';
let dbURI = '';

mongoose.connection.on('connected', function () {
  if (process.env.ENV == 'DEV') {
    var seeder = require('mongoose-seeder');
    const data = require('./data.json');
    const Donation = require('./donation');
    const User = require('./user');
    const Candiate = require('./candidate');
    seeder.seed(data, { dropDatabase: false, dropCollections: true }).then(dbData => {
      console.log('preloading Test Data');
      console.log(dbData);
    }).catch(err => {
      console.log(error);
    });
  }

});

if (process.env.ENV == 'DEV') {
  dbURI = devDbUri;
} else if (process.env.ENV == 'PROD') {
  dbURI = prodDbUri;
}
else {
  dbURI = prodDbUri;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
