import IBookmarkModel from './interfaces/IBookmarkModel';

class BookmarkModel {
  private _bookmarkModel: IBookmarkModel;

  constructor(bookmarkModel: IBookmarkModel) {
    this._bookmarkModel = bookmarkModel;
  }

  get id(): number {
    return this._bookmarkModel.id;
  }

  get bookId(): string {
    return this._bookmarkModel.bookId;
  }
}

Object.seal(BookmarkModel);

export = BookmarkModel;
