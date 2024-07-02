interface Write<T> {
  create: (item: T, callback: (error: any, result: T | null) => void) => void;
  update: (
    id: number,
    item: T,
    callback: (error: any, result: any) => void
  ) => void;
  delete: (id: number, callback: (error: any, result: any) => void) => void;
}

export = Write;
