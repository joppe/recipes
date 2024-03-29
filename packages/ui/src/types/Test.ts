type Image = {
  id: number;
  url: string;
  size: 'small' | 'medium' | 'large';
  title: string;
};

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  image?: Image;
  categories: Category[];
};

const data: Product = {
  id: 1,
  name: 'Pepper',
  image: {
    id: 1,
    url: 'http://example.com/pepper.png',
    size: 'small',
    title: 'Pepper',
  },
  categories: [
    {
      id: 1,
      name: 'Vegetables',
    },
  ],
};

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
  ? '0' extends keyof T
    ? undefined
    : number extends keyof T
    ? T[number]
    : undefined
  : undefined;

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type IndexedFieldWithPossiblyUndefined<T, Key> =
  | GetIndexedField<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

export type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? FieldWithPossiblyUndefined<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
    ? FieldKey extends keyof T
      ? FieldWithPossiblyUndefined<
          IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>,
          Right
        >
      : undefined
    : undefined
  : P extends keyof T
  ? T[P]
  : P extends `${infer FieldKey}[${infer IndexKey}]`
  ? FieldKey extends keyof T
    ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>
    : undefined
  : undefined;

type A = GetFieldType<Product, 'image.url'>; // Address, for now we only taking a left part of a path
type B = GetFieldType<Product, 'name'>; // Address
type C = GetFieldType<Product, 'categories[0].name'>; // undefined
