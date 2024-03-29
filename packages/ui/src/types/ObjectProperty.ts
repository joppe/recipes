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

type IsDotSyntax<Path extends string> = Path extends `${string}.${string}`
  ? true
  : false;

type GetLeftPart<Path extends string> = Path extends `${infer Left}.${string}`
  ? Left
  : undefined;

type Left = GetLeftPart<'image.title'>;

type GetIndexedField<Obj, Path> = Path extends `${infer Key}[${infer Index}]`
  ? Key extends keyof Obj
    ? Obj[Key]
    : undefined
  : undefined;

type FieldTypeWithPossiblyUndefined<Obj, Key extends string> =
  | GetPropertyType<Exclude<Obj, undefined>, Key>
  | Extract<Obj, undefined>;

type GetPropertyType<
  Obj,
  Path extends string,
> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof Obj
    ? FieldTypeWithPossiblyUndefined<Obj[Key], Rest>
    : undefined
  : Path extends keyof Obj
  ? Obj[Path]
  : undefined;

type B = GetPropertyType<Product, 'image.id'>;
type C = GetPropertyType<Product, 'categories[0].id'>;
