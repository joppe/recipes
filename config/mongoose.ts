const host = '127.0.0.1';
const port = '27017';
const user = 'root';
const password = 'develop';
const dbName = 'recipes';

export const url = `mongodb://${host}:${port}/${dbName}`;
export const options = {
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user,
        password,
    },
};
