import express = require('express');
import BookController = require('../../controllers/BookController');

var router = express.Router();
class BookRoutes {
  private _bookController: BookController;

  constructor() {
    this._bookController = new BookController();
  }
  get routes() {
    const controller = this._bookController;

    router.get('/', controller.search);
    router.get('/:id', controller.getBook);

    return router;
  }
}

Object.seal(BookRoutes);
export = BookRoutes;
