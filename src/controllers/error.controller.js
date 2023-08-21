const AppError = require('../utils/app.Error');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 🧨', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (!error.parent?.code) {
      error = err;
    }

    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map((err) => {
        return {
          field: err.path,
          message: err.message,
        };
      });

      error.message = 'Validation error';
      error.errors = validationErrors;
      sendErrorProd(error, res);
    } else {
      sendErrorProd(error, res);
    }
  }
  next();
};

module.exports = globalErrorHandler;
