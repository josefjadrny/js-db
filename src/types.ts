/** Supported field types for schema definitions */
export type FieldType = 'string' | 'number' | 'boolean' | 'date';

/** Schema field definition */
export interface FieldDefinition {
  type: FieldType;
  required?: boolean;
  unique?: boolean;
  index?: boolean;
}

/** A schema is a map of field names to their definitions */
export type Schema = Record<string, FieldDefinition>;

/** Infer the TypeScript type from a FieldType */
export type InferFieldType<T extends FieldType> =
  T extends 'string' ? string :
  T extends 'number' ? number :
  T extends 'boolean' ? boolean :
  T extends 'date' ? Date :
  never;

/** Infer a document type from a schema */
export type InferDocument<S extends Schema> = {
  [K in keyof S as S[K]['required'] extends false ? never : K]: InferFieldType<S[K]['type']>;
} & {
  [K in keyof S as S[K]['required'] extends false ? K : never]?: InferFieldType<S[K]['type']>;
};

/** Stored document with internal metadata */
export type Document<S extends Schema> = InferDocument<S> & {
  _id: string;
};

/** Query operators for filtering */
export interface QueryOperators<T> {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
}

/** Query filter for a collection */
export type Query<S extends Schema> = {
  [K in keyof S]?: InferFieldType<S[K]['type']> | QueryOperators<InferFieldType<S[K]['type']>>;
};

/** Options for configuring a database instance */
export interface DatabaseOptions {
  /** File path for persistent storage (optional, in-memory if omitted) */
  filePath?: string;
}

/** Options for configuring a collection */
export interface CollectionOptions<S extends Schema> {
  schema: S;
  timestamps?: boolean;
}
