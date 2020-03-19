const backendServerPort = 5000;
const secretKey = 'secretkey';
const successMessage = 'SUCCESSFUL!';
const failureMessage = 'UNABLE TO COMPLETE REQUEST';
const badRequestMessage = 'BAD REQUEST!';
const userNotFoundMessage = 'USER NOT FOUND!';
const tokenExpiration = '300s';
const invalidPasswordMessage = 'INVALID PASSWORD!';

module.exports = {
  backendServerPort,
  secretKey,
  successMessage,
  failureMessage,
  badRequestMessage,
  userNotFoundMessage,
  tokenExpiration,
  invalidPasswordMessage
};
