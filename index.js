// file: index.js

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const keycloak = require('#middlewares/keycloak'); // Keycloak

const port = process.env.PORT;

// Routes
const testRoutes = require('#routes/test');
const menuItemsRoute = require('#routes/menuItems');

const errorHandler = (error, req, res, next) => {
  const status = error.status || 422;
  res.status(status).send(error.message);
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(keycloak.middleware());
app.use(express.json());

// Register routes
app.use('/api', testRoutes,menuItemsRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});





