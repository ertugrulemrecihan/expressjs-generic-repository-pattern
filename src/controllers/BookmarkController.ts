import { NextFunction, Request, Response } from 'express';
import IBaseController = require('./interfaces/base/IBaseController');
import BookmarkBusiness = require('../app/business/BookmarkBusiness');
import ApiError from '../config/responses/error/ApiError';
import httpStatus = require('http-status');
import ApiDataSuccess from '../config/responses/success/ApiDataSuccess';
import { google } from 'googleapis';

class BookmarkController implements IBaseController<BookmarkBusiness> {
  async fetchMyBookmarks(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.user.id;

    if (!userId) {
      return next(new ApiError('User ID is required', httpStatus.BAD_REQUEST));
    }

    const bookmarkBusiness = new BookmarkBusiness();

    await bookmarkBusiness.fetchByQuery(
      { UserId: userId },
      async (error, result) => {
        if (error) {
          return next(
            new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
          );
        }

        const books = google.books({
          version: 'v1',
          auth: process.env.GOOGLE_API_KEY,
        });

        let response = [];

        for (const record of result) {
          try {
            const book = await books.volumes.get({
              volumeId: record.bookId,
            });

            response.push({
              id: record.id,
              bookId: record.bookId,
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
            });
          } catch (error) {
            continue;
          }
        }

        ApiDataSuccess.sendData(
          response,
          'Bookmarks fetched',
          httpStatus.OK,
          res
        );
      },
      {
        limit: parseInt(req.query.limit as string) || 10,
        offset: parseInt(req.query.page as string) - 1 || 0,
      }
    );
  }

  toggleBookmark(req: Request, res: Response, next: NextFunction): void {
    const userId = req.user.id;
    const { bookId } = req.params;

    if (!userId || !bookId) {
      return next(
        new ApiError('User ID and Book ID are required', httpStatus.BAD_REQUEST)
      );
    }

    const bookmarkBusiness = new BookmarkBusiness();

    bookmarkBusiness.findOneByQuery(
      { UserId: userId, bookId },
      (error, result) => {
        if (error) {
          return next(
            new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
          );
        }

        if (!result) {
          bookmarkBusiness.create(
            { UserId: userId, bookId },
            (error, result) => {
              if (error) {
                return next(
                  new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
                );
              }

              ApiDataSuccess.sendData(
                result,
                'Bookmark created',
                httpStatus.CREATED,
                res
              );
            }
          );
        } else {
          bookmarkBusiness.delete(result.id, (error, result) => {
            if (error) {
              return next(
                new ApiError(error.message, httpStatus.INTERNAL_SERVER_ERROR)
              );
            }

            ApiDataSuccess.sendData(
              result,
              'Bookmark deleted',
              httpStatus.OK,
              res
            );
          });
        }
      }
    );
  }

  create(req: Request, res: Response): void {}

  fetchAll(req: Request, res: Response): void {}

  findById(req: Request, res: Response): void {}

  findOneByQuery(req: Request, res: Response): void {}

  fetchByQuery(req: Request, res: Response): void {}

  update(req: Request, res: Response): void {}

  delete(req: Request, res: Response): void {}
}

export = BookmarkController;
