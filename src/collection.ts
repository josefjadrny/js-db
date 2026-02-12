import type { Schema, Document, Query, CollectionOptions } from './types.js';

export class Collection<S extends Schema> {
  readonly name: string;
  private options: CollectionOptions<S>;

  constructor(name: string, options: CollectionOptions<S>) {
    this.name = name;
    this.options = options;
  }

  /** Insert a new document */
  insert(_doc: Omit<Document<S>, '_id'>): Document<S> {
    // TODO: implement
    throw new Error('Not implemented');
  }

  /** Find documents matching a query */
  find(_query?: Query<S>): Document<S>[] {
    // TODO: implement
    throw new Error('Not implemented');
  }

  /** Find a single document matching a query */
  findOne(_query: Query<S>): Document<S> | undefined {
    // TODO: implement
    throw new Error('Not implemented');
  }

  /** Update documents matching a query */
  update(_query: Query<S>, _update: Partial<Omit<Document<S>, '_id'>>): number {
    // TODO: implement
    throw new Error('Not implemented');
  }

  /** Delete documents matching a query */
  delete(_query: Query<S>): number {
    // TODO: implement
    throw new Error('Not implemented');
  }
}
