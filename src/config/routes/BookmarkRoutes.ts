import express = require('express');
import BookmarkController = require('../../controllers/BookmarkController');
import authenticateMiddleware from '../middlewares/AuthenticateMiddleware';
import cache = require('../middlewares/CacheMiddleware');

var router = express.Router();
class BookmarkRoutes {
  private _bookmarkController: BookmarkController;

  constructor() {
    this._bookmarkController = new BookmarkController();
  }
  get routes() {
    const controller = this._bookmarkController;

    router.get(
      '/',
      authenticateMiddleware,
      cache(this._bookmarkController),
      controller.fetchMyBookmarks
    );
    router.post(
      '/:bookId',
      authenticateMiddleware,
      cache(this._bookmarkController),
      controller.toggleBookmark
    );

    return router;
  }
}

Object.seal(BookmarkRoutes);
export = BookmarkRoutes;
