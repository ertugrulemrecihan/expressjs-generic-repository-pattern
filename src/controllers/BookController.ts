import { Request, Response } from 'express';
import { books_v1, google } from 'googleapis';
import ApiDataSuccess from '../config/responses/success/ApiDataSuccess';
import httpStatus from 'http-status';
import RedisHelper from '../config/helpers/redis/RedisHelper';

class BookController {
  readonly books: books_v1.Books;

  constructor() {
    this.books = google.books({
      version: 'v1',
      auth: process.env.GOOGLE_API_KEY,
    });

    this.search = this.search.bind(this);
    this.getBook = this.getBook.bind(this);
  }

  async search(req: Request, res: Response) {
    const { search, limit, page } = req.query;

    if (search === undefined || search === '') {
      return ApiDataSuccess.sendData(
        [],
        'Books fetched successfully',
        httpStatus.OK,
        res
      );
    }

    const booksList = await this.books.volumes.list({
      q: search as string,
      maxResults: parseInt(limit as string) || 15,
      startIndex: parseInt(page as string) || 0,
    });

    if (booksList.data.items) {
      booksList.data.items = booksList.data.items.map(
        (book: books_v1.Schema$Volume): books_v1.Schema$Volume => {
          return {
            id: book.id,
            volumeInfo: {
              title: book.volumeInfo?.title,
              authors: book.volumeInfo?.authors,
              publisher: book.volumeInfo?.publisher,
              publishedDate: book.volumeInfo?.publishedDate,
              description: book.volumeInfo?.description,
              pageCount: book.volumeInfo?.pageCount,
              categories: book.volumeInfo?.categories,
              imageLinks: book.volumeInfo?.imageLinks,
              language: book.volumeInfo?.language,
              infoLink: book.volumeInfo?.infoLink,
              canonicalVolumeLink: book.volumeInfo?.canonicalVolumeLink,
              previewLink: book.volumeInfo?.previewLink,
            },
            saleInfo: {
              country: book.saleInfo?.country,
              saleability: book.saleInfo?.saleability,
              isEbook: book.saleInfo?.isEbook,
            },
            accessInfo: {
              country: book.accessInfo?.country,
              webReaderLink: book.accessInfo?.webReaderLink,
            },
          };
        }
      );
    }

    const response = {
      ...booksList.data,
    };

    if (response.items && response.items?.length > 0) {
      await RedisHelper.cache(req, response.items);
    }

    ApiDataSuccess.sendData(
      response,
      'Books fetched successfully',
      httpStatus.OK,
      res
    );
  }

  async getBook(req: Request, res: Response) {
    const { id } = req.params;

    if (id === undefined || id === '') {
      return ApiDataSuccess.sendData(
        {},
        'Book fetched successfully',
        httpStatus.OK,
        res
      );
    }

    const book = await this.books.volumes.get({
      volumeId: id,
    });

    if (book.data) {
      book.data = {
        id: book.data.id,
        volumeInfo: {
          title: book.data.volumeInfo?.title,
          authors: book.data.volumeInfo?.authors,
          publisher: book.data.volumeInfo?.publisher,
          publishedDate: book.data.volumeInfo?.publishedDate,
          description: book.data.volumeInfo?.description,
          pageCount: book.data.volumeInfo?.pageCount,
          categories: book.data.volumeInfo?.categories,
          imageLinks: book.data.volumeInfo?.imageLinks,
        },
      };
    }

    const response = {
      ...book.data,
    };

    if (response) {
      await RedisHelper.cache(req, response);
    }

    ApiDataSuccess.sendData(
      response,
      'Book fetched successfully',
      httpStatus.OK,
      res
    );
  }
}

export = BookController;
