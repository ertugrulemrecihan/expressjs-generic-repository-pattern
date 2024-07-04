interface Read<T> {
  fetchAll: (
    callback: (error: any, result: T[] | null) => void,
    pagination?: Partial<{ limit: number; offset: number }>
  ) => void;
  fetchByQuery: (
    query: any,
    callback: (error: any, result: T[] | null) => void,
    pagination?: Partial<{ limit: number; offset: number }>
  ) => void;
  findById: (
    id: number,
    callback: (error: any, result: T | null) => void
  ) => void;
  findOneByQuery: (
    query: any,
    callback: (error: any, result: T | null) => void
  ) => void;
}

export = Read;
