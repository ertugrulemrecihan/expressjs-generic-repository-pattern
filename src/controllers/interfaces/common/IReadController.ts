import express = require('express');

interface IReadController {
  fetchAll: express.RequestHandler;
  fetchByQuery: express.RequestHandler;
  findById: express.RequestHandler;
  findOneByQuery: express.RequestHandler;
}

export = IReadController;
