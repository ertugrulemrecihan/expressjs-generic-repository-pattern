import Bookmark from '../dataAccess/schemas/BookmarkSchema';
import IBookmarkModel = require('../model/interfaces/IBookmarkModel');
import BaseRepository = require('./base/BaseRepository');

class BookmarkRepository extends BaseRepository<IBookmarkModel> {
  constructor() {
    super(Bookmark);
  }
}

Object.seal(BookmarkRepository);
export = BookmarkRepository;
