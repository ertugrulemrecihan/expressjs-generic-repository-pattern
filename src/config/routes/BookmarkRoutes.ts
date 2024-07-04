import express = require('express');
import BookmarkController = require('../../controllers/BookmarkController');
import authenticateMiddleware from '../middlewares/AuthenticateMiddleware';

var router = express.Router();
class BookmarkRoutes {
  private _bookmarkController: BookmarkController;

  constructor() {
    this._bookmarkController = new BookmarkController();
  }
  get routes() {
    const controller = this._bookmarkController;

    router.get('/', authenticateMiddleware, controller.fetchMyBookmarks);
    router.post('/:bookId', authenticateMiddleware, controller.toggleBookmark);

    return router;
  }
}

Object.seal(BookmarkRoutes);
export = BookmarkRoutes;
