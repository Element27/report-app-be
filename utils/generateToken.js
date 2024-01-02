
const jwt = require('jsonwebtoken');

// TODO add company detials and user name
const generateToken = (details) => {
  // user data should contain email, id, role, company id, company name, user name

  // generate access token and refresh token
  const accessToken = jwt.sign({ details }, process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '24h' }
  );

  // const refreshToken = jwt.sign(
  //   { email: userData.email, id: userData.id, role: userData.role },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   { expiresIn: '5m' }
  // );

  return { accessToken };
}

module.exports = generateToken;