const constants = require('../constants.js');

// const { VALIDATION_ERROR,
//   UNAUTHORIZED,
//   FORBIDDEN,
//   NOT_FOUND,
//   SERVER_ERROR, } = constants;

const errorHandler = (err, req, res, next) => {

  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log("error code", res.statusCode);

  switch (statusCode) {

    case constants.INVALID_REQUEST:
      res.json({ title: "invalid request", message: err.message, stack: err.stack });
      break;

    case constants.UNAUTHORIZED:
      res.json({ title: "unauthorised", message: err.message, stack: err.stack });
      break;

    case constants.FORBIDDEN:
      res.json({ title: "forbidden", message: err.message, stack: err.stack });
      break;

    case constants.NOT_FOUND:
      res.json({ title: "not found", message: err.message, stack: err.stack });
      break;

    case constants.SERVER_ERROR:
      res.json({ title: "server error", message: err.message, stack: err.stack });
      break;

    case 200:
    default:
      res.json({ title: "something went wrong", message: err.message, stack: err.stack });
      break;

  }
}


module.exports = errorHandler;