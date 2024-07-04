import { Model, ModelStatic } from 'sequelize';
import IReadRepository from '../interfaces/common/IReadRepository';
import IWriteRepository from '../interfaces/common/IWriteRepository';

class BaseRepository<T extends Model<any, any>>
  implements IReadRepository<T>, IWriteRepository<T>
{
  private _model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this._model = model;
  }

  async fetchAll(
    callback: (error: any, result: T[] | null) => void,
    pagination: Partial<{ limit: number; offset: number }> = {}
  ): Promise<void> {
    try {
      const items = await this._model.findAll({
        limit: pagination.limit || undefined,
        offset: pagination.offset || undefined,
      });
      callback(null, items);
    } catch (error) {
      callback(error, null);
    }
  }

  async findById(
    id: number,
    callback: (error: any, result: T | null) => void
  ): Promise<void> {
    try {
      if (!id) throw new Error('ID is required');

      const item = await this._model.findByPk(id);
      callback(null, item);
    } catch (error) {
      callback(error, null);
    }
  }

  async fetchByQuery(
    query: Partial<T['_attributes']>,
    callback: (error: any, result: T[] | null) => void,
    pagination: Partial<{ limit: number; offset: number }> = {}
  ): Promise<void> {
    try {
      if (!query) throw new Error('Query is required');

      const items = await this._model.findAll({
        where: { ...(query as T['_attributes']) },
        limit: pagination.limit || undefined,
        offset: pagination.offset || undefined,
      });
      callback(null, items);
    } catch (error) {
      callback(error, null);
    }
  }

  async findOneByQuery(
    query: Partial<T['_attributes']>,
    callback: (error: any, result: T | null) => void
  ) {
    try {
      if (!query) throw new Error('Query is required');

      const item = await this._model.findOne({
        where: { ...(query as T['_attributes']) },
      });
      callback(null, item);
    } catch (error) {
      callback(error, null);
    }
  }

  async create(
    item: Partial<T['_attributes']>,
    callback: (error: any, result: any) => void
  ): Promise<void> {
    try {
      if (!item) throw new Error('Item is required');

      const createdItem = await this._model.create(item as T['_attributes']);
      callback(null, createdItem.toJSON());
    } catch (error) {
      callback(error, null);
    }
  }

  async update(
    id: number,
    values: Partial<T['_attributes']>,
    callback: (error: any, result: any) => void
  ): Promise<void> {
    try {
      if (!id) throw new Error('ID is required');
      if (!values) throw new Error('Values are required');

      const updatedItem = await this._model.update(values, {
        where: { id: id as T['_attributes']['id'] },
      });

      callback(null, updatedItem);
    } catch (error) {
      callback(error, null);
    }
  }

  async delete(
    id: number,
    callback: (error: any, result: any) => void
  ): Promise<void> {
    try {
      if (!id) throw new Error('ID is required');

      const deletedItem = await this._model.destroy({
        where: { id: id as T['_attributes']['id'] },
      });
      callback(null, deletedItem);
    } catch (error) {
      callback(error, null);
    }
  }
}

export = BaseRepository;
