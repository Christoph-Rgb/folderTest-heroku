'use strict';

const Donation = require('../models/donation');
const Boom = require('boom');
const utils = require('./utils');

exports.findAllDonations = {

  //open for donation-client
  // auth: {
  //   strategy: 'jwt',
  // },

  handler: function (request, reply) {
    Donation.find({}).populate('donor').populate('candidate').then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },
};

exports.findDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.find({ candidate: request.params.id }).then(donations => {
      reply(donations);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.makeDonation = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    const donation = new Donation(request.payload);
    donation.candidate = request.params.id;

    // const authorization = request.headers.authorization;

    const userInfo = utils.decodeToken(request.auth.token);

    donation.donor = userInfo.userId;

    // extract token, decode id and recover user id for donor.
    // donation.donor = ???

    // donation.donor = utils.getUserIdFromRequest(request);
    donation.save().then(newDonation => {
      newDonation.populate('donor').populate('candidate', (err, pop) => {
        if (err) {
          reply(Boom.badImplementation('error making donation'));
        }

        reply(newDonation).code(201);
      });
    }).catch(err => {
      reply(Boom.badImplementation('error making donation'));
    });
  },

};

exports.deleteAllDonations = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing Donations'));
    });
  },

};

exports.deleteDonationsForCandidate = {

  auth: {
    strategy: 'jwt',
  },

  handler: function (request, reply) {
    Donation.remove({ candidate: request.params.id }).then(donation => {
      reply(donation).code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};
