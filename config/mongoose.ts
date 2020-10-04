const host = 'localhost';
const port = '27017';
const user = 'root';
const pass = 'develop';
const dbName = 'recipes';

export const url = `mongodb://${host}:${port}/${dbName}`;
export const options = {
    user,
    pass,
};
