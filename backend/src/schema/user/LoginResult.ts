export type LoginResult = {
  token: string | null;
  errors: { message: string }[];
};
