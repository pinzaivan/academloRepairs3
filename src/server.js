require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config.js');
const initModel = require('./models/initModel');

db.authenticate()
  .then((res) => console.log('Database conected'))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then((res) => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
