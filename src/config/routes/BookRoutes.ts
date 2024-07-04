import express = require('express');
import BookController = require('../../controllers/BookController');
import cache = require('../middlewares/CacheMiddleware');

var router = express.Router();
class BookRoutes {
  private _bookController: BookController;

  constructor() {
    this._bookController = new BookController();
  }
  get routes() {
    const controller = this._bookController;

    router.get('/', cache(this._bookController), controller.search);
    router.get('/:id', cache(this._bookController), controller.getBook);

    return router;
  }
}

Object.seal(BookRoutes);
export = BookRoutes;
