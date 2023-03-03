const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();
const cwd = process.cwd();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
