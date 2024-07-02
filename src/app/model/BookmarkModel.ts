import IBookmarkModel from './interfaces/IBookmarkModel';

class BookmarkModel {
  private _bookmarkModel: IBookmarkModel;

  constructor(bookmarkModel: IBookmarkModel) {
    this._bookmarkModel = bookmarkModel;
  }

  get id(): number {
    return this._bookmarkModel.id;
  }

  get userId(): number {
    return this._bookmarkModel.user_id;
  }

  get bookId(): string {
    return this._bookmarkModel.book_id;
  }
}

Object.seal(BookmarkModel);

export = BookmarkModel;
