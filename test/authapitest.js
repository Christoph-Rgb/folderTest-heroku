'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Auth API tests', function () {

  let users = fixtures.users;
  let candidates = fixtures.candidates;
  let newUser = fixtures.newUser;
  let newCandidate = fixtures.newCandidate;
  let donations = fixtures.donations;

  const donationService = new DonationService(fixtures.donationService);

  beforeEach(function () {
    // donationService.login(users[0]);

    //donationService.deleteAllUsers();
  });

  afterEach(function () {
    //donationService.deleteAllUsers();
    // donationService.logout();
  });

  test('login-logout', function () {
    var returnedCandidates = donationService.getCandidates();
    assert.isNull(returnedCandidates);

    const response = donationService.login(users[0]);
    returnedCandidates = donationService.getCandidates();
    assert.isNotNull(returnedCandidates);

    donationService.logout();
    returnedCandidates = donationService.getCandidates();
    assert.isNull(returnedCandidates);
  });

  test('make donation', function () {
    // const returnedUser = donationService.createUser(newUser);
    // assert.isNotNull(returnedUser);

    donationService.login(users[0]);

    const returnedCandidate = donationService.createCandidate(newCandidate);

    const donation = donationService.makeDonation(returnedCandidate._id, donations[0]);
    assert.isNotNull(donation);
    assert(donation.donor, users[0]._id);
    assert(donation.candidate, returnedCandidate._id);

    donationService.logout(users[0]);
  });
});
