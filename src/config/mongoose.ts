const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const user = <string>process.env.MONGO_USER;
const password = <string>process.env.MONGO_PASSWORD;
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
