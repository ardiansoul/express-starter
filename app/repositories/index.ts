export interface Repository<T> {
  create: (data: T) => Promise<T>;
  getById: (id: string) => Promise<T>;
  getAll: (filter: any) => Promise<T[]>;
  update: (id: string, data: T) => Promise<T>;
  delete: (id: string) => Promise<T>;
}
