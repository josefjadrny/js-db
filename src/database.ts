import type { Schema, DatabaseOptions, CollectionOptions } from './types.js';
import { Collection } from './collection.js';

export class Database {
  private options: DatabaseOptions;
  private collections = new Map<string, Collection<any>>();

  constructor(options: DatabaseOptions = {}) {
    this.options = options;
  }

  /** Create or get a collection */
  collection<S extends Schema>(name: string, options: CollectionOptions<S>): Collection<S> {
    if (this.collections.has(name)) {
      return this.collections.get(name) as Collection<S>;
    }

    const col = new Collection<S>(name, options);
    this.collections.set(name, col);
    return col;
  }

  /** Drop a collection */
  drop(name: string): boolean {
    return this.collections.delete(name);
  }

  /** List all collection names */
  list(): string[] {
    return [...this.collections.keys()];
  }
}
