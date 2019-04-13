/* eslint-disable consistent-return */
// Import Bank account database
const { bankAccount } = require('../../models');
// Current user information
const currentUser = require('./utils');

// Create bank account
const transationHistory = (req, res) => {
  // Getting the current user object
  const user = currentUser(req.userId);

  if (!user) {
    // It is possible to have no user object but with valid token Forexample if header
    // contains a token with id of user not existing because user list was reset
    return res.status(401).json({
      status: 401,
      error: 'Token has expired, please login again!',
    });
  }

  // Check for bank account with the provided account number
  let accountObj = null;
  bankAccount.forEach((account) => {
    if (account.owner === req.userId) {
      accountObj = account;
    }
  });

  return res.status(201).json({
    status: 201,
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accountObj,
    },
  });
};

module.exports = transationHistory;