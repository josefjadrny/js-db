import type { Schema, InferDocument, CollectionConfig, StorageAdapter } from './types.js';
import { Collection } from './collection.js';
import { MemoryAdapter, FileAdapter } from './storage.js';
import { validateSchema } from './validation.js';

/** Schema-inferred DB instance (no explicit type map) */
type InferredDBInstance<T extends Record<string, CollectionConfig>> = {
  [K in keyof T]: Collection<InferDocument<T[K]['schema']>>;
} & {
  collection<K extends keyof T & string>(name: K): Collection<InferDocument<T[K]['schema']>>;
};

/** Explicitly typed DB instance (user provides type map) */
type TypedDBInstance<M extends Record<string, unknown>> = {
  [K in keyof M]: Collection<M[K]>;
} & {
  collection<K extends keyof M & string>(name: K): Collection<M[K]>;
};

/** Schema-inferred types (default — no explicit generic) */
export function createDB<T extends Record<string, CollectionConfig>>(
  options: { path?: string; collections: T },
): InferredDBInstance<T>;

/** Explicit type map — e.g. createDB<{ users: User }>({...}) */
export function createDB<M extends Record<string, unknown>>(
  options: { path?: string; collections: { [K in keyof M]: { schema: Schema } } },
): TypedDBInstance<M>;

export function createDB(
  options: { path?: string; collections: Record<string, CollectionConfig> },
) {
  const storage: StorageAdapter = options.path
    ? new FileAdapter(options.path)
    : new MemoryAdapter();

  const collections = new Map<string, Collection>();

  for (const [name, config] of Object.entries(options.collections)) {
    validateSchema(config.schema);
    const col = new Collection(name, config.schema, storage);
    collections.set(name, col);
  }

  const db = {} as Record<string, unknown>;

  for (const [name, col] of collections) {
    db[name] = col;
  }

  db['collection'] = (name: string) => {
    const col = collections.get(name);
    if (!col) {
      throw new Error(`Collection "${name}" does not exist`);
    }
    return col;
  };

  return db;
}
