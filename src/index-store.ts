/** An index over a single field for fast lookups */
export class Index<T = unknown> {
  readonly field: string;
  readonly unique: boolean;

  constructor(field: string, unique = false) {
    this.field = field;
    this.unique = unique;
  }

  /** Add a value to the index */
  add(_id: string, _value: T): void {
    // TODO: implement
    throw new Error('Not implemented');
  }

  /** Remove a value from the index */
  remove(_id: string, _value: T): void {
    // TODO: implement
    throw new Error('Not implemented');
  }

  /** Find document IDs matching a value */
  lookup(_value: T): string[] {
    // TODO: implement
    throw new Error('Not implemented');
  }

  /** Clear all entries */
  clear(): void {
    // TODO: implement
    throw new Error('Not implemented');
  }
}
