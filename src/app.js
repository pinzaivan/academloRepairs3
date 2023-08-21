const express = require('express');
const morgan = require('morgan');
const globalErrorHandrler = require('./controllers/error.controller');
//rutas
const userRoutes = require('./routes/user.route');
const repairRoutes = require('./routes/repair.route');
const AppError = require('./utils/app.Error');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//rutas

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server, sorry !`, 404)
  );
});

app.use(globalErrorHandrler);

module.exports = app;
