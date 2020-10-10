const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

export const url = `mongodb://${user}:${password}@${host}:${port}`;
export const dbName = 'recipes';
