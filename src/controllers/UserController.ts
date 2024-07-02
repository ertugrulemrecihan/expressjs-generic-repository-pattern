import { Request, Response } from 'express';
import UserBusiness = require('../app/business/UserBusiness');
import IBaseController = require('./interfaces/base/IBaseController');
import IUserModel = require('../app/model/interfaces/IUserModel');

class UserController implements IBaseController<UserBusiness> {
  fetchAll(req: Request, res: Response): void {
    try {
      const userBusiness = new UserBusiness();
      userBusiness.fetchAll((error, result) => {
        if (error) {
          res.send({ error: 'error var hacı' });
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ error: 'error in your request' });
    }
  }

  findById(req: Request, res: Response): void {
    try {
      const id: number = parseInt(req.params.id);
      const userBusiness = new UserBusiness();
      userBusiness.findById(id, (error, result) => {
        if (error) {
          res.send({ error: 'error var hacı' });
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ error: 'error in your request' });
    }
  }

  findOneByQuery(req: Request, res: Response): void {
    try {
      const query = req.body;
      const userBusiness = new UserBusiness();
      userBusiness.findOneByQuery(query, (error, result) => {
        if (error) {
          res.send({ error: 'error var hacı' });
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ error: 'error in your request' });
    }
  }

  fetchByQuery(req: Request, res: Response): void {
    try {
      const query = req.body;
      const userBusiness = new UserBusiness();
      userBusiness.fetchByQuery(query, (error, result) => {
        if (error) {
          res.send({ error: 'error var hacı' });
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ error: 'error in your request' });
    }
  }

  create(req: Request, res: Response): void {
    try {
      const user: IUserModel = <IUserModel>req.body;
      const userBusiness = new UserBusiness();
      userBusiness.create(user, (error, result) => {
        if (error) {
          res.send({ error: 'error var hacı' });
        } else {
          res.send({ result: 'kayıt başarılı' });
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ error: 'error in your request' });
    }
  }

  update(req: Request, res: Response): void {
    try {
      const id: number = parseInt(req.params.id);
      const user: IUserModel = <IUserModel>req.body;
      const userBusiness = new UserBusiness();
      userBusiness.update(id, user, (error, result) => {
        if (error) {
          res.send({ error: 'error var hacı' });
        } else {
          res.send({ result: 'kayıt başarılı' });
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ error: 'error in your request' });
    }
  }

  delete(req: Request, res: Response): void {
    try {
      const id: number = parseInt(req.params.id);
      const userBusiness = new UserBusiness();
      userBusiness.delete(id, (error, result) => {
        if (error) {
          res.send({ error: 'error var hacı' });
        } else {
          res.send({ result: 'kayıt başarılı' });
        }
      });
    } catch (error) {
      console.log(error);
      res.send({ error: 'error in your request' });
    }
  }
}

export = UserController;
