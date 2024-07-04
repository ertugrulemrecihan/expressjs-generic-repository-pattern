import BookmarkRepository = require('../repository/BookmarkRepository');
import IBookmarkBusiness = require('./interfaces/IBookmarkBusiness');

class BookmarkBusiness implements IBookmarkBusiness {
  private _bookmarkRepository: BookmarkRepository;

  constructor() {
    this._bookmarkRepository = new BookmarkRepository();
  }

  fetchAll(
    callback: (error: any, result: any) => void,
    pagination: Partial<{ limit: number; offset: number }> = {}
  ) {
    this._bookmarkRepository.fetchAll(callback, {
      limit: pagination.limit,
      offset: pagination.offset,
    });
  }

  findById(id: number, callback: (error: any, result: any) => void) {
    this._bookmarkRepository.findById(id, callback);
  }

  fetchByQuery(
    query: Partial<any>,
    callback: (error: any, result: any) => void,
    pagination: Partial<{ limit: number; offset: number }> = {}
  ) {
    this._bookmarkRepository.fetchByQuery(query, callback, {
      limit: pagination.limit,
      offset: pagination.offset,
    });
  }

  findOneByQuery(
    query: Partial<any>,
    callback: (error: any, result: any) => void
  ) {
    this._bookmarkRepository.findOneByQuery(query, callback);
  }

  create(item: any, callback: (error: any, result: any) => void) {
    this._bookmarkRepository.create(item, callback);
  }

  update(id: number, item: any, callback: (error: any, result: any) => void) {
    this._bookmarkRepository.update(id, item, callback);
  }

  delete(id: number, callback: (error: any, result: any) => void) {
    this._bookmarkRepository.delete(id, callback);
  }
}

Object.seal(BookmarkBusiness);

export = BookmarkBusiness;
