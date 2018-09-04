import bcrypt from 'bcrypt';

/**
 * @description Generates a fake JWT token
 * @returns {string} token
 */
const generateFakeToken = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyODdmLTQxOTItYWIzYi04ZWI5ZGEwMT';
  return token;
};

/**
 * @description Encrypts password
 * @param {string} password
 * @returns {string} encrypted password
 */
const encryptPassword = (password) => {
  const encryptedPassword = bcrypt.hashSync(password, 10);
  return encryptedPassword;
};

/**
 * @description Compares password to see if it is a match
 * @param {string} encryptedPassword
 * @param {string} password
 * @returns {boolean} true if the password matches
 */
const checkIfPasswordMatch = (encryptedPassword, password) => {
  const isAMatch = bcrypt.compareSync(password, encryptedPassword);
  return isAMatch;
};

export {
  encryptPassword,
  checkIfPasswordMatch,
  generateFakeToken
};
