require('dotenv').config();
import express = require('express');
import cors = require('cors');
import MiddlewaresBase = require('./config/middlewares/base/MiddlewareBase');
import ErrorHandler from './config/middlewares/ErrorHandler';

const app = express();
const port = parseInt(process.env.PORT as string) || 3000;

app.use(
  cors({
    origin: '*',
  })
);
app.use(MiddlewaresBase.configuration);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} 🚀`);
});
